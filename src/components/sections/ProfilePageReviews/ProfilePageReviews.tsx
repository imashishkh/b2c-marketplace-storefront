import {
  ProfileReviewsEmptyScreen,
  SellerReview,
} from '@/components/molecules';
import { retrieveSeller } from '@/lib/data/seller';

export const ProfilePageReviews = async () => {
  const seller = await retrieveSeller();

  if (!seller?.review) return <ProfileReviewsEmptyScreen />;

  if (!Array.isArray(seller.review))
    return <SellerReview review={seller.review} />;

  return (
    <>
      {seller.review.map((review) => (
        <div
          key={review.id}
          className='border rounded-sm p-4 mb-4'
        >
          <SellerReview review={review} />
        </div>
      ))}
    </>
  );
};
