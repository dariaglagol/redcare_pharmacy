import { render, screen, waitFor } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { repositorySet } from './__mocks__/data.ts';
import { mockFetch, flushPromisesAndTimers } from './__mocks__/utils.ts';
import { MainWrapper } from './App.tsx';

beforeAll(async () => {
  window.fetch = mockFetch({ items: repositorySet.wideData });

  await waitFor(async () => render(
    <MainWrapper />,
  ));
  await flushPromisesAndTimers();
});

describe('App item tests set', () => {
  test('Check correct app render', async () => {
    const tabPanel = screen.getByRole('tabpanel');
    const renderedRepositoryAmount = tabPanel?.childNodes[1].childNodes.length;

    await waitFor(async () => {
      expect(screen.getByText('Starred view')).toBeInTheDocument();
      expect(screen.getByText('Common view')).toBeInTheDocument();
      expect(tabPanel).toBeInTheDocument();
      expect(renderedRepositoryAmount).toEqual(repositorySet.wideData.length);
    });
  });
});
