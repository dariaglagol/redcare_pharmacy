import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { repositoriesListState, repositoriesStarredListState } from '../states/state.ts';
import localStorageManager from '../utils';
import { RepositoryType, RepositorytListType } from '../types';
import { STARRED_REPOSITORIES } from '../constants';

const useStarredList = () => {
  const setStarredList = useSetRecoilState(repositoriesStarredListState);
  const setRepoList = useSetRecoilState(repositoriesListState);

  const repoList = useRecoilValue(repositoriesListState);
  const starredList = useRecoilValue(repositoriesStarredListState);

  const manageStarredRepoList = ({ list, prepItem }: { list: RepositorytListType, prepItem: RepositoryType }) => {
    if (list.some((item: any) => item.id === prepItem.id)) {
      return list.filter((item: any) => item.id !== prepItem.id);
    }
    return [...list, prepItem];
  };

  const starItem = (repoItem: any) => {
    const { id, isStarred } = repoItem;
    const prepItem = { ...repoItem, isStarred: !isStarred };
    const processedRepositoryList: RepositorytListType = repoList.reduce((acc: RepositorytListType, item: RepositoryType) => {
      if (item.id === id) {
        return [...acc, { ...prepItem }];
      }
      return [...acc, item];
    }, []);
    setRepoList(processedRepositoryList);

    setStarredList((prevState) => (prevState
      ? manageStarredRepoList({ list: prevState, prepItem })
      : [prepItem]));
  };

  // одно из этих надо убрать
  useEffect(() => {
    if (starredList) {
      localStorageManager.setObject(STARRED_REPOSITORIES, starredList);
    }
  }, [starredList]);

  useEffect(() => {
    const localStarredList = localStorageManager.getObject(STARRED_REPOSITORIES);
    if (localStarredList) {
      setStarredList(localStarredList);
    }
  }, []);

  return { starItem };
};

export default useStarredList;
