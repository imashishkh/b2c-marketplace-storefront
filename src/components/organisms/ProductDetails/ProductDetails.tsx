import {
  ProductDetailsFooter,
  ProductDetailsHeader,
  ProductDetailsMeasurements,
  ProductDetailsSeller,
  ProductDetailsSellerReviews,
  ProductDetailsShipping,
  ProductPageDetails,
} from '@/components/cells';
import { singleProduct } from '@/data/singleProductMock';
import { MercurProduct } from '@/types/product';

export const ProductDetails = ({
  product,
  locale,
}: {
  product: MercurProduct;
  locale: string;
}) => {
  const sellerRevies = !product?.seller?.review
    ? []
    : !Array.isArray(product.seller.review)
    ? [product.seller.review]
    : product?.seller?.review;
  return (
    <div>
      <ProductDetailsHeader
        product={product}
        locale={locale}
      />
      <ProductPageDetails
        details={product.description || ''}
      />
      <ProductDetailsMeasurements
        measurements={singleProduct.measurements}
      />
      <ProductDetailsShipping />
      <ProductDetailsSeller seller={product.seller} />
      <ProductDetailsSellerReviews reviews={sellerRevies} />
      <ProductDetailsFooter
        tags={product.tags || []}
        posted={product.created_at}
      />
    </div>
  );
};
