import { FC, useEffect, useState } from 'react';
import { Panel, PanelHeader, Card, Div, Button, ModalRoot, ModalCard, Text, NavIdProps, PanelHeaderBack, Touch, Spinner, Tabs, TabsItem, Title, CardGrid } from '@vkontakte/vkui';
import { Icon56CheckCircleOutline, Icon56CancelCircleOutline } from '@vkontakte/icons';
import { UserInfo } from '@vkontakte/vk-bridge';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export interface EcoPhotoProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const EcoPhotoScreen: FC<EcoPhotoProps> = ({ id, fetchedUser }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [photos, setPhotos] = useState<
    { moving_id: number; user_id: number; image_name: string; status: number }[]
  >([]);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'catalog'>('upload');
  const [userId, setUserId] = useState<number | null>(null);
  const [swipeStart, setSwipeStart] = useState<number | null>(null);

  useEffect(() => {
    if (fetchedUser) {
      setUserId(fetchedUser.id);
    }
  }, [fetchedUser]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !userId) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      console.log('Отправка данных на сервер:', {
        user_id: userId,
        file: file.name,
      });

      const response = await fetch(
        `https://vk-back.sm2.fun/api/v1/be_eco/send_for_approve?user_id=${userId}`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
          },
        }
      );

      if (response.ok) {
        setActiveModal('success');
        const responseData = await response.json();
        console.log('Ответ сервера:', responseData);
        setFile(null); // Очистка инпута после успешной отправки
      } else {
        const errorData = await response.json();
        console.error('Ошибка при отправке:', errorData);
        setActiveModal('error');
      }
    } catch (error) {
      console.error('Ошибка при отправке:', error);
      setActiveModal('error');
    } finally {
      setIsUploading(false);
    }
  };

  const fetchUserPhotos = async (userId: number) => {
    setIsLoadingPhotos(true);
    try {
      const response = await fetch(
        `https://vk-back.sm2.fun/api/v1/be_eco/get_user_list_photo?user_id=${userId}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPhotos(data); // Сохраняем фотографии в состоянии
        console.log('Фотографии пользователя:', data);
      } else {
        console.error('Ошибка при загрузке фотографий');
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    } finally {
      setIsLoadingPhotos(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'catalog' && userId) {
      fetchUserPhotos(userId);
    }
  }, [activeTab, userId]);

  const closeModal = () => setActiveModal(null);
  const routeNavigator = useRouteNavigator();

  const modal = (
    <ModalRoot activeModal={activeModal} onClose={closeModal}>
      <ModalCard
        id="success"
        onClose={closeModal}
        icon={<Icon56CheckCircleOutline />}
        header="Успех"
        subheader="Фотография отправлена на модерацию."
        style={{ justifyContent: 'center', alignItems: 'center' }} // Центрирование модалки
      />
      <ModalCard
        id="error"
        onClose={closeModal}
        icon={<Icon56CancelCircleOutline />}
        header="Ошибка"
        subheader="Что-то пошло не так. Попробуйте еще раз."
        style={{ justifyContent: 'center', alignItems: 'center' }} // Центрирование модалки
      />
    </ModalRoot>
  );

  const handleSwipeStart = (e: { startX: number }) => {
    setSwipeStart(e.startX);
  };

  const handleSwipeMove = (e: { shiftX: number }) => {
    if (swipeStart !== null && e.shiftX > 100) {
      routeNavigator.back();
    }
  };

  return (
    <Panel id={id}>
      <Touch onStartX={handleSwipeStart} onMoveX={handleSwipeMove}>
        <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
          Загрузка изображения
        </PanelHeader>

        <Div>
          <Card mode="outline" style={{ padding: '16px', marginBottom: '16px' }}>
            <Title level="2" weight="2" style={{ marginBottom: '12px' }}>
              Почему это важно?
            </Title>
            <Text>
              Сортировка мусора — это не только способ уменьшить количество отходов, но и шаг к сохранению окружающей среды.
              Правильная утилизация помогает:
              <ul>
                <li>уменьшить загрязнение планеты;</li>
                <li>сократить выбросы вредных веществ в атмосферу;</li>
                <li>сохранить природные ресурсы для будущих поколений.</li>
              </ul>
              Используя правильные урны для разного мусора, вы помогаете сделать мир чище и экологичнее!
            </Text>
          </Card>
        </Div>

        <Tabs>
          <TabsItem
            selected={activeTab === 'upload'}
            onClick={() => setActiveTab('upload')}
          >
            Отправка фото
          </TabsItem>
          <TabsItem
            selected={activeTab === 'catalog'}
            onClick={() => setActiveTab('catalog')}
          >
            Каталог фото
          </TabsItem>
        </Tabs>

        {activeTab === 'upload' ? (
          <Div>
            <Card mode="outline" style={{ padding: '16px' }}>
              <Div>
                {/* Стилизация input как кнопки */}
                <label htmlFor="upload-photo" style={{ display: 'block', marginBottom: '16px' }}>
                  <Button
                    size="l"
                    mode="primary"
                    stretched
                    Component="label"
                    style={{ cursor: 'pointer' }}
                  >
                    Выбрать фото
                    <input
                      id="upload-photo"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      hidden
                    />
                  </Button>
                </label>
                <Button
                  size="l"
                  mode="primary"
                  stretched
                  onClick={handleUpload}
                  disabled={!file || isUploading || !userId}
                >
                  {isUploading ? 'Загрузка...' : 'Отправить фото'}
                </Button>
              </Div>
            </Card>
          </Div>
        ) : (
          <CardGrid size='m' style={{display: 'flex', justifyContent: 'center'}}>
            {isLoadingPhotos ? (
              <Spinner size="large" />
            ) : photos.length === 0 ? (
              <Card mode="outline" style={{ padding: '16px' }}>
                <Text>У вас нет отправленных фото</Text>
              </Card>
            ) : (
              photos.map((photo) => (
                <Card
                  key={photo.moving_id}
                  mode="outline"
                  style={{
                    marginBottom: '16px',
                    width: 'auto',
                    height: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={`https://vk-back.sm2.fun/api/v1/be_eco/photo/${photo.image_name}`}
                    alt="Фото"
                    style={{
                      width: 'auto',
                      height: '200px',
                      marginBottom: '8px',
                      objectFit: 'contain',
                    }}
                  />
                  <Text style={{ marginBottom: '8px' }}>
                    Status: {photo.status === 0 ? 'На модерации' : 'Одобрено'}
                  </Text>
                </Card>
              ))
            )}
          </CardGrid>
        )}
      </Touch>

      {modal}
    </Panel>
  );
};

export default EcoPhotoScreen;
