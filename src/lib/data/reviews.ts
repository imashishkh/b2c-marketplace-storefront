'use server';

import { getAuthHeaders } from './cookies';

export const listReviews = async () => {
  const reviews = {};

  try {
    const headers = {
      ...(await getAuthHeaders()),
    };

    const res = await fetch('/store/reviews', {
      method: 'GET',
      headers,
    });

    const response = await res.json();
    return response;
  } catch {
    return null;
  }
};
