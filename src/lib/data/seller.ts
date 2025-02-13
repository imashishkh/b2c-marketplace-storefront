'use server';
import { getAuthHeaders, setAuthToken } from './cookies';
import { sdk } from '../config';
import { transferCart } from './customer';
import { StoreVendor } from '@/types/user';
import { products } from '@/data/productsMock';

const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ||
  'http://localhost:9000';

const PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '';

export const retrieveSeller =
  async (): Promise<StoreVendor | null> => {
    const headers = {
      ...(await getAuthHeaders()),
    };

    return await sdk.client
      .fetch<{ seller: StoreVendor }>(
        '/vendor/sellers/me',
        {
          headers,
          query: {
            fields: '+product, +created_at',
          },
        }
      )
      .then(({ seller }) => seller)
      .catch(() => null);
  };

export const login = async (
  _currentState: unknown,
  formData: FormData
) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const token = await sdk.auth
    .login('seller', 'emailpass', { email, password })
    .then((token) => token);

  await setAuthToken(token as string);
};

export const signup = async (
  _currentState: unknown,
  formData: FormData
) => {
  try {
    const password = formData.get('password') as string;
    const email = formData.get('email') as string;
    const name = `${formData.get(
      'first_name'
    )} ${formData.get('last_name')}` as string;

    const sellerForm = {
      name,
      member: {
        name,
      },
    };

    const token = await sdk.auth.register(
      'seller',
      'emailpass',
      {
        email,
        password,
      }
    );

    await setAuthToken(token as string);

    const headers = {
      ...(await getAuthHeaders()),
    };

    await fetch(`${MEDUSA_BACKEND_URL}/vendor/sellers`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        'x-publishable-api-key': PUBLISHABLE_KEY,
      },
      body: JSON.stringify(sellerForm),
    });

    const loginToken = await fetch(
      `${MEDUSA_BACKEND_URL}/auth/seller/emailpass`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ email, password }),
      }
    ).then((res) => res.json());

    await setAuthToken(loginToken as string);

    await transferCart();
  } catch (error: any) {
    return error.toString();
  }
};

export const listSellerProducts = async () => {
  const headers = {
    ...(await getAuthHeaders()),
  };

  return await fetch(
    `${MEDUSA_BACKEND_URL}/vendor/products?fields=+created_at`,
    {
      method: 'GET',
      headers: {
        ...headers,
        'x-publishable-api-key': PUBLISHABLE_KEY,
      },
    }
  )
    .then((res) => res.json())
    .then(({ products }) => products)
    .catch(() => []);
};
