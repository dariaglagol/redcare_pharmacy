import { render, screen } from '@testing-library/react';
import { describe, test } from '@jest/globals';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RepositoryItem from '../RepositoryItem.tsx';
import { item } from '../../__mocks__/data.ts';
import { starClickHandler } from '../../__mocks__/utils.ts';

describe('Repository item tests set', () => {
  beforeEach(() => {
    render(<RepositoryItem item={item} onStarClick={starClickHandler} />);
  });

  test('Repository item contains important data', () => {
    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText(item.description)).toBeInTheDocument();
    expect(screen.getByText(`Stars count: ${item.stargazers_count}`)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', item.url);
  });

  test('Star button is available to click and called with item data', async () => {
    await userEvent.click(screen.getByTestId(`star-btn_${item.id}`));

    expect(starClickHandler).toHaveBeenCalledTimes(1);
    expect(starClickHandler).toHaveBeenCalledWith(item);
  });
});
