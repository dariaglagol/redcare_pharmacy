import { RepositoryListType, RepositoryType } from '../types';

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

export default replaceItemsInRepositoryList;
