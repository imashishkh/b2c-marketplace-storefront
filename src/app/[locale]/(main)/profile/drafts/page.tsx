import { ProfileProductsSkeleton } from '@/components/organisms';
import { ProfileDraftsPage } from '@/components/sections';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Profile - Drafts',
};

export default function ProfileDrafts() {
  return (
    <Suspense fallback={<ProfileProductsSkeleton />}>
      <ProfileDraftsPage />
    </Suspense>
  );
}
