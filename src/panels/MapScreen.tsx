import { FC, useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  Div,
  Tabs,
  TabsItem,
  Card,
  Text,
  Spinner,
  ModalRoot,
  ModalCard,
} from '@vkontakte/vkui';
import { NavIdProps } from '@vkontakte/vkui';

interface TrashCan {
  id: number;
  name: string;
  address: string;
  image: string;
}

export const MapScreen: FC<NavIdProps> = ({ id }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'plastic' | 'paper' | 'metal'>('all');
  const [trashCans, setTrashCans] = useState<TrashCan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrashCans = async () => {
      setIsLoading(true);
      try {
        const data = [
          {
            id: 1,
            name: 'Уличный контейнер:',
            address: 'Кронверкский проспект, д. 49',
            image: 'https://student.itmo.ru/admin/uploads/photo/6063264905943893004680.png',
          },
          {
            id: 2,
            name: 'Уличный контейнер',
            address: 'улица Ломоносова, д. 9',
            image: 'https://student.itmo.ru/admin/uploads/photo/60643e368406d331349184.png',
          },
          {
            id: 3,
            name: 'Уличный контейнер',
            address: 'Биржевая линия, д. 14-16',
            image: 'https://student.itmo.ru/admin/uploads/photo/60643dfa8e0c7002161443.png',
          },
          {
            id: 4,
            name: 'Второй и третий этаж',
            address: 'улица Чайковского, д. 11/2',
            image: 'https://student.itmo.ru/admin/uploads/photo/60632ad79f592853346006.png',
          },
          {
            id: 5,
            name: 'Уличный контейнер',
            address: 'переулок Гривцова, д. 14-16',
            image: 'https://student.itmo.ru/admin/uploads/photo/6063291d3b8e7809904416.png',
          },
        ];
        setTrashCans(data);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrashCans();
  }, []);

  const filteredTrashCans = trashCans.filter((trashCan) => {
    if (activeTab === 'all') return true;
    return trashCan.name.toLowerCase().includes(activeTab);
  });

  const handleCardClick = (image: string) => {
    setSelectedImage(image);
    setActiveModal('imageModal');
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedImage(null);
  };

  const modal = (
    <ModalRoot activeModal={activeModal} onClose={closeModal}>
      <ModalCard
        id="imageModal"
        onClose={closeModal}
        header="Путь к урн"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: '90vh',
          width: '90vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Фото урны"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              maxHeight: '80vh',
              paddingTop: '5px'
            }}
          />
        )}
      </ModalCard>
    </ModalRoot>
  );

  return (
    <Panel id={id}>
      <PanelHeader>Карта</PanelHeader>

      {/* Вкладки для фильтрации по типам мусора */}
      <Tabs>
        <TabsItem selected={activeTab === 'all'} onClick={() => setActiveTab('all')}>
          Все урны
        </TabsItem>
        <TabsItem selected={activeTab === 'plastic'} onClick={() => setActiveTab('plastic')}>
          Мероприятие
        </TabsItem>
        <TabsItem selected={activeTab === 'paper'} onClick={() => setActiveTab('paper')}>
          Fit-залы
        </TabsItem>
      </Tabs>

      <Div>
        {isLoading ? (
          <Spinner size="large" />
        ) : (
          filteredTrashCans.length > 0 ? (
            filteredTrashCans.map((trashCan) => (
              <Card
                key={trashCan.id}
                mode="outline"
                style={{ marginBottom: '16px' }}
                onClick={() => handleCardClick(trashCan.image)}
              >
                <img
                  src={trashCan.image}
                  alt={trashCan.name}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                    marginBottom: '8px',
                  }}
                />
                <Div>
                  <Text weight="2">{trashCan.name}</Text>
                  <Text>{trashCan.address}</Text>
                </Div>
              </Card>
            ))
          ) : (
            <Text>СКОРО ;)</Text>
          )
        )}
      </Div>

      {modal}
    </Panel>
  );
};

export default MapScreen;
