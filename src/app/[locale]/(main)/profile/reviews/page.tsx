import { ProfilePageReviews } from '@/components/sections';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile - Reviews',
};

export default function ProfileReviews() {
  return <ProfilePageReviews />;
}
