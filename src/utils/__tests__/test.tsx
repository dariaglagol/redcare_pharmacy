import { describe, test } from '@jest/globals';
import {
  localStorageManager,
  manageStarredRepoList,
  replaceItemsInRepositoryList,
  repositoriesDataMapper,
  languageDataMapper,
} from '../index.ts';
import { localStorageMock } from '../../__mocks__/utils.ts';
import {
  itemWithNewId, languageList,
  localStorageDataMock,
  repositoriesListWide,
  repositoriesShrinkData,
  repositoriesShrinkDataWithoutEntry, starredRepositories,
} from '../../__mocks__/data.ts';
import STARRED_REPOSITORIES from '../../constants';

beforeAll(() => {
  // @ts-ignore
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  Object.keys(localStorageDataMock).forEach((key: string) => {
    // @ts-ignore
    localStorageManager.setObject(key, localStorageDataMock[key]);
  });
});

describe('LocalStorage test set', () => {
  test('set and get data from localstorage', () => {
    expect(localStorageManager.getObject(STARRED_REPOSITORIES)).toEqual(localStorageDataMock[STARRED_REPOSITORIES]);
  });

  test('remove data from localstorage', () => {
    localStorageManager.clearValue('secondEntry');
    expect(localStorageManager.getObject('secondEntry')).toEqual(null);
    const val = {
      [STARRED_REPOSITORIES]: JSON.stringify(localStorageDataMock[STARRED_REPOSITORIES]),
      thirdEntry: JSON.stringify(localStorageDataMock.thirdEntry),
    };
    expect(localStorage.getItem(STARRED_REPOSITORIES)).toEqual(val[STARRED_REPOSITORIES]);
    expect(localStorage.getItem('thirdEntry')).toEqual(val.thirdEntry);
  });
});

describe('manageStarredRepoList test set', () => {
  test('add new item in starred list', () => {
    const a = manageStarredRepoList({ list: repositoriesShrinkData, prepItem: itemWithNewId });
    expect(a).toEqual([...repositoriesShrinkData, itemWithNewId]);
  });

  test('add new item if there is no list before', () => {
    const a = manageStarredRepoList({ list: [], prepItem: itemWithNewId });
    expect(a).toEqual([itemWithNewId]);
  });

  test('remove item from starredList', () => {
    const a = manageStarredRepoList({ list: repositoriesShrinkData, prepItem: repositoriesShrinkData[0] });
    expect(a).toEqual(repositoriesShrinkDataWithoutEntry);
  });
});

describe('replaceItemsInRepositoryList test set', () => {
  test('if list is empty', () => {
    const processedRepositories = replaceItemsInRepositoryList({ list: [], prepItem: repositoriesShrinkData[0] });
    expect(processedRepositories).toEqual([]);
  });

  test('change item with new isStarred parameter', () => {
    const item = {
      id: 78483432,
      name: 'TranslucentTB',
      url: 'https://github.com/TranslucentTB/TranslucentTB',
      description: 'A lightweight utility that makes the Windows taskbar translucent/transparent.',
      stargazers_count: 13996,
      language: 'C++',
      isStarred: true,
    };
    const processedRepositories = replaceItemsInRepositoryList({ list: repositoriesShrinkData, prepItem: item });
    expect(processedRepositories).toEqual([item, ...repositoriesShrinkDataWithoutEntry]);
  });

  test('array is the same when there is new items', () => {
    const processedRepositories = replaceItemsInRepositoryList({ list: repositoriesShrinkData, prepItem: itemWithNewId });
    expect(processedRepositories).toEqual([...repositoriesShrinkData]);
  });
});

describe('repositoriesDataMapper tests set', () => {
  test('repositoriesDataMapper processed data with empty localstorage', () => {
    localStorageManager.clearValue(STARRED_REPOSITORIES);
    const processedData = repositoriesDataMapper.get(repositoriesListWide);

    expect(processedData).toEqual(repositoriesShrinkData);
  });

  test('repositoriesDataMapper processed empty list', () => {
    const processedData = repositoriesDataMapper.get([]);
    expect(processedData).toEqual([]);
  });

  test('repositoriesDataMapper processed data with STARRED_REPOSITORIES property set', () => {
    localStorageManager.setObject(STARRED_REPOSITORIES, starredRepositories);
    const processedData = repositoriesDataMapper.get(repositoriesListWide);
    expect(processedData).toEqual(starredRepositories);
  });
});

describe('languageDataMapper tests set', () => {
  test('languageDataMapper return language set', () => {
    const langList = languageDataMapper.get(repositoriesListWide);
    expect(langList).toEqual(languageList);
  });
  test('languageDataMapper return empty set there is no data', () => {
    const langList = languageDataMapper.get([]);
    expect(langList).toEqual(new Set());
  });
  test('languageDataMapper return only unique languages', () => {
    const langList = languageDataMapper.get([...repositoriesListWide, itemWithNewId]);
    expect(langList).toEqual(languageList);
  });
});
