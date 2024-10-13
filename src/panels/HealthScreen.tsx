import { FC, useEffect, useState } from 'react';
import { Panel, PanelHeader, NavIdProps, Group, ButtonGroup, Button, PanelHeaderBack, PanelSpinner, Card, Div, Text, Touch } from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export interface HealthScreenProps extends NavIdProps {
    fetchedUser?: UserInfo;
}
interface HealthItem {
    id: number;
    name: string;
    description: string;
}

export const HealthScreen: FC<HealthScreenProps> = ({ id }) => {
    const [healthItems, setHealthItems] = useState<HealthItem[]>([]);
    const routeNavigator = useRouteNavigator();
    const [swipeStart, setSwipeStart] = useState<number | null>(null);

    useEffect(() => {
        fetch('https://vk-back.sm2.fun/api/v1/be_itmo/get_all', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            mode: 'cors',  // Используем CORS-режим
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Фильтруем элементы с названием "be health"
            const healthData = data.filter((item: {name: string}) => item.name === 'be healthy');
            setHealthItems(healthData);
        })
        .catch(error => console.error("Error fetching health items", error));
    }, []);    
    // Обрабатываем начало свайпа
    const handleSwipeStart = (e: { startX: number }) => {
        setSwipeStart(e.startX); // Сохраняем начальную позицию свайпа
    };

    // Обрабатываем движение свайпа
    const handleSwipeMove = (e: { shiftX: number }) => {
        if (swipeStart !== null && e.shiftX > 100) { // Если свайп вправо больше 100px
            routeNavigator.back(); // Переход назад
        }
    };
    return (
        <Panel id={id} aria-busy={healthItems.length === 0}>
            <Touch onStartX={handleSwipeStart} onMoveX={handleSwipeMove}>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />} style={{ paddingBottom: "2vh" }}>
                ITMO HEALTHY
            </PanelHeader>

            {healthItems.length > 0 ? (
                healthItems.map(item => (
                    <Div>
                    <Card key={item.id} mode="outline-tint" style={{ marginBottom: '16px', minWidth: '240px' }}>
                        <Div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img 
                                src="https://i.postimg.cc/TKYQMmM5/Vector-5.png" 
                                alt={item.name} 
                                style={{ 
                                    width: 'auto', 
                                    height: '170px', 
                                    objectFit: 'cover', 
                                    display: 'block', 
                                    maxWidth: '100%', 
                                    margin: '0 auto' 
                                }}
                            />
                            <Text style={{ marginTop: '8px', textAlign: 'center' }}>{item.name}</Text>
                            <Text style={{ marginTop: '4px', color: 'gray', textAlign: 'center', width: '80%' }}>{item.description}</Text>
                        </Div>
                    </Card>
                    </Div>
                ))
            ) : (
                <Group
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "10vh",
                    }}
                >
                    <PanelSpinner size="large" height={100} disableAnimation={true}>BE HEALTHY || ITMO BE</PanelSpinner>
                </Group>
            )}

            <ButtonGroup
                        mode="vertical"
                        gap="s"
                        stretched
                        
                    >
                        <Button
                            size="l"
                            appearance="accent-invariable"
                            stretched
                            
                            align='center'
                            onClick={() => routeNavigator.push("/rank")}
                        >
                            Рейтинг
                        </Button>
                        <Button
                            size="l"
                            appearance="accent-invariable"
                            stretched
                            onClick={() => routeNavigator.push("/rank")}
                        >
                            Рейтинг
                        </Button>
            </ButtonGroup>
            </Touch>
        </Panel>
    );
}