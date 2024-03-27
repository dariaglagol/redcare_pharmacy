import { render, screen } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RepositoryItem from '../RepositoryItem.tsx';
import { repositorySet } from '../../__mocks__/data.ts';
import { starClickHandler } from '../../__mocks__/utils.ts';

const {defaultItem} = repositorySet

describe('Repository item tests set', () => {
  beforeEach(() => {
    render(<RepositoryItem item={defaultItem} onStarClick={starClickHandler} />);
  });

  test('Repository item contains important data', () => {
    expect(screen.getByText(defaultItem.name)).toBeInTheDocument();
    expect(screen.getByText(defaultItem.description)).toBeInTheDocument();
    expect(screen.getByText(`Stars count: ${defaultItem.stargazers_count}`)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', defaultItem.url);
  });

  test('Star button is available to click and called with item data', async () => {
    await userEvent.click(screen.getByTestId(`star-btn_${defaultItem.id}`));

    expect(starClickHandler).toHaveBeenCalledTimes(1);
    expect(starClickHandler).toHaveBeenCalledWith(defaultItem);
  });
});
