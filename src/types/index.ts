type RepositoryType = {
  name: string
  description: string
  stargazers_count: number
  url: string
  id: number
  language: string | null
  isStarred: boolean
};

type RepositoryListType = RepositoryType[];

export type {
  RepositoryType,
  RepositoryListType,
};
