
-- Create a profiles table to store user profile information
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to view all profiles
CREATE POLICY "Anyone can view profiles" ON public.profiles
  FOR SELECT USING (true);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create policy to allow authenticated users to insert their own profile
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create books table
CREATE TABLE public.books (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  pdf_url TEXT,
  category TEXT[] NOT NULL DEFAULT '{}',
  folder TEXT,
  publication_date TEXT,
  page_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all users to view books
CREATE POLICY "Anyone can view books" ON public.books
  FOR SELECT USING (true);

-- Create policy to allow only authenticated users to insert books
CREATE POLICY "Authenticated users can insert books" ON public.books
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow only authenticated users to update books
CREATE POLICY "Authenticated users can update books" ON public.books
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create user_saved_books junction table to track user's saved/favorite books
CREATE TABLE public.user_saved_books (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  book_id UUID REFERENCES public.books ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, book_id)
);

-- Enable Row Level Security
ALTER TABLE public.user_saved_books ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own saved books
CREATE POLICY "Users can view their own saved books" ON public.user_saved_books
  FOR SELECT USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own saved books
CREATE POLICY "Users can insert their own saved books" ON public.user_saved_books
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to delete their own saved books
CREATE POLICY "Users can delete their own saved books" ON public.user_saved_books
  FOR DELETE USING (auth.uid() = user_id);

-- Create a function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to execute the function on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
