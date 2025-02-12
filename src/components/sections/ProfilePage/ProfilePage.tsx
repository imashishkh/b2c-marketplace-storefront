import {
  ProfileHeader,
  ProfileProducts,
  ProfileSidebar,
} from '@/components/organisms';
import { retrieveCustomer } from '@/lib/data/customer';
import { listProducts } from '@/lib/data/products';

import { redirect } from 'next/navigation';

export const ProfilePage = async ({
  locale,
}: {
  locale: string;
}) => {
  const user = await retrieveCustomer();

  const {
    response: { products },
  } = await listProducts({
    countryCode: locale,
  });

  if (!user) {
    redirect('/login');
  }
  return (
    <>
      <ProfileHeader user={user} />
      <div className='grid grid-cols-4 mt-4 gap-4'>
        <ProfileSidebar />
        <div className='col-span-3'>
          <ProfileProducts products={[]} />
        </div>
      </div>
    </>
  );
};
