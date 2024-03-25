import './style.css';
import StarIcon from './icons/star.svg?react';
import { RepositoryType } from './types';

type RepositoryUIItemType = {
  item: RepositoryType
  onStarClick: (repository: RepositoryType) => void
};

const RepositoryItem = ({ item, onStarClick }: RepositoryUIItemType) => {
  const {
    name, description, stargazers_count, url, isStarred,
  } = item;

  const handleStarClick = (repository: RepositoryType) => {
    onStarClick(repository);
  };

  return (
    <li className="repo-item">
      <h4 className="repo-item__header">{name}</h4>
      <span className="repo-item__star-count">{stargazers_count}</span>
      <p className="repo-item__desc">{description}</p>
      <a href={url} target="_blank" className="repo-item__link">Visit repo</a>
      <button
        className={`repo-item__star-btn ${isStarred && 'repo-item__star-btn--active'}`}
        aria-label="Mark repo as fav"
        onClick={() => handleStarClick(item)}
      >
        <StarIcon />
      </button>
    </li>
  );
};

export default RepositoryItem;
