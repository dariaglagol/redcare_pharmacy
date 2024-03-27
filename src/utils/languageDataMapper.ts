import { RepositoryWideListType, RepositoryWideType } from '../types';

const languageDataMapper = {
  get: (data: RepositoryWideListType) => data.reduce((acc: Set<string>, { language }: Partial<RepositoryWideType>) => {
    if (language) {
      acc.add(language);
    }
    return acc;
  }, new Set()),
};

export default languageDataMapper;
