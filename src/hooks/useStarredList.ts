import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { repositoriesListState, repositoriesStarredListState } from '../states/state.ts';
import { localStorageManager, manageStarredRepoList, replaceItemsInRepositoryList } from '../utils';
import STARRED_REPOSITORIES from '../constants';
import { RepositoryType } from '../types';

const useStarredList = () => {
  const [repoList, setRepoList] = useRecoilState(repositoriesListState);
  const [starredList, setStarredList] = useRecoilState(repositoriesStarredListState);

  const setStarToItem = (repoItem: RepositoryType) => {
    const { isStarred } = repoItem;
    const prepItem = { ...repoItem, isStarred: !isStarred };
    const processedRepositoryList = replaceItemsInRepositoryList({ list: repoList, prepItem });
    setRepoList(processedRepositoryList);

    setStarredList((prevState) => (prevState
      ? manageStarredRepoList({ list: prevState, prepItem })
      : [prepItem]));
  };

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

  return { setStarToItem };
};

export default useStarredList;
