import {
  ProfileHeader,
  ProfileSidebar,
} from '@/components/organisms';
import { retrieveSeller } from '@/lib/data/seller';
import { redirect } from 'next/navigation';

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seller = await retrieveSeller();

  if (!seller) {
    redirect('/login');
  }

  return (
    <main className='container'>
      <ProfileHeader user={seller} />
      <div className='grid lg:grid-cols-4 mt-4 gap-4 '>
        <ProfileSidebar />
        <div className='col-span-3'>{children}</div>
      </div>
    </main>
  );
}
