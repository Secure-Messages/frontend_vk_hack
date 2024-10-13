import React from 'react';
import { Card, Div } from '@vkontakte/vkui';

interface CardStoryProps {
  imgSrc: string;
  title: string;
  onClick?: () => void;
}

const CardStory: React.FC<CardStoryProps> = ({ imgSrc, title, onClick }) => {
  return (
    <Card 
      mode="outline-tint" 
      style={{ width: 140, height: 160, position: 'relative', overflow: 'hidden' }} 
      className='custom-card-be-track story' 
      onClick={onClick}
    >
      {/* Затемненное фоновое изображение */}
      <div 
        style={{ 
          backgroundImage: `url(${imgSrc})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          width: '100%', 
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          filter: 'grayscale(50%) brightness(0.7)', // Добавляем серый оттенок и затемнение
        }} 
      />
      
      {/* Текстовый блок с оригинальной яркостью фона */}
      <Div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.0)', // Прозрачный фон под текстом
          color: 'white',
          padding: '5px',
          textAlign: 'center',
          fontSize: '10px',
          whiteSpace: 'nowrap', // Ограничиваем текст одной строкой
          overflow: 'hidden', // Скроем текст, если его слишком много
          textOverflow: 'ellipsis', // Добавляем многоточие для длинного текста
        }}
      >
        {title}
      </Div>
    </Card>
  );
};

export default CardStory;
