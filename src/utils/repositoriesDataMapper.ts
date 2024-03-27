import {
  RepositoryListType,
  RepositoryType,
  RepositoryWideListType,
  RepositoryWideType,
} from '../types';
import STARRED_REPOSITORIES from '../constants';
import localStorageManager from './localStorageManager.ts';

const repositoriesDataMapper = {
  get: (data: RepositoryWideListType): Required<RepositoryListType> => data.map((item: RepositoryWideType) => {
    const {
      name, description, stargazers_count, html_url, id, language,
    } = item;

    const localRepositoryList = localStorageManager.getObject(STARRED_REPOSITORIES);
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

export default repositoriesDataMapper;
