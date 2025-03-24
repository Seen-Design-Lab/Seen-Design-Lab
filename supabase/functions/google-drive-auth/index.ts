
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GOOGLE_CLIENT_ID = Deno.env.get('GOOGLE_CLIENT_ID') || '';
const GOOGLE_CLIENT_SECRET = Deno.env.get('GOOGLE_CLIENT_SECRET') || '';
const REDIRECT_URI = Deno.env.get('REDIRECT_URI') || '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') || '';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Parse the request URL
  const url = new URL(req.url);
  const path = url.pathname.split('/').pop();
  
  // Create a Supabase client
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
  // Extract the Auth token from the request
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'No authorization header' }), { 
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  // Get the current user session
  const { data: { user }, error: userError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
  if (userError || !user) {
    return new Response(JSON.stringify({ error: 'Invalid session' }), { 
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  try {
    // Handle different endpoints
    if (path === 'authorize') {
      // Generate authorization URL
      const scope = encodeURIComponent('https://www.googleapis.com/auth/drive.file');
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
      
      return new Response(JSON.stringify({ url: authUrl }), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } 
    else if (path === 'callback') {
      const { code } = await req.json();
      
      if (!code) {
        return new Response(JSON.stringify({ error: 'No authorization code provided' }), { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      // Exchange authorization code for tokens
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: GOOGLE_CLIENT_ID,
          client_secret: GOOGLE_CLIENT_SECRET,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code'
        })
      });
      
      const tokenData = await tokenResponse.json();
      
      if (!tokenResponse.ok) {
        console.error('Error exchanging code for tokens:', tokenData);
        return new Response(JSON.stringify({ error: 'Failed to exchange authorization code' }), { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      const { access_token, refresh_token, expires_in } = tokenData;
      const expires_at = new Date(Date.now() + expires_in * 1000).toISOString();
      
      // Store tokens in the database
      const { error: dbError } = await supabase
        .from('user_drive_connections')
        .upsert({
          user_id: user.id,
          access_token,
          refresh_token,
          expires_at
        });
      
      if (dbError) {
        console.error('Database error:', dbError);
        return new Response(JSON.stringify({ error: 'Failed to store tokens' }), { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      return new Response(JSON.stringify({ success: true }), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    else if (path === 'upload') {
      const formData = await req.formData();
      const file = formData.get('file') as File;
      const fileName = formData.get('fileName') as string;
      
      if (!file || !fileName) {
        return new Response(JSON.stringify({ error: 'No file provided' }), { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      // Get the user's Google Drive tokens
      const { data: connections, error: connError } = await supabase
        .from('user_drive_connections')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (connError || !connections) {
        return new Response(JSON.stringify({ error: 'No Google Drive connection found' }), { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      // Check if token is expired and refresh if needed
      let accessToken = connections.access_token;
      if (new Date(connections.expires_at) <= new Date()) {
        // Refresh the token
        const refreshResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            refresh_token: connections.refresh_token,
            grant_type: 'refresh_token'
          })
        });
        
        const refreshData = await refreshResponse.json();
        
        if (!refreshResponse.ok) {
          return new Response(JSON.stringify({ error: 'Failed to refresh token' }), { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
        
        accessToken = refreshData.access_token;
        const expires_at = new Date(Date.now() + refreshData.expires_in * 1000).toISOString();
        
        // Update the token in the database
        await supabase
          .from('user_drive_connections')
          .update({
            access_token: accessToken,
            expires_at
          })
          .eq('user_id', user.id);
      }
      
      // Check if "Seen Books" folder exists, or create it
      let folderId;
      const folderResponse = await fetch(
        'https://www.googleapis.com/drive/v3/files?q=name%3D%27Seen%20Books%27%20and%20mimeType%3D%27application/vnd.google-apps.folder%27%20and%20trashed%3Dfalse',
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      );
      
      const folderData = await folderResponse.json();
      
      if (folderData.files && folderData.files.length > 0) {
        folderId = folderData.files[0].id;
      } else {
        // Create the folder
        const createFolderResponse = await fetch('https://www.googleapis.com/drive/v3/files', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: 'Seen Books',
            mimeType: 'application/vnd.google-apps.folder'
          })
        });
        
        const newFolder = await createFolderResponse.json();
        folderId = newFolder.id;
      }
      
      // Upload the file to Google Drive
      const metadata = {
        name: fileName,
        parents: [folderId]
      };
      
      const boundary = '-------314159265358979323846';
      const delimiter = "\r\n--" + boundary + "\r\n";
      const close_delim = "\r\n--" + boundary + "--";
      
      const fileBytes = await file.arrayBuffer();
      
      let multipartRequestBody =
        delimiter +
        'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: ' + file.type + '\r\n\r\n';
      
      // Append the file data as binary
      const uint8Array = new Uint8Array(fileBytes);
      let binary = '';
      for (let i = 0; i < uint8Array.byteLength; i++) {
        binary += String.fromCharCode(uint8Array[i]);
      }
      multipartRequestBody += binary + close_delim;
      
      // Upload to Google Drive
      const uploadResponse = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': `multipart/related; boundary=${boundary}`
        },
        body: multipartRequestBody
      });
      
      const uploadData = await uploadResponse.json();
      
      if (!uploadResponse.ok) {
        return new Response(JSON.stringify({ error: 'Failed to upload file' }), { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      // Also upload to Supabase Storage
      const fileBuffer = await file.arrayBuffer();
      const { data: uploadedFile, error: uploadError } = await supabase
        .storage
        .from('books')
        .upload(`${user.id}/${fileName}`, fileBuffer, {
          contentType: file.type,
          upsert: true
        });
      
      if (uploadError) {
        console.error('Storage error:', uploadError);
        // Continue anyway since Google Drive upload worked
      }
      
      // Get the public URL
      let publicUrl = '';
      if (!uploadError) {
        const { data: { publicUrl: url } } = supabase
          .storage
          .from('books')
          .getPublicUrl(`${user.id}/${fileName}`);
        publicUrl = url;
      }
      
      // Add the book to the books table
      const { data: bookData, error: bookError } = await supabase
        .from('books')
        .insert({
          title: fileName.replace('.pdf', ''),
          author: 'Uploaded by user',
          pdf_url: publicUrl || `https://drive.google.com/file/d/${uploadData.id}/view`,
          category: ['user-uploaded'],
          cover_image: 'https://via.placeholder.com/300x450?text=Uploaded+Book'
        })
        .select()
        .single();
      
      if (bookError) {
        console.error('Book database error:', bookError);
      }
      
      return new Response(JSON.stringify({ 
        success: true, 
        fileId: uploadData.id,
        bookId: bookData?.id || null,
        publicUrl
      }), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Default response for unknown endpoints
    return new Response(JSON.stringify({ error: 'Unknown endpoint' }), { 
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { 
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
