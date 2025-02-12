import { ProfileSidebarSections } from '@/components/cells';
import profileSidebarItems from '@/data/profileSidebarItems';
import { twMerge } from 'tailwind-merge';

export const ProfileSidebar = () => {
  return (
    <div className='border rounded-sm max-h-min'>
      {profileSidebarItems.map(
        ({ section, links }, index) => (
          <div
            key={section}
            className={twMerge(
              'p-5',
              index < profileSidebarItems.length - 1 &&
                'border-b'
            )}
          >
            <ProfileSidebarSections
              label={section}
              links={links}
            />
          </div>
        )
      )}
    </div>
  );
};
