import {
  ProductDetails,
  ProductGallery,
} from '@/components/organisms';
import { listProducts } from '@/lib/data/products';
import { HomeProductSection } from '../HomeProductSection/HomeProductSection';
import { listReviews } from '@/lib/data/reviews';

export const ProductDetailsPage = async ({
  handle,
  locale,
}: {
  handle: string;
  locale: string;
}) => {
  const prod = await listProducts({
    countryCode: locale,
    queryParams: {
      handle,
      fields:
        '*variants.calculated_price,+variants.inventory_quantity,+review,+reviews',
    },
  }).then(({ response }) => response.products[0]);

  const reviews = await listReviews();

  return (
    <>
      <div className='flex flex-col md:flex-row lg:gap-12'>
        <div className='md:w-1/2 md:px-2'>
          <ProductGallery images={prod.images} />
        </div>
        <div className='md:w-1/2 md:px-2'>
          <ProductDetails product={prod} locale={locale} />
        </div>
      </div>
      <div className='my-8'>
        <HomeProductSection heading='More from this seller' />
        <HomeProductSection heading='You might also like' />
      </div>
    </>
  );
};
