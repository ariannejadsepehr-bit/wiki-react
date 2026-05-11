export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type UserRole = 'guest' | 'user' | 'business_owner' | 'editor' | 'seo_manager' | 'admin' | 'super_admin';
export type BusinessStatus = 'pending' | 'active' | 'suspended' | 'rejected' | 'draft';
export type SubscriptionPlan = 'free' | 'basic' | 'premium' | 'enterprise';
export type SubscriptionStatus = 'active' | 'expired' | 'cancelled' | 'pending';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentGateway = 'zarinpal' | 'idpay' | 'nextpay';
export type LeadStatus = 'new' | 'contacted' | 'converted' | 'closed';
export type SeoPageStatus = 'draft' | 'published' | 'archived';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          avatar_url: string | null;
          role: UserRole;
          is_verified: boolean;
          email_verified: boolean;
          phone_verified: boolean;
          bio: string | null;
          website: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['profiles']['Row']> & { id: string };
        Update: Partial<Database['public']['Tables']['profiles']['Row']>;
      };
      provinces: {
        Row: { id: number; name: string; name_en: string | null; slug: string; created_at: string };
        Insert: Omit<Database['public']['Tables']['provinces']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['provinces']['Row']>;
      };
      cities: {
        Row: {
          id: number; province_id: number | null; name: string; name_en: string | null;
          slug: string; latitude: number | null; longitude: number | null;
          is_major: boolean; created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['cities']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['cities']['Row']>;
      };
      categories: {
        Row: {
          id: number; parent_id: number | null; name: string; name_en: string | null;
          slug: string; description: string | null; icon: string | null; image_url: string | null;
          color: string; is_featured: boolean; sort_order: number;
          seo_title: string | null; seo_description: string | null;
          created_at: string; updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['categories']['Row']>;
      };
      businesses: {
        Row: {
          id: string; owner_id: string | null; name: string; name_en: string | null;
          slug: string; description: string | null; short_description: string | null;
          status: BusinessStatus; is_featured: boolean; is_verified: boolean; is_claimed: boolean;
          city_id: number | null; province_id: number | null; address: string | null;
          postal_code: string | null; latitude: number | null; longitude: number | null;
          phone: string | null; phone2: string | null; whatsapp: string | null;
          email: string | null; website: string | null;
          instagram: string | null; telegram: string | null; linkedin: string | null; twitter: string | null;
          logo_url: string | null; cover_url: string | null;
          founded_year: number | null; employee_count: string | null; license_number: string | null;
          seo_title: string | null; seo_description: string | null; seo_keywords: string[] | null;
          review_count: number; avg_rating: number; view_count: number; lead_count: number;
          ai_score: number; ranking_score: number;
          subscription_plan: SubscriptionPlan; subscription_expires_at: string | null;
          created_at: string; updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['businesses']['Row'], 'id' | 'created_at' | 'updated_at' | 'review_count' | 'avg_rating' | 'view_count' | 'lead_count' | 'ai_score' | 'ranking_score'>;
        Update: Partial<Database['public']['Tables']['businesses']['Row']>;
      };
      reviews: {
        Row: {
          id: string; business_id: string; user_id: string | null;
          rating: number; title: string | null; body: string | null;
          is_verified: boolean; is_approved: boolean; is_spam: boolean;
          spam_score: number; helpful_count: number;
          created_at: string; updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['reviews']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['reviews']['Row']>;
      };
      seo_pages: {
        Row: {
          id: string; title: string; slug: string; h1: string;
          meta_title: string | null; meta_description: string | null;
          canonical_url: string | null; intro: string | null; content: string | null;
          faq: Json; schema_data: Json; status: SeoPageStatus;
          category_id: number | null; city_id: number | null; province_id: number | null;
          view_count: number; is_ai_generated: boolean; ai_model: string | null;
          last_generated_at: string | null; created_at: string; updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['seo_pages']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['seo_pages']['Row']>;
      };
      leads: {
        Row: {
          id: string; business_id: string; user_id: string | null;
          name: string | null; phone: string | null; email: string | null;
          message: string | null; type: string; status: LeadStatus;
          source_url: string | null; utm_source: string | null;
          utm_medium: string | null; utm_campaign: string | null;
          ip_address: string | null; created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['leads']['Row']>;
      };
      payments: {
        Row: {
          id: string; user_id: string | null; business_id: string | null;
          subscription_id: string | null; amount: number; currency: string;
          gateway: PaymentGateway; gateway_ref: string | null; gateway_track_id: string | null;
          status: PaymentStatus; description: string | null; metadata: Json;
          paid_at: string | null; created_at: string; updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['payments']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['payments']['Row']>;
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Province = Database['public']['Tables']['provinces']['Row'];
export type City = Database['public']['Tables']['cities']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Business = Database['public']['Tables']['businesses']['Row'];
export type Review = Database['public']['Tables']['reviews']['Row'];
export type SeoPage = Database['public']['Tables']['seo_pages']['Row'];
export type Lead = Database['public']['Tables']['leads']['Row'];
export type Payment = Database['public']['Tables']['payments']['Row'];
