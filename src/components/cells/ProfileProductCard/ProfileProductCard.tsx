import { Button } from '@/components/atoms';
import { ProfileProductMenu } from '@/components/molecules';
import {
  BinIcon,
  DiscountIcon,
  DoneIcon,
  EditIcon,
  RocketIcon,
} from '@/icons';
import { getProductPrice } from '@/lib/helpers/get-product-price';
import { HttpTypes } from '@medusajs/types';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';

const menuItems = [
  { label: 'Edit', icon: <EditIcon />, action: '#' },
  { label: 'Boost', icon: <RocketIcon />, action: '#' },
  {
    label: 'Discount',
    icon: <DiscountIcon />,
    action: '#',
  },
  {
    label: 'Mark as sold',
    icon: <DoneIcon />,
    action: '#',
  },
  { label: 'Delete', icon: <BinIcon />, action: '#' },
];

export const ProfileProductCard = ({
  product,
}: {
  product: HttpTypes.StoreProduct;
}) => {
  const postedAt = formatDistanceToNow(
    new Date(product.created_at || ''),
    { addSuffix: true }
  );

  const { cheapestPrice } = getProductPrice({
    product,
  });

  const isPromotion =
    cheapestPrice?.original_price_number >
    cheapestPrice?.calculated_price_number;

  return (
    <div className='border rounded-sm relative'>
      <div className='flex gap-4 p-1'>
        <Image
          src={
            product.thumbnail ||
            '/images/product/placeholder.jpg'
          }
          width={100}
          height={133}
          alt={product.title}
          className='h-[133px] w-auto max-w-[100px] object-cover rounded-xs'
        />
        <div className='py-4'>
          <h2 className='heading-xs mb-4'>
            {product.title}
          </h2>
          {isPromotion && (
            <p className='label-md line-through'>
              {cheapestPrice?.original_price}
            </p>
          )}
          <p className='label-lg'>
            {cheapestPrice?.calculated_price}
          </p>
        </div>
        <ProfileProductMenu items={menuItems} />
      </div>
      <div className='text-right p-4'>
        <p className='label-md'>Posted: {postedAt}</p>
      </div>
      <div className='border-t p-4'>
        <Button
          variant='tonal'
          className='w-full uppercase !font-normal'
        >
          Boost
        </Button>
      </div>
    </div>
  );
};
