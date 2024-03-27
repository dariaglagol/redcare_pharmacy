import { renderHook } from '@testing-library/react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { act } from 'react-dom/test-utils';
import { repositorySet } from '../../__mocks__/data.ts';
import { repositoriesListState, repositoriesStarredListState } from '../../states/state.ts';
import useStarredList from '../useStarredList.ts';

const {
  defaultItem, starredItem, shrinkData, shrinkDataWithoutEntry,
} = repositorySet;

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

  act(() => counterState.result.current.setStarredList([defaultItem]));
  act(() => counterState.result.current.setRepoList(shrinkData));

  expect(counterState.result.current.starredList).toStrictEqual([defaultItem]);

  act(() => counterState.result.current.setStarToItem(defaultItem));
  expect(counterState.result.current.repoList).toStrictEqual([starredItem, ...shrinkDataWithoutEntry]);
});
