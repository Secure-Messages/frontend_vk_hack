import React from 'react';
import { Card, Div, Text } from '@vkontakte/vkui';

interface CardStoryProps {
  imgSrc: string;
  title: string;
  onClick?: () => void;
}

const CardStory: React.FC<CardStoryProps> = ({ imgSrc, title, onClick }) => {
  return (
    <Card mode="outline-tint" style={{ width: 140 }} onClick={onClick}>
      <Div>
        <img 
          src={imgSrc} 
          alt={title} 
          style={{ width: 'auto', height: '110px', objectFit: 'cover' }} 
        />
        <Text>{title}</Text>
      </Div>
    </Card>
  );
};

export default CardStory;
