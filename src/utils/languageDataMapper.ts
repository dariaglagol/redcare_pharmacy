import { RepositoryType } from '../types';

const languageDataMapper = {
  get: (data: any[]) => data.reduce((acc: Set<string>, { language }: Partial<RepositoryType>) => {
    if (language) {
      acc.add(language);
    }
    return acc;
  }, new Set()),
};

export default languageDataMapper;
