import { LoginPage } from '@/components/sections';
import { retrieveCustomer } from '@/lib/data/customer';
import { redirect } from 'next/navigation';

export default async function Login() {
  const customer = await retrieveCustomer();

  if (customer) {
    redirect('/profile');
  }

  return (
    <main className='flex justify-center align-center mt-20'>
      <LoginPage />
    </main>
  );
}
