import { Button } from '@/components/atoms';
import { SellerReview } from '@/components/molecules';
import { Review } from '@/types/user';

export const ProductDetailsSellerReviews = ({
  reviews,
}: {
  reviews: Review[];
}) => {
  return (
    <div className='p-4 border rounded-sm'>
      <div className='flex justify-between items-center mb-5'>
        <h4 className='uppercase heading-sm'>
          Seller reviews
        </h4>
        <Button
          variant='tonal'
          className='uppercase label-md font-400'
        >
          See more
        </Button>
      </div>
      {reviews.map((review) => (
        <SellerReview key={review.id} review={review} />
      ))}
    </div>
  );
};
