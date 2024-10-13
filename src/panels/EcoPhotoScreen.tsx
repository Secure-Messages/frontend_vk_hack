import { FC, useEffect, useState } from 'react';
import { Panel, PanelHeader, Card, Div, Button, ModalRoot, ModalCard, Badge,Text, NavIdProps, PanelHeaderBack, Touch } from '@vkontakte/vkui';
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
  
      const response = await fetch(`https://vk-back.sm2.fun/api/v1/be_eco/send_for_approve?user_id=${userId}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });
  
      if (response.ok) {
        setActiveModal('success');
        const responseData = await response.json();
        console.log('Ответ сервера:', responseData);
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
      />
      <ModalCard
        id="error"
        onClose={closeModal}
        icon={<Icon56CancelCircleOutline />}
        header="Ошибка"
        subheader="Что-то пошло не так. Попробуйте еще раз."
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

      <Div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Badge
          mode={activeTab === 'upload' ? 'prominent' : 'new'}
          onClick={() => setActiveTab('upload')}
        >
          Отправка фото
        </Badge>
        <Badge
          mode={activeTab === 'catalog' ? 'prominent' : 'new'}
          onClick={() => setActiveTab('catalog')}
        >
          Каталог фото
        </Badge>
      </Div>

      {activeTab === 'upload' ? (
        <Div>
        <Card mode="outline" style={{ padding: '16px' }}>
          <Div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ marginBottom: '16px' }}
            />
            <Button
              size="l"
              mode="primary"
              onClick={handleUpload}
              disabled={!file || isUploading || !userId}
            >
              {isUploading ? 'Загрузка...' : 'Отправить фото'}
            </Button>
          </Div>
        </Card>
      </Div>
      ) : (
        <Div>
          <Card mode="outline" style={{ padding: '16px' }}>
            <Text>Здесь будет каталог фото, прошедших модерацию</Text>
          </Card>
        </Div>
      )}
    </Touch>

      {modal}
    </Panel>
  );
};

export default EcoPhotoScreen;
