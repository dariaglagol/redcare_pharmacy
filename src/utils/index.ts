import { RepositoryType, RepositoryListType } from '../types';
import STARRED_REPOSITORIES from '../constants';

const localStorageManager = {
  getObject(key: string): any | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  setObject(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  },
  clearValue(key: string): void {
    localStorage.removeItem(key);
  },
};

const manageStarredRepoList = ({ list, prepItem }: { list: RepositoryListType, prepItem: RepositoryType }) => {
  if (list.some((item) => item.id === prepItem.id)) {
    return list.filter((item) => item.id !== prepItem.id);
  }
  return [...list, prepItem];
};

const replaceItemsInRepositoryList = ({
  list,
  prepItem,
}: {
  list: RepositoryListType;
  prepItem: RepositoryType;
}) => list.reduce((acc: RepositoryListType, item) => {
  if (item.id === prepItem.id) {
    return [...acc, { ...prepItem }];
  }
  return [...acc, item];
}, []);

const localRepositoryList = localStorageManager.getObject(STARRED_REPOSITORIES);

const repositoriesDataMapper = {
  get: (data: Omit<RepositoryType[], 'isStarred'>): Required<RepositoryListType> => data.map((item: any) => {
    const {
      name, description, stargazers_count, html_url, id, language,
    } = item;
    const isRepoStarred = localRepositoryList?.find((el: RepositoryType) => id === el.id);
    return {
      name,
      description,
      stargazers_count,
      url: html_url,
      isStarred: Boolean(isRepoStarred),
      id,
      language,
    };
  }),
};

const languageDataMapper = {
  get: (data: Omit<RepositoryType[], 'isStarred'>) => data.reduce((acc: Set<string>, { language }: Partial<RepositoryType>) => {
    if (language) {
      acc.add(language);
    }
    return acc;
  }, new Set()),
};

export {
  localStorageManager,
  replaceItemsInRepositoryList,
  manageStarredRepoList,
  repositoriesDataMapper,
  languageDataMapper,
};
