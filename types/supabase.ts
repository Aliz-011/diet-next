export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      antropemetri: {
        Row: {
          created_at: string
          id: string
          user_id: string
          weight: number
        }
        Insert: {
          created_at?: string
          id?: string
          user_id: string
          weight: number
        }
        Update: {
          created_at?: string
          id?: string
          user_id?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "antropemetri_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          age: number | null
          avatar_url: string | null
          full_name: string | null
          height: number | null
          id: string
          sex: string | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          full_name?: string | null
          height?: number | null
          id: string
          sex?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          full_name?: string | null
          height?: number | null
          id?: string
          sex?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      schedules: {
        Row: {
          created_at: string
          diet_schedules: Json
          diet_type: string
          id: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          diet_schedules: Json
          diet_type: string
          id?: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          diet_schedules?: Json
          diet_type?: string
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedules_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_avatar: {
        Args: {
          avatar_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_storage_object: {
        Args: {
          bucket: string
          object: string
        }
        Returns: Record<string, unknown>
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
