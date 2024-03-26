import { atom, selector, selectorFamily } from 'recoil';
import { localStorageManager } from '../utils';
import getRepos from '../services';
import { RepositoryListType, RepositoryType } from '../types';
import STARRED_REPOSITORIES from '../constants';

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
  get: async ():Promise<string[]> => {
    const response = await getRepos();
    if (response.error) {
      throw response.error;
    }
    return response.items.reduce((acc: Set<string>, { language }: { language: string }) => {
      if (language) {
        acc.add(language);
      }
      return acc;
    }, new Set());
  },
});

export {
  repositoriesListQuery, repositoriesListState, repositoriesStarredListState, languageListQuery,
};
