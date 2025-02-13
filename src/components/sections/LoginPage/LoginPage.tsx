'use client';

import { Button, Input } from '@/components/atoms';
import { Link } from '@/i18n/routing';
import { login } from '@/lib/data/seller';
import { useActionState } from 'react';

export const LoginPage = () => {
  const [message, formAction] = useActionState(login, null);

  return (
    <div
      className='max-w-sm w-full flex flex-col items-center'
      data-testid='login-page'
    >
      <h1 className='text-large-semi uppercase mb-6'>
        Welcome back
      </h1>
      <p className='text-center text-base-regular text-ui-fg-base mb-8'>
        Sign in to access an enhanced shopping experience.
      </p>
      <form className='w-full' action={formAction}>
        <div className='flex flex-col w-full gap-y-2'>
          <Input
            name='email'
            type='email'
            title='Enter a valid email address.'
            autoComplete='email'
            required
            data-testid='email-input'
          />
          <Input
            name='password'
            type='password'
            autoComplete='current-password'
            required
            data-testid='password-input'
          />
        </div>
        {/* <div className='text-center text-negative pt-4 label-md min-h-10'>
          {message}
        </div> */}
        <Button
          data-testid='sign-in-button'
          className='w-full mt-6'
        >
          Sign in
        </Button>
      </form>
      <span className='text-center text-ui-fg-base text-small-regular mt-6'>
        Not a member?{' '}
        <Link className='underline' href='/register'>
          Join us
        </Link>
        .
      </span>
    </div>
  );
};
