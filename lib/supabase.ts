import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: "admin" | "programmer" | "operator"
          password_hash: string
          avatar_url: string | null
          status: "active" | "inactive"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role: "admin" | "programmer" | "operator"
          password_hash: string
          avatar_url?: string | null
          status?: "active" | "inactive"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: "admin" | "programmer" | "operator"
          password_hash?: string
          avatar_url?: string | null
          status?: "active" | "inactive"
          created_at?: string
          updated_at?: string
        }
      }
      programs: {
        Row: {
          id: string
          name: string
          description: string | null
          html_content: string
          programmer_id: string
          assigned_operator_id: string | null
          status: "pending" | "running" | "completed" | "cancelled"
          priority: "low" | "medium" | "high" | "urgent"
          estimated_time_hours: number | null
          started_at: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          html_content: string
          programmer_id: string
          assigned_operator_id?: string | null
          status?: "pending" | "running" | "completed" | "cancelled"
          priority?: "low" | "medium" | "high" | "urgent"
          estimated_time_hours?: number | null
          started_at?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          html_content?: string
          programmer_id?: string
          assigned_operator_id?: string | null
          status?: "pending" | "running" | "completed" | "cancelled"
          priority?: "low" | "medium" | "high" | "urgent"
          estimated_time_hours?: number | null
          started_at?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      signatures: {
        Row: {
          id: string
          program_id: string
          operator_id: string
          signature_data: string
          signed_at: string
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          program_id: string
          operator_id: string
          signature_data: string
          signed_at?: string
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          program_id?: string
          operator_id?: string
          signature_data?: string
          signed_at?: string
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
    }
  }
}
