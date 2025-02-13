'use client';

import { HttpTypes } from '@medusajs/types';
import { Button } from '@/components/atoms';
import { PlusIcon } from '@/icons';
import tailwindConfig from '../../../../tailwind.config';
import { Modal } from '@/components/molecules';
import { useState } from 'react';
import { ProfileAddListingForm } from '../ProfileAddListingForm/ProfileAddListingForm';

export const ProfileAddListingButton = ({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[] | null;
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button
        className='uppercase flex gap-2 items-center justify-center w-full lg:w-fit'
        onClick={() => setModalOpen(true)}
      >
        <PlusIcon
          size={20}
          color={
            tailwindConfig.theme.extend.colors.tertiary
          }
        />
        New listing
      </Button>
      {modalOpen && (
        <Modal
          heading='Add new Listing'
          onClose={() => setModalOpen(false)}
        >
          <div className='p-4'>
            <ProfileAddListingForm
              categories={categories || []}
            />
          </div>
        </Modal>
      )}
    </>
  );
};
