import { render, screen } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
import { RecoilRoot } from 'recoil';
import { act } from 'react-dom/test-utils';
import { repositoriesListWide } from './__mocks__/data.ts';
import { mockFetch, RecoilObserver } from './__mocks__/utils.ts';
import { App } from './App.tsx';
import { languageListQuery, repositoriesListQuery, repositoriesListState } from './states/state.ts';

function flushPromisesAndTimers(): Promise<void> {
  // @ts-ignore
  return act(
    () => new Promise((resolve) => {
      setTimeout(resolve, 100);
      jest.useFakeTimers();
    }),
  );
}

beforeAll(async () => {
  const onChange = jest.fn();
  window.fetch = mockFetch({ items: repositoriesListWide });

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
    expect(renderedRepositoryAmount).toEqual(repositoriesListWide.length);
  });
});
