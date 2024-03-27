import { renderHook } from '@testing-library/react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { act } from 'react-dom/test-utils';
import { item, repositoriesShrinkData, repositoriesShrinkDataWithoutEntry } from '../../__mocks__/data.ts';
import { repositoriesListState, repositoriesStarredListState } from '../../states/state.ts';
import useStarredList from '../useStarredList.ts';

test('Test useStarredList', async () => {
  const wrapper = ({ children }: any) => <RecoilRoot>{children}</RecoilRoot>;

  const counterState = renderHook(
    () => {
      const [starredList, setStarredList] = useRecoilState(repositoriesStarredListState);
      const [repoList, setRepoList] = useRecoilState(repositoriesListState);
      const { setStarToItem } = useStarredList();

      return {
        starredList,
        setStarredList,
        setStarToItem,
        repoList,
        setRepoList,
      };
    },
    {
      wrapper,
    },
  );

  expect(counterState.result.current.starredList).toBe(null);

  act(() => counterState.result.current.setStarredList([item]));
  act(() => counterState.result.current.setRepoList(repositoriesShrinkData));

  expect(counterState.result.current.starredList).toStrictEqual([item]);

  act(() => counterState.result.current.setStarToItem({ ...item, isStarred: false }));
  expect(counterState.result.current.repoList).toStrictEqual([item, ...repositoriesShrinkDataWithoutEntry]);
});
