
import React, { useState } from 'react';
import { useAuth } from '@/components/Auth/AuthContext';
import { Upload, FileUp, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface DriveIntegrationProps {
  refetchBooks: () => void;
}

const DriveIntegration: React.FC<DriveIntegrationProps> = ({ refetchBooks }) => {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showUploadSheet, setShowUploadSheet] = useState(false);
  
  // Check if user is connected to Google Drive
  React.useEffect(() => {
    if (user) {
      checkDriveConnection();
    }
  }, [user]);
  
  const checkDriveConnection = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_drive_connections')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (data) {
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Error checking Drive connection:', error);
    }
  };
  
  const connectToGoogleDrive = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to connect to Google Drive.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const { data, error } = await supabase.functions.invoke('google-drive-auth/authorize', {
        method: 'GET',
      });
      
      if (error) throw error;
      
      // Redirect to Google authorization page
      window.location.href = data.url;
    } catch (error) {
      console.error('Error connecting to Google Drive:', error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to Google Drive. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        toast({
          title: "Invalid file type",
          description: "Only PDF files are supported.",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
      setShowUploadSheet(true);
    }
  };
  
  const uploadToGoogleDrive = async () => {
    if (!user || !selectedFile) return;
    
    setIsUploading(true);
    
    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('fileName', selectedFile.name);
      
      // Upload via edge function
      const { data, error } = await supabase.functions.invoke('google-drive-auth/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (error) throw error;
      
      toast({
        title: "Upload Successful",
        description: "Your book has been uploaded and added to your collection.",
      });
      
      // Close sheet and reset state
      setShowUploadSheet(false);
      setSelectedFile(null);
      refetchBooks();
      
    } catch (error) {
      console.error('Error uploading to Google Drive:', error);
      toast({
        title: "Upload Error",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  // Handle Google Drive callback (this should be called from BookHole.tsx when URL has callback parameter)
  const handleGoogleCallback = async (code: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('google-drive-auth/callback', {
        method: 'POST',
        body: { code },
      });
      
      if (error) throw error;
      
      toast({
        title: "Connection Successful",
        description: "Your Google Drive account has been connected successfully.",
      });
      
      setIsConnected(true);
      
    } catch (error) {
      console.error('Error handling Google callback:', error);
      toast({
        title: "Connection Error",
        description: "Failed to complete Google Drive connection. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // If user is not authenticated, don't show anything
  if (!user) return null;
  
  return (
    <>
      {isConnected ? (
        <div className="relative">
          <input
            type="file"
            id="pdf-upload"
            className="absolute inset-0 opacity-0 cursor-pointer"
            accept=".pdf"
            onChange={handleFileChange}
          />
          <Button variant="outline" size="sm" className="w-full" asChild>
            <label htmlFor="pdf-upload" className="cursor-pointer">
              <FileUp size={16} className="mr-2" />
              Upload PDF
            </label>
          </Button>
        </div>
      ) : (
        <Button onClick={connectToGoogleDrive} variant="outline" size="sm" className="w-full">
          <Upload size={16} className="mr-2" />
          Connect Google Drive
        </Button>
      )}
      
      {/* Upload Sheet */}
      <Sheet open={showUploadSheet} onOpenChange={setShowUploadSheet}>
        <SheetContent side="bottom" className="sm:max-w-md sm:mx-auto">
          <SheetHeader>
            <SheetTitle>Upload Book to Collection</SheetTitle>
          </SheetHeader>
          
          <div className="py-6">
            {selectedFile && (
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-lg mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-seen-accent1/10 rounded-md flex items-center justify-center mr-3">
                    <FileUp className="text-seen-accent1" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{selectedFile.name}</p>
                    <p className="text-xs text-white/60">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <CheckCircle className="text-green-500" size={20} />
              </div>
            )}
            
            <div className="space-y-2 text-sm text-white/70">
              <p>
                This will upload your PDF to both your Google Drive and our secure storage.
                The file will be available in your "Seen Books" collection.
              </p>
            </div>
          </div>
          
          <SheetFooter className="sm:justify-between">
            <Button 
              variant="secondary" 
              onClick={() => setShowUploadSheet(false)}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button 
              onClick={uploadToGoogleDrive}
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></div>
                  Uploading...
                </>
              ) : 'Upload to Collection'}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default DriveIntegration;
