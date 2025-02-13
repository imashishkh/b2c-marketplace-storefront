'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@/components/atoms';
import { SelectField } from '@/components/molecules';
import { HttpTypes } from '@medusajs/types';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  categories: z.string().array(),
});

export const ProfileAddListingForm = ({
  categories = [],
}: {
  categories: HttpTypes.StoreProductCategory[];
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      categories: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({
      title: values.title,
      sales_channels: [{ id: 'asdsad' }],
      discountable: true,
      categories: categories.map((id) => ({ id })),
      status: 'publish',
      variants: [
        {
          title: values.title,
          inventory_quantity: 5,
          allow_backorder: true,
          manage_inventory: true,
          prices: [
            {
              amount: 100,
              region_id: 'gb',
              currency_code: 'eur',
              min_quantity: 1,
              max_quantity: 100,
            },
          ],
        },
      ],
    });
  };

  const categoriesSelect = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Input
        placeholder='Title'
        {...form.register('title')}
      />
      <SelectField
        options={categoriesSelect}
        {...form.register('categories')}
      />

      <Button className='uppercase mt-4'>Submit</Button>
    </form>
  );
};
