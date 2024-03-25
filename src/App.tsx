import {
  RecoilRoot,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import React, { useEffect, useState } from 'react';

import RepositoryItem from './RepositoryItem.tsx';

import { repositoriesListQuery, repositoriesListState, repositoriesStarredListState } from './states/state.ts';
import { useStarredList, useLanguageSelect } from './hooks';
import { VIEW } from './constants';

const App = () => {
  const [view, setView] = useState(VIEW.PLAIN_VIEW);
  const [activeLang, setActiveLang] = useState<undefined | string>(undefined);

  const getRepoList = useRecoilValue(repositoriesListQuery(activeLang));
  const setRepoList = useSetRecoilState(repositoriesListState);
  const repoList = useRecoilValue(repositoriesListState);

  const starredList = useRecoilValue(repositoriesStarredListState);

  const { starItem } = useStarredList();
  const { langList } = useLanguageSelect();

  useEffect(() => {
    setRepoList(getRepoList);
  }, [getRepoList]);

  const handleViewToggle = (viewName: VIEW) => {
    setView(viewName);
  };

  const handleLangSelect = (value: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveLang(value.target.value);
  };

  return (
    <div>
      <div>
        <button id={ VIEW.PLAIN_VIEW } onClick={() => handleViewToggle(VIEW.PLAIN_VIEW)}>
          plain view { repoList?.length || 0 }
        </button>
        <button id={ VIEW.STARRED_VIEW } onClick={() => handleViewToggle(VIEW.STARRED_VIEW)}>
          starred view { starredList?.length || 0}
        </button>
      </div>
      <div>
        {view === VIEW.PLAIN_VIEW ? (
          <>
            <select
              name="language_select"
              id="language_select"
              aria-placeholder="Language"
              onChange={handleLangSelect}
              value={activeLang}
            >
              <option value="">choose language</option>
              {langList.map((item: string) => <option id={item} key={item}>{item}</option>)}
            </select>
            <ul className="repo-list">
              {repoList?.map((item) => (
                <RepositoryItem key={item.id} item={item} onStarClick={starItem}/>
              ))}
            </ul>
          </>
        ) : (
          <ul className="repo-list">
            {starredList?.map((item) => (
              <RepositoryItem key={item.id} item={item} onStarClick={starItem}/>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const MainWrapper = () => (
  <RecoilRoot>
    <React.Suspense fallback={<div>Loading...</div>}>
      <App/>
    </React.Suspense>
  </RecoilRoot>
);

export default MainWrapper;
