import { FC, useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  Div,
  Spinner,
} from '@vkontakte/vkui';
import { NavIdProps } from '@vkontakte/vkui';
import StoreItemCard from '../components/StoreItemCard'; // Подключаем компонент с карточками товаров

export const StoreScreen: FC<NavIdProps> = ({ id }) => {
  const [items, setItems] = useState<
    { image_name: string; title: string; id: number; costs: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки

  useEffect(() => {
    // Получаем данные с API
    fetch('https://vk-back.sm2.fun/api/v1/store/get_all')
      .then(response => response.json())
      .then(data => {
        setItems(data);
        setIsLoading(false); // Останавливаем индикатор загрузки
      })
      .catch(error => {
        console.error('Ошибка загрузки:', error);
        setIsLoading(false); // Останавливаем индикатор загрузки в случае ошибки
      });
  }, []);

  return (
    <Panel id={id}>
      <PanelHeader>Магазин товаров</PanelHeader>
      
      {isLoading ? (
        <Div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Spinner size="large" />
        </Div>
      ) : (
        <Div style={{ marginLeft:'5%', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 0.5fr))', gap: '5px' }}>
          {items.map((item) => (
            <StoreItemCard
              key={item.id}
              imgSrc={`https://vk-back.sm2.fun/api/v1/store/photos/${item.image_name}`}
              title={item.title}
              cost={item.costs}
              onAddClick={() => console.log(`Товар ${item.title} добавлен в корзину`)}
            />
          ))}
        </Div>
      )}
    </Panel>
  );
};

export default StoreScreen;
