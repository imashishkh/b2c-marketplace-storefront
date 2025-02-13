import {
  ProfileHeader,
  ProfileProducts,
  ProfileSidebar,
} from '@/components/organisms';
import {
  listSellerProducts,
  retrieveSeller,
} from '@/lib/data/seller';

import { redirect } from 'next/navigation';

export const ProfilePage = async () => {
  const seller = await retrieveSeller();

  const sellerProducts = await listSellerProducts();

  if (!seller) {
    redirect('/login');
  }
  return (
    <>
      <ProfileHeader user={seller} />
      <div className='grid lg:grid-cols-4 mt-4 gap-4 '>
        <ProfileSidebar />
        <div className='col-span-3'>
          <ProfileProducts products={sellerProducts} />
        </div>
      </div>
    </>
  );
};
