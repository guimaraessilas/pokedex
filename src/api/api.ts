import client from './client';

export const api = {
  getAll: async (offset: number, limit: number) => {
    return client({
      method: 'get',
      url: `pokemon?limit=${limit}&&offset=${offset}`,
    });
  },
  getDetails: async (url: string) => {
    return client({
      method: 'get',
      baseURL: url,
    });
  },
};
