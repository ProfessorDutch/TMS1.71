import { supabase } from '../config/supabase';
import type { Database } from '../types/supabase';

type Church = Database['public']['Tables']['churches']['Row'];
type NewChurch = Database['public']['Tables']['churches']['Insert'];

export async function searchChurches(query: string, location: { lat: number; lng: number }, radius: number) {
  const { data, error } = await supabase
    .from('churches')
    .select('*')
    .textSearch('name', query, { config: 'english' })
    .not('coordinates', 'is', null);

  if (error) throw error;

  // Filter churches within radius
  return data.filter(church => {
    if (!church.coordinates) return false;
    const distance = calculateDistance(
      location.lat,
      location.lng,
      church.coordinates.lat,
      church.coordinates.lng
    );
    return distance <= radius;
  });
}

export async function claimChurch(churchId: string, userId: string) {
  const { data, error } = await supabase
    .from('churches')
    .update({ claimed_by: userId })
    .eq('id', churchId)
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