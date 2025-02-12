import { Button } from '@/components/atoms';
import { PlusIcon } from '@/icons';
import tailwindConfig from '../../../../tailwind.config';

export const ProfileProductsEmptyScreen = () => {
  return (
    <div className='max-w-[466px] text-center mx-auto my-14'>
      <h2 className='heading-lg text-primary uppercase'>
        No selling items
      </h2>
      <p className='mt-3'>
        You don't sell any items currently.
      </p>
      <Button className='w-full mt-4 flex gap-3 justify-center py-3 uppercase'>
        <PlusIcon
          size={20}
          color={
            tailwindConfig.theme.extend.colors.tertiary
          }
        />
        New Listing
      </Button>
    </div>
  );
};
