import React from 'react';
import { Card, Div, Button, Text } from '@vkontakte/vkui';

interface StoreItemProps {
  imgSrc: string;
  title: string;
  cost: number;
  onAddClick?: () => void;
}

const StoreItemCard: React.FC<StoreItemProps> = ({ imgSrc, title, cost, onAddClick }) => {
  return (
    <Card 
      mode="outline-tint" 
      style={{ width: 200, height: 250, position: 'relative', overflow: 'hidden' }} 
      className='custom-card-store-item' 
    >
      {/* Затемненное фоновое изображение */}
      <div 
        style={{ 
          backgroundImage: `url(${imgSrc})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          width: '100%', 
          height: '150px',
          position: 'absolute',
          top: 0,
          left: 0,
          filter: 'grayscale(50%) brightness(0.7)', // Добавляем серый оттенок и затемнение
        }} 
      />

      {/* Текстовый блок с названием товара */}
      <Div 
        style={{
          position: 'absolute',
          top: 160, // Позиционирование блока с текстом под картинкой
          left: 0,
          right: 0,
          padding: '0 8px',
          textAlign: 'center',
          fontSize: '12px',
          color: 'white',
          textShadow: '0 1px 2px rgba(0,0,0,0.5)', // Добавляем тень для улучшения читаемости текста
          whiteSpace: 'nowrap', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
        }}
      >
        {title}
      </Div>

      {/* Секция с ценой и кнопкой "Добавить" */}
      <Div 
        style={{
          position: 'absolute',
          bottom: 10,
          left: 0,
          right: 0,
          textAlign: 'center',
        }}
      >
        <Text weight="2" style={{ marginBottom: '8px' }}>
          {cost} ₽
        </Text>
        <Button
          size="s"
          mode="primary"
          stretched
          onClick={onAddClick}
        >
          Добавить
        </Button>
      </Div>
    </Card>
  );
};

export default StoreItemCard;
