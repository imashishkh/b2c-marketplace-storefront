import { StarRating } from '@/components/atoms';
import { getUserRate } from '@/lib/helpers/get-user-rate';
import { StoreVendor } from '@/types/user';
import Image from 'next/image';

export const SellerInfo = ({
  seller,
}: {
  seller: StoreVendor;
}) => {
  const rate = getUserRate(seller.review);

  const reviesCount = !seller.review
    ? 0
    : !Array.isArray(seller.review)
    ? 1
    : seller.review.length;

  return (
    <div className='flex gap-4'>
      <div className='relative h-12 w-12 overflow-hidden rounded-sm'>
        <Image
          src={
            seller.photo ||
            '/images/product/placeholder.jpg'
          }
          alt={seller.name}
          width={56}
          height={56}
          className='object-cover'
        />
      </div>
      <div>
        <h3 className='heading-sm text-primary'>
          {seller.name}
        </h3>
        <div className='flex items-center gap-2'>
          <StarRating starSize={16} rate={rate} />
          <span className='text-md text-secondary'>
            {reviesCount} reviews
          </span>
        </div>
      </div>
    </div>
  );
};
