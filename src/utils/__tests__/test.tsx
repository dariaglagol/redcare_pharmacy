import { describe, test } from '@jest/globals';
import {
  localStorageManager,
  manageStarredRepoList,
  replaceItemsInRepositoryList,
} from '../index.ts';
import { localStorageMock } from '../../__mocks__/utils.ts';
import {
  repositoriesShrinkData,
  itemWithNewId,
  localStorageDataMock,
  repositoriesShrinkDataWithoutEntry,
} from '../../__mocks__/data.ts';

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  Object.keys(localStorageDataMock).forEach((key: string) => {
    // @ts-ignore
    localStorageManager.setObject(key, localStorageDataMock[key]);
  });
});

describe('LocalStorage test set', () => {
  test('set and get data from localstorage', () => {
    expect(localStorageManager.getObject('firstEntry')).toEqual(localStorageDataMock.firstEntry);
  });

  test('remove data from localstorage', () => {
    localStorageManager.clearValue('secondEntry');
    expect(localStorageManager.getObject('secondEntry')).toEqual(null);
    const val = {
      firstEntry: JSON.stringify(localStorageDataMock.firstEntry),
      thirdEntry: JSON.stringify(localStorageDataMock.thirdEntry),
    };
    expect(localStorage.localStorage).toEqual(val);
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
    const a = replaceItemsInRepositoryList({ list: [], prepItem: repositoriesShrinkData[0] });
    expect(a).toEqual([]);
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
    const a = replaceItemsInRepositoryList({ list: repositoriesShrinkData, prepItem: item });
    expect(a).toEqual([item, ...repositoriesShrinkDataWithoutEntry]);
  });

  test('array is the same when there is new items', () => {
    const a = replaceItemsInRepositoryList({ list: repositoriesShrinkData, prepItem: itemWithNewId });
    expect(a).toEqual([...repositoriesShrinkData]);
  });
});
