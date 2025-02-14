import { HttpTypes } from '@medusajs/types';

export interface Review {
  id: string;
  rating: number;
  customer_id: string;
  customer_note: string;
  created_at: string;
  reference: string;
}

export interface StoreVendor {
  id: string;
  name: string;
  description?: string;
  handle: string;
  photo?: string;
  created_at: string;
  product?: HttpTypes.StoreProduct[];
  review?: Review | Review[];
}
