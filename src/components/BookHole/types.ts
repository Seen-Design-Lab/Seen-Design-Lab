
import type { Database } from '@/integrations/supabase/types';

export type BookType = Database['public']['Tables']['books']['Row'];

export interface CategoryType {
  id: string;
  name: string;
  color: string;
}

export interface FolderChildType {
  id: string;
  name: string;
}

export interface FolderType {
  id: string;
  name: string;
  children: FolderChildType[];
}
