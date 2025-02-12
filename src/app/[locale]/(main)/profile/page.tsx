import { ProfilePage } from '@/components/sections';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function UserPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  return (
    <main className='container'>
      <ProfilePage locale={locale} />
    </main>
  );
}
