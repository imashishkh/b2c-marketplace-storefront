import { Review } from '@/types/user';

export const getUserRate = (
  reviews?: Review | Review[]
) => {
  if (!reviews) return 0;

  if (!Array.isArray(reviews)) return reviews.rating;

  return (
    reviews.reduce((sum, { rating }) => sum + rating, 0) /
    reviews.length
  );
};
