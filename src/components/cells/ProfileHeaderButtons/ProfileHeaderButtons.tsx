import { Button } from '@/components/atoms';
import { ProfileAddListingButton } from '../ProfileAddListingButton/ProfileAddListingButton';
import { listCategories } from '@/lib/data/categories';
import { PARENT_CATEGORIES } from '@/const';
import { HttpTypes } from '@medusajs/types';

export const ProfileHeaderButtons = async () => {
  const { categories } = (await listCategories({
    headingCategories: PARENT_CATEGORIES,
  })) as {
    categories: HttpTypes.StoreProductCategory[];
    parentCategories: HttpTypes.StoreProductCategory[];
  };
  return (
    <div className='lg:flex gap-2 grid'>
      <ProfileAddListingButton categories={categories} />
      <Button
        variant='tonal'
        className='uppercase w-full lg:w-fit'
      >
        Edit profile
      </Button>
    </div>
  );
};
