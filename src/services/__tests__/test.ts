import { test, describe } from '@jest/globals';

import getRepos from '../index.ts';
import {
  repositoriesListWide, mockedUrls, mockedLanguage, FETCH_STATUS,
} from '../../__mocks__/data.ts';

import {
  mockFetch,
} from '../../__mocks__/utils.ts';

describe('Service tests', () => {
  test('Test request resolving', async () => {
    window.fetch = mockFetch({ items: repositoriesListWide });

    await expect(getRepos()).resolves.toStrictEqual({ items: repositoriesListWide });
    expect(fetch).toHaveBeenCalledWith(mockedUrls.withoutLang);
  });

  test('Test request resolving with language sent', async () => {
    window.fetch = mockFetch({ items: repositoriesListWide });
    await getRepos(mockedLanguage);
    expect(fetch).toHaveBeenCalledWith(mockedUrls.withLang);
  });

  test('Test request rejecting', async () => {
    window.fetch = mockFetch({ items: repositoriesListWide }, FETCH_STATUS.reject);

    await expect(getRepos()).rejects.toThrow('Something went wrong');
  });
});
