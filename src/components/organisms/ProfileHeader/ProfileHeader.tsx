import { format } from 'date-fns';
import {
  Avatar,
  Divider,
  StarRating,
} from '@/components/atoms';
import { DoneIcon } from '@/icons';
import { ProfileHeaderButtons } from '@/components/cells';
import { StoreVendor } from '@/types/user';
import { getUserRate } from '@/lib/helpers/get-user-rate';

export const ProfileHeader = ({
  user,
}: {
  user: StoreVendor | null;
}) => {
  const rate = getUserRate(user?.review);

  return (
    <>
      <div className='border rounded-t-sm p-5 lg:flex justify-between items-center'>
        <div className='flex gap-3'>
          <Avatar
            size='large'
            src={'/images/product/seller-avatar.jpg'}
            className='w-[64px] h-[64px]'
          />
          <div>
            <h2 className='uppercase heading-md text-primary'>
              {user?.name}
            </h2>
            <div className='flex items-center gap-2'>
              <StarRating rate={rate} starSize={14} />{' '}
              <span className='label-md'>{rate}</span>
            </div>
          </div>
        </div>
        <div className='mt-4 lg:mt-0'>
          <ProfileHeaderButtons />
        </div>
      </div>
      <div className='border-b border-x rounded-b-sm p-5 flex label-md items-center gap-3'>
        <DoneIcon />
        Verified seller
        <Divider square className='mb-1' />
        Joined in{' '}
        {format(user?.created_at || new Date(), 'yyyy')}
      </div>
    </>
  );
};
