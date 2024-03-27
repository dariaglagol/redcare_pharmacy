import { RepositoryListType, RepositoryType } from '../types';

const manageStarredRepoList = ({ list, prepItem }: { list: RepositoryListType, prepItem: RepositoryType }) => {
  if (list.some((item) => item.id === prepItem.id)) {
    return list.filter((item) => item.id !== prepItem.id);
  }
  return [...list, prepItem];
};

export default manageStarredRepoList;
