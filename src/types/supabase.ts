export interface Database {
  public: {
    Tables: {
      enrollments: {
        Row: {
          id: string;
          created_at: string;
          type: 'ambassador' | 'business' | 'subscriber';
          first_name: string;
          last_name: string;
          email: string;
          phone?: string;
          church?: string;
          status: 'pending' | 'approved' | 'rejected';
          business_name?: string;
          website?: string;
          address?: {
            street: string;
            city: string;
            state: string;
            zip: string;
            coordinates?: { lat: number; lng: number };
          };
          description?: string;
          support_type?: string[];
          engagement_level?: string;
          commitments?: string[];
          social_platforms?: string[];
          subscription_tier?: 'seed' | 'growth' | 'harvest';
          payment_method?: string;
          billing_address?: {
            street: string;
            city: string;
            state: string;
            zip: string;
          };
        };
        Insert: Omit<Database['public']['Tables']['enrollments']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['enrollments']['Insert']>;
      };
      blessings: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          name: string | null;
          age: number;
          church: string;
          destination: string;
          start_date: string;
          end_date: string;
          goal: number;
          amount_raised: number;
          story: string;
          image_url: string;
          supporters: number;
          is_anonymous: boolean;
          purpose: string;
        };
        Insert: Omit<Database['public']['Tables']['blessings']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['blessings']['Insert']>;
      };
      churches: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          address: string;
          members: number;
          coordinates: { lat: number; lng: number } | null;
          claimed_by: string | null;
          verified: boolean;
        };
        Insert: Omit<Database['public']['Tables']['churches']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['churches']['Insert']>;
      };
      businesses: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          logo: string;
          type: string[];
          description: string;
          address: {
            street: string;
            city: string;
            state: string;
            zip: string;
            coordinates?: { lat: number; lng: number };
          };
          contact: {
            phone: string;
            email: string;
            website: string;
          };
          hours: {
            day: string;
            open: string;
            close: string;
            closed?: boolean;
          }[];
          badges: string[];
          contribution_tier: 'seed' | 'harvest' | 'legacy' | null;
          joined_date: string;
          verified: boolean;
          claimed_by: string | null;
        };
        Insert: Omit<Database['public']['Tables']['businesses']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['businesses']['Insert']>;
      };
    };
  };
}