import { Button } from '@/components/atoms';
import { PlusIcon } from '@/icons';
import tailwindConfig from '../../../../tailwind.config';

export const ProfileHeaderButtons = () => {
  return (
    <div className='flex gap-2'>
      <Button className='uppercase flex gap-2 items-center'>
        <PlusIcon
          size={20}
          color={
            tailwindConfig.theme.extend.colors.tertiary
          }
        />
        New listing
      </Button>
      <Button variant='tonal' className='uppercase'>
        Edit profile
      </Button>
    </div>
  );
};
