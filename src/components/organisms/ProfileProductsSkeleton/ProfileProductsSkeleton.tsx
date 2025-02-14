export const ProfileProductsSkeleton = () => {
  return (
    <div>
      <div className='w-full flex justify-between'>
        <div className='h-10 w-40 rounded-sm bg-component-secondary animate-pulse' />
        <div className='h-10 w-80 rounded-sm bg-component-secondary animate-pulse' />
      </div>
      <div className='grid grid-cols-2 gap-2'>
        {Array.from(Array(4).keys()).map((item) => (
          <div
            key={item}
            className='rounded-lg bg-component py-4'
          >
            <div className='relative h-40 w-full overflow-hidden rounded-md bg-component-secondary animate-pulse' />
            <div className='mt-2 flex justify-between'>
              <div className='flex gap-2'>
                <div className='h-4 w-16 rounded bg-component-secondary animate-pulse' />
                <div className='h-4 w-48 rounded bg-component-secondary animate-pulse' />
              </div>
              <div className='h-4 w-48 rounded bg-component-secondary animate-pulse' />
            </div>
            <div className='flex items-center justify-between pt-4'>
              <div className='h-10 w-full rounded-sm bg-component-secondary animate-pulse' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
