import { ProfileProducts } from '@/components/organisms';
import { retrieveSeller } from '@/lib/data/seller';

export const ProfilePage = async () => {
  const seller = await retrieveSeller();

  const products = seller?.product || [];

  return (
    <ProfileProducts
      products={products.filter(
        ({ status }) => status === 'published'
      )}
    />
  );
};
