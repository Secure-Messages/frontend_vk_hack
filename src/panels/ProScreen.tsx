import { FC, useEffect, useState } from 'react';
import { Panel, PanelHeader, NavIdProps, Group, PanelHeaderBack, PanelSpinner, Card, Div, Text,Touch } from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export interface ProScreenProps extends NavIdProps {
    fetchedUser?: UserInfo;
}
interface ProItem {
    id: number;
    name: string;
    description: string;
}

export const ProScreen: FC<ProScreenProps> = ({ id }) => {
    const [proItems, setProItems] = useState<ProItem[]>([]);
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
            // Фильтруем элементы с названием "be pro"
            const proData = data.filter((item: {name: string}) => item.name === 'be pro');
            setProItems(proData);
        })
        .catch(error => console.error("Error fetching pro items", error));
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
        <Panel id={id} aria-busy={proItems.length === 0}>
            <Touch onStartX={handleSwipeStart} onMoveX={handleSwipeMove}>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />} style={{ paddingBottom: "2vh" }}>
                ITMO PRO
            </PanelHeader>

            {proItems.length > 0 ? (
                proItems.map(item => (
                    <Div>
                    <Card key={item.id} mode="outline-tint" style={{ marginBottom: '16px', minWidth: '240px' }}>
                        <Div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img 
                                src="https://i.postimg.cc/rzxfSMNs/Star-1.png" 
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
                    <PanelSpinner size="large" height={100} disableAnimation={true} children='BE FIT || ITMO BE'></PanelSpinner>
                </Group>
            )}

            </Touch>
        </Panel>
    );
}