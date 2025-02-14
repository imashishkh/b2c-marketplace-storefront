import { ProfileProducts } from '@/components/organisms';
import { retrieveSeller } from '@/lib/data/seller';

export const ProfileDraftsPage = async () => {
  const seller = await retrieveSeller();

  const products = seller?.product || [];

  return (
    <ProfileProducts
      products={products.filter(
        ({ status }) => status === 'draft'
      )}
    />
  );
};
