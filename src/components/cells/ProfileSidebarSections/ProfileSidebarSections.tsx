import { ProfileSidebarLink } from '@/components/molecules';
import { Link } from '@/i18n/routing';

export const ProfileSidebarSections = ({
  label,
  links,
}: {
  label: string;
  links: { url: string; label: string }[];
}) => {
  return (
    <>
      <h3 className='uppercase label-xl text-primary pb-2'>
        {label}
      </h3>
      <ul>
        {links.map(({ url, label }) => (
          <ProfileSidebarLink
            key={label}
            label={label}
            url={url}
          />
        ))}
      </ul>
    </>
  );
};
