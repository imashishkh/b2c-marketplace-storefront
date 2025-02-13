'use client';
import { Button, Input, Label } from '@/components/atoms';
import { Link } from '@/i18n/routing';
import { signup } from '@/lib/data/seller';
import { useActionState } from 'react';

export const RegisterPage = () => {
  const [message, formAction] = useActionState(
    signup,
    null
  );

  return (
    <div
      className='max-w-sm flex flex-col items-center'
      data-testid='register-page'
    >
      <h1 className='text-large-semi uppercase mb-6'>
        Become a Mercur Store Member
      </h1>
      <p className='text-center text-base-regular text-ui-fg-base mb-4'>
        Create your Mercur Member profile, and get access to
        an enhanced shopping experience.
      </p>
      <form
        className='w-full flex flex-col'
        action={formAction}
      >
        <div className='flex flex-col w-full gap-y-2'>
          <label>
            First name
            <Input
              name='first_name'
              autoComplete='given-name'
              data-testid='first-name-input'
            />
          </label>
          <label>
            Last name
            <Input
              name='last_name'
              autoComplete='family-name'
              data-testid='last-name-input'
            />
          </label>
          <label>
            Email
            <Input
              name='email'
              type='email'
              autoComplete='email'
              data-testid='email-input'
            />
          </label>
          <label>
            Password
            <Input
              name='password'
              type='password'
              autoComplete='new-password'
              data-testid='password-input'
            />
          </label>
        </div>
        <div className='text-center text-negative pt-4 label-md min-h-10'>
          {message}
        </div>
        <Button
          className='w-full mt-6'
          data-testid='register-button'
        >
          Join
        </Button>
      </form>
      <span className='text-center text-ui-fg-base text-small-regular mt-6'>
        Already a member?{' '}
        <Link href='/login' className='underline'>
          Sign in
        </Link>
        .
      </span>
    </div>
  );
};
