type RepositoryType = {
  name: string
  description: string
  stargazers_count: number
  url: string
  id: number
  language: string,
  isStarred: boolean
};

type RepositorytListType = RepositoryType[];

export type {
  RepositoryType,
  RepositorytListType,
};
