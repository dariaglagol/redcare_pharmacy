import { render, screen } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { RecoilRoot } from 'recoil';
import { repositorySet } from './__mocks__/data.ts';
import { mockFetch, RecoilObserver, flushPromisesAndTimers } from './__mocks__/utils.ts';
import { App } from './App.tsx';
import { languageListQuery, repositoriesListQuery, repositoriesListState } from './states/state.ts';

beforeAll(async () => {
  const onChange = jest.fn();
  window.fetch = mockFetch({ items: repositorySet.wideData });

  render(
    <RecoilRoot>
      <RecoilObserver node={repositoriesListQuery('HTML')} onChange={onChange} />
      <RecoilObserver node={repositoriesListState} onChange={onChange} />
      <RecoilObserver node={languageListQuery} onChange={onChange} />
      <App />
    </RecoilRoot>,
  );
  await flushPromisesAndTimers();
});

describe('App item tests set', () => {
  test('Check correct app render', async () => {
    const tabPanel = screen.getByRole('tabpanel');
    const renderedRepositoryAmount = tabPanel?.childNodes[1].childNodes.length;

    expect(screen.getByText('Starred view')).toBeInTheDocument();
    expect(screen.getByText('Common view')).toBeInTheDocument();
    expect(tabPanel).toBeInTheDocument();
    expect(renderedRepositoryAmount).toEqual(repositorySet.wideData.length);
  });
});
