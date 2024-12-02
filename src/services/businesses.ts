import { supabase } from '../config/supabase';
import type { Database } from '../types/supabase';

type Business = Database['public']['Tables']['businesses']['Row'];
type NewBusiness = Database['public']['Tables']['businesses']['Insert'];

export async function searchBusinesses(
  query: string,
  location: { lat: number; lng: number },
  radius: number,
  filters: { donorsOnly: boolean; type?: string }
) {
  let queryBuilder = supabase
    .from('businesses')
    .select('*')
    .textSearch('name', query, { config: 'english' })
    .not('address->coordinates', 'is', null);

  if (filters.donorsOnly) {
    queryBuilder = queryBuilder.not('contribution_tier', 'is', null);
  }

  if (filters.type) {
    queryBuilder = queryBuilder.contains('type', [filters.type]);
  }

  const { data, error } = await queryBuilder;

  if (error) throw error;

  // Filter businesses within radius
  return data.filter(business => {
    if (!business.address.coordinates) return false;
    const distance = calculateDistance(
      location.lat,
      location.lng,
      business.address.coordinates.lat,
      business.address.coordinates.lng
    );
    return distance <= radius;
  });
}

export async function claimBusiness(businessId: string, userId: string) {
  const { data, error } = await supabase
    .from('businesses')
    .update({ claimed_by: userId })
    .eq('id', businessId)
    .is('claimed_by', null)
    .select()
    .single();

  if (error) throw error;
  return data;
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}