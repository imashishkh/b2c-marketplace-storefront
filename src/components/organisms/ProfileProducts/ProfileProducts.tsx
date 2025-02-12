'use client';
import { Input } from '@/components/atoms';
import { ProfileProductCard } from '@/components/cells';
import { ProfileProductsEmptyScreen } from '@/components/molecules';
import { SearchIcon } from '@/icons';
import { HttpTypes } from '@medusajs/types';
import { useEffect, useState } from 'react';

export const ProfileProducts = ({
  products,
}: {
  products: HttpTypes.StoreProduct[];
}) => {
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] =
    useState(products);

  useEffect(() => {
    if (!search) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(({ title }) =>
          title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search]);

  const count = filteredProducts.length;

  return (
    <div>
      {!count ? (
        <ProfileProductsEmptyScreen />
      ) : (
        <>
          <div className='flex justify-between items-center'>
            <p className='label-md'>{count} listings</p>
            <Input
              icon={<SearchIcon />}
              placeholder='Search listings'
              value={search}
              changeValue={setSearch}
            />
          </div>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            {filteredProducts.map((product) => (
              <ProfileProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
