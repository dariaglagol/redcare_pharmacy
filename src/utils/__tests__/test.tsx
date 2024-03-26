import { describe, test } from '@jest/globals';
import {
  localStorageManager,
  manageStarredRepoList,
  replaceItemsInRepositoryList,
} from '../index.ts';
import { localStorageMock } from '../../__mocks__/utils.ts';
import { repositoriesShrinkData } from '../../__mocks__/data.ts';

const repositoriesListWithoutEntry = [
  {
    id: 78494737,
    name: 'walle',
    url: 'https://github.com/Meituan-Dianping/walle',
    description: 'Android Signature V2 Scheme签名下的新一代渠道包打包神器',
    stargazers_count: 6699,
    isStarred: false,
    language: 'Java',
  },
  {
    id: 78566876,
    name: 'prettier-vscode',
    description: 'Visual Studio Code extension for Prettier',
    url: 'https://github.com/prettier/prettier-vscode',
    language: 'TypeScript',
    stargazers_count: 5008,
    isStarred: false,
  },
  {
    id: 78492853,
    name: 'wux-weapp',
    url: 'https://github.com/wux-weapp/wux-weapp',
    description: ':dog: 一套组件化、可复用、易扩展的微信小程序 UI 组件库',
    isStarred: false,
    language: 'JavaScript',
    stargazers_count: 4961,
  },
];

const itemWithNewId = {
  id: 7849477,
  name: 'walle',
  url: 'https://github.com/Meituan-Dianping/walle',
  description: 'Android Signature V2 Scheme签名下的新一代渠道包打包神器',
  stargazers_count: 6699,
  isStarred: false,
  language: 'Java',
};

const localStorageDataMock = {
  firstEntry: repositoriesShrinkData,
  secondEntry: [{ key: 56, id: 454 }],
  thirdEntry: [{ key: 12, id: 8765 }],
};

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
    expect(a).toEqual(repositoriesListWithoutEntry);
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
    expect(a).toEqual([item, ...repositoriesListWithoutEntry]);
  });

  test('array is the same when there is new items', () => {
    const a = replaceItemsInRepositoryList({ list: repositoriesShrinkData, prepItem: itemWithNewId });
    expect(a).toEqual([...repositoriesShrinkData]);
  });
});
