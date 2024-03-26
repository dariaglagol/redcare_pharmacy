import { Card, Button } from 'antd';
import StarIcon from '../icons/star.svg?react';
import { RepositoryType } from '../types';
import '../style.css';

const { Meta } = Card;

type RepositoryUIItemType = {
  item: RepositoryType
  onStarClick: (repository: RepositoryType) => void
};

const RepositoryItem = ({ item, onStarClick }: RepositoryUIItemType) => {
  const {
    id, name, description, stargazers_count, url, isStarred,
  } = item;

  const handleStarClick = (repository: RepositoryType) => {
    onStarClick(repository);
  };

  const actions = [
    <Button type="link" href={url} target="_blank">Have a look</Button>,
    <Button
      type="text"
      aria-label="Mark repo as favorite"
      shape="circle"
      icon={<StarIcon />}
      onClick={() => handleStarClick(item)}
      classNames={{ icon: `${isStarred ? 'starred-button' : ''}` }}
      data-testid={`star-btn_${id}`}
    />,
  ];

  return (
    <Card className="repo-item" title={name} actions={actions}>
      <div>
        <Meta description={<p>Stars count: {stargazers_count}</p>} />
        <Meta description={description} />
      </div>
    </Card>
  );
};

export default RepositoryItem;
