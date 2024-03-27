import {
  RecoilRoot, useRecoilState,
  useRecoilValue,
} from 'recoil';
import React, { useEffect, useState } from 'react';
import { Tabs, Select } from 'antd';
import type { TabsProps } from 'antd';

import RepositoryItem from './components/RepositoryItem.tsx';
import {
  languageListQuery,
  repositoriesListQuery,
  repositoriesListState,
  repositoriesStarredListState,
} from './states/state.ts';
import useStarredList from './hooks/useStarredList.ts';
import { RepositoryType } from './types';

const App = () => {
  const [activeLang, setActiveLang] = useState<undefined | string>(undefined);
  const [langListPrepared, setLangListPrepared] = useState<{ value: string, label: string }[]>([]);

  const getRepoList = useRecoilValue(repositoriesListQuery(activeLang));
  const langRepositoriesList = useRecoilValue(languageListQuery);
  const starredList = useRecoilValue(repositoriesStarredListState);

  const [repoList, setRepoList] = useRecoilState(repositoriesListState);

  const { setStarToItem } = useStarredList();

  useEffect(() => {
    setRepoList(getRepoList);
  }, [getRepoList]);

  useEffect(() => {
    const langListMapper = [...langRepositoriesList].map((item: string) => ({ value: item, label: item }));
    setLangListPrepared([{ value: '', label: 'Choose language' }, ...langListMapper]);
  }, [langRepositoriesList]);

  const handleLangSelect = (value: string) => {
    setActiveLang(value);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Common view',
      children: (<>
        <Select
          defaultValue="Choose language"
          style={{ width: 180 }}
          onChange={handleLangSelect}
          options={langListPrepared}
          className="language-select"
        />
        <div className="repo-list">
          {repoList?.map((item: RepositoryType) => (
            <RepositoryItem key={item.id} item={item} onStarClick={setStarToItem} />
          ))}
        </div>
      </>),
    },
    {
      key: '2',
      label: 'Starred view',
      children: (
        <div className="repo-list">
          {starredList?.map((item: RepositoryType) => (
            <RepositoryItem key={item.id} item={item} onStarClick={setStarToItem} />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

const MainWrapper = () => (
  <RecoilRoot>
    <React.Suspense fallback={<p>Loading...</p>}>
      <App/>
    </React.Suspense>
  </RecoilRoot>
);

export {
  App,
  MainWrapper,
};
