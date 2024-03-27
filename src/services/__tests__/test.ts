import { test, describe } from '@jest/globals';

import getRepos from '../index.ts';
import {
  repositorySet, mockedUrls, mockedLanguage, FETCH_STATUS,
} from '../../__mocks__/data.ts';

import {
  mockFetch,
} from '../../__mocks__/utils.ts';

describe('Service tests', () => {
  test('Test request resolving', async () => {
    window.fetch = mockFetch({ items: repositorySet.wideData });

    await expect(getRepos()).resolves.toStrictEqual({ items: repositorySet.wideData });
    expect(fetch).toHaveBeenCalledWith(mockedUrls.withoutLang);
  });

  test('Test request resolving with language sent', async () => {
    window.fetch = mockFetch({ items: repositorySet.wideData });
    await getRepos(mockedLanguage);
    expect(fetch).toHaveBeenCalledWith(mockedUrls.withLang);
  });

  test('Test request rejecting', async () => {
    window.fetch = mockFetch({ items: repositorySet.wideData }, FETCH_STATUS.reject);

    await expect(getRepos()).rejects.toThrow('Something went wrong');
  });
});
