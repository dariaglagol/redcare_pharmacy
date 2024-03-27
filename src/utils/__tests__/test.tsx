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
  repositorySet,
  languageList,
  localStorageDataMock,
} from '../../__mocks__/data.ts';
import STARRED_REPOSITORIES from '../../constants';

const {
  newItem, starredItem, shrinkData, shrinkDataWithoutEntry, wideData, starredData,
} = repositorySet;

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  Object.keys(localStorageDataMock).forEach((key: string) => {
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
    const a = manageStarredRepoList({ list: shrinkData, prepItem: newItem });
    expect(a).toEqual([...shrinkData, newItem]);
  });

  test('add new item if there is no list before', () => {
    const a = manageStarredRepoList({ list: [], prepItem: newItem });
    expect(a).toEqual([newItem]);
  });

  test('remove item from starredList', () => {
    const a = manageStarredRepoList({ list: shrinkData, prepItem: shrinkData[0] });
    expect(a).toEqual(repositorySet.shrinkDataWithoutEntry);
  });
});

describe('replaceItemsInRepositoryList test set', () => {
  test('if list is empty', () => {
    const processedRepositories = replaceItemsInRepositoryList({ list: [], prepItem: shrinkData[0] });
    expect(processedRepositories).toEqual([]);
  });

  test('change item with new isStarred parameter', () => {
    const processedRepositories = replaceItemsInRepositoryList({ list: shrinkData, prepItem: starredItem });
    expect(processedRepositories).toEqual([starredItem, ...shrinkDataWithoutEntry]);
  });

  test('array is the same when there is new items', () => {
    const processedRepositories = replaceItemsInRepositoryList({ list: shrinkData, prepItem: newItem });
    expect(processedRepositories).toEqual([...shrinkData]);
  });
});

describe('repositoriesDataMapper tests set', () => {
  test('repositoriesDataMapper processed data with empty localstorage', () => {
    localStorageManager.clearValue(STARRED_REPOSITORIES);
    const processedData = repositoriesDataMapper.get(wideData);

    expect(processedData).toEqual(shrinkData);
  });

  test('repositoriesDataMapper processed empty list', () => {
    const processedData = repositoriesDataMapper.get([]);
    expect(processedData).toEqual([]);
  });

  test('repositoriesDataMapper processed data with STARRED_REPOSITORIES property set', () => {
    localStorageManager.setObject(STARRED_REPOSITORIES, starredData);
    const processedData = repositoriesDataMapper.get(wideData);
    expect(processedData).toEqual(starredData);
  });
});

describe('languageDataMapper tests set', () => {
  test('languageDataMapper return language set', () => {
    const langList = languageDataMapper.get(wideData);
    expect(langList).toEqual(languageList);
  });
  test('languageDataMapper return empty set there is no data', () => {
    const langList = languageDataMapper.get([]);
    expect(langList).toEqual(new Set());
  });
  test('languageDataMapper return only unique languages', () => {
    const langList = languageDataMapper.get([...wideData, newItem]);
    expect(langList).toEqual(languageList);
  });
});
