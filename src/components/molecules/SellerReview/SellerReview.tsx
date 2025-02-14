import { StarRating } from '@/components/atoms';

import { Review } from '@/types/user';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';

export const SellerReview = async ({
  review,
}: {
  review: Review;
}) => {
  return (
    <div className='mb-4'>
      <div className='mb-4 flex gap-4 items-center'>
        <StarRating starSize={16} rate={review.rating} />
        <p className='label-md text-secondary'>
          {review.customer_id} |{' '}
          {formatDistanceToNow(review.created_at, {
            addSuffix: true,
          })}
        </p>
      </div>
      <div className='flex gap-4'>
        <p className='text-md'>{review.customer_note}</p>
        {review.reference === 'product' && (
          <Image
            src={'/images/product/placeholder.jpg'}
            alt='Reviewed product image'
            width={56}
            height={56}
            className='w-[56px] h-[56px]'
          />
        )}
      </div>
    </div>
  );
};
