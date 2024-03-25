import {
  RecoilRoot,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import React, { useEffect, useState } from 'react';
import { Tabs, Select } from 'antd';
import type { TabsProps } from 'antd';

import RepositoryItem from './RepositoryItem.tsx';
import { repositoriesListQuery, repositoriesListState, repositoriesStarredListState } from './states/state.ts';
import { useStarredList, useLanguageSelect } from './hooks';

const App = () => {
  const [activeLang, setActiveLang] = useState<undefined | string>(undefined);
  const [langListPrepared, setLangListPrepared] = useState<{ value: string, label: string }[]>([]);

  const getRepoList = useRecoilValue(repositoriesListQuery(activeLang));
  const setRepoList = useSetRecoilState(repositoriesListState);
  const repoList = useRecoilValue(repositoriesListState);

  const starredList = useRecoilValue(repositoriesStarredListState);

  const { starItem } = useStarredList();
  const { langList } = useLanguageSelect();

  useEffect(() => {
    setRepoList(getRepoList);
  }, [getRepoList]);

  useEffect(() => {
    const langListMapper = langList.map((item: string) => ({ value: item, label: item }));
    setLangListPrepared(langListMapper);
  }, [langList]);

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
          {repoList?.map((item) => (
            <RepositoryItem key={item.id} item={item} onStarClick={starItem}/>
          ))}
        </div>
      </>),
    },
    {
      key: '2',
      label: 'Starred view',
      children: (
        <div className="repo-list">
          {starredList?.map((item) => (
            <RepositoryItem key={item.id} item={item} onStarClick={starItem}/>
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

export default MainWrapper;
