import { LoginPage } from '@/components/sections';
import { retrieveSeller } from '@/lib/data/seller';
import { redirect } from 'next/navigation';

export default async function Login() {
  const vendor = await retrieveSeller();

  if (vendor) {
    redirect('/profile');
  }

  return (
    <main className='flex justify-center align-center mt-20'>
      <LoginPage />
    </main>
  );
}
