import { RepositoryType, RepositoryListType } from '../types';

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

export {
  localStorageManager,
  replaceItemsInRepositoryList,
  manageStarredRepoList,
};
