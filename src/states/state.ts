import { atom, selector, selectorFamily } from 'recoil';
import {
  localStorageManager,
  repositoriesDataMapper,
  languageDataMapper,
} from '../utils';
import getRepos from '../services';
import { RepositoryListType } from '../types';
import STARRED_REPOSITORIES from '../constants';

const localRepositoryList = localStorageManager.getObject(STARRED_REPOSITORIES);

const repositoriesListState = atom<RepositoryListType>({
  key: 'repositoriesList',
  default: [],
});

const repositoriesStarredListState = atom<RepositoryListType | null>({
  key: 'repositoriesStarredList',
  default: localRepositoryList,
});

const repositoriesListQuery = selectorFamily({
  key: 'repositoriesListQuery',
  get: (lang: string | undefined) => async () => {
    const response = await getRepos(lang);
    if (response.error) {
      throw response.error;
    }
    return repositoriesDataMapper.get(response.items);
  },
});

const languageListQuery = selector({
  key: 'languageListQuery',
  get: async ():Promise<Set<string>> => {
    // potentially should be a separate rest
    const response = await getRepos();
    if (response.error) {
      throw response.error;
    }
    return languageDataMapper.get(response.items);
  },
});

export {
  repositoriesListQuery, repositoriesListState, repositoriesStarredListState, languageListQuery,
};
