import { ProfileProductsSkeleton } from '@/components/organisms';
import { ProfilePage } from '@/components/sections';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Profile - Selling',
};

export default async function UserPage() {
  return (
    <Suspense fallback={<ProfileProductsSkeleton />}>
      <ProfilePage />
    </Suspense>
  );
}
