import { ProfilePage } from '@/components/sections';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function UserPage() {
  return (
    <main className='container'>
      <ProfilePage />
    </main>
  );
}
