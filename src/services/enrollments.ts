import { supabase } from '../config/supabase';
import type { Database } from '../types/supabase';

export interface EnrollmentBase {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  church?: string;
  createdAt?: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface AmbassadorEnrollment extends EnrollmentBase {
  type: 'ambassador';
  commitments: string[];
  socialPlatforms: string[];
  engagementLevel: 'daily' | 'weekly' | 'monthly';
}

export interface BusinessEnrollment extends EnrollmentBase {
  type: 'business';
  businessName: string;
  website?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    coordinates?: { lat: number; lng: number };
  };
  description: string;
  supportType: string[];
  engagementLevel: string;
}

export interface SubscriberEnrollment extends EnrollmentBase {
  type: 'subscriber';
  subscriptionTier: 'seed' | 'growth' | 'harvest';
  paymentMethod: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export type Enrollment = AmbassadorEnrollment | BusinessEnrollment | SubscriberEnrollment;

export class EnrollmentService {
  static async createAmbassadorEnrollment(enrollment: Omit<AmbassadorEnrollment, 'createdAt' | 'status'>) {
    const { data, error } = await supabase
      .from('enrollments')
      .insert({
        ...enrollment,
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async createBusinessEnrollment(enrollment: Omit<BusinessEnrollment, 'createdAt' | 'status'>) {
    const { data, error } = await supabase
      .from('enrollments')
      .insert({
        ...enrollment,
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async createSubscriberEnrollment(enrollment: Omit<SubscriberEnrollment, 'createdAt' | 'status'>) {
    const { data, error } = await supabase
      .from('enrollments')
      .insert({
        ...enrollment,
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getEnrollmentById(id: string) {
    const { data, error } = await supabase
      .from('enrollments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async updateEnrollmentStatus(id: string, status: 'approved' | 'rejected') {
    const { data, error } = await supabase
      .from('enrollments')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}