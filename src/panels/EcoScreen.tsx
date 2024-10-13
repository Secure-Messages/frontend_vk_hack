import { FC, useEffect, useState } from 'react';
import { Panel, PanelHeader, PanelHeaderBack, Group, NavIdProps, ButtonGroup, Button, PanelSpinner, Card, Div, Text, Touch, ContentCard } from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export interface EcoScreenProps extends NavIdProps {
    fetchedUser?: UserInfo;
}

interface EcoItem {
    id: number;
    name: string;
    description: string;
}

export const EcoScreen: FC<EcoScreenProps> = ({ id }) => {
    const [ecoItems, setEcoItems] = useState<EcoItem[]>([]);
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
            // Фильтруем элементы с названием "be eco"
            const ecoData = data.filter((item: {name: string}) => item.name === 'be eco');
            setEcoItems(ecoData);
        })
        .catch(error => console.error("Error fetching eco items", error));
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
        <Panel id={id} aria-busy={ecoItems.length === 0}>

            <Touch onStartX={handleSwipeStart} onMoveX={handleSwipeMove}>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />} style={{ paddingBottom: "2vh" }}>
                ITMO ECO
            </PanelHeader>

            {ecoItems.length > 0 ? (
                ecoItems.map(item => (
                    <Div>
                    <Card key={item.id} mode="outline-tint" style={{ marginBottom: '16px', minWidth: '240px' }}>
                        <Div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img 
                                src="https://i.postimg.cc/w7z02ZwV/Vector-3.png" 
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
                    <PanelSpinner size="large" height={100} disableAnimation={true}>BE ECO || ITMO BE</PanelSpinner>
                </Group>
            )}
            <Div>
            <Group>
                <ContentCard
                disabled
                mode="outline-tint"
                alt="Picture of person's left hand with pink paint"
                subtitle="unsplash"
                header="Person's left hand with pink paint"
                text="Five hours of makeup and paint to achieve the human anatomy photoshoot. Thank you Steph and Shay. See more and official credit on @jawfox.photography."
                caption="Photo by Alexander Jawfox on Unsplash"
                maxHeight={500}
                />
                <ButtonGroup
                    mode="vertical"
                    gap="s"
                    stretched
                    style={{paddingTop: '10px'}}
                >
                    <Button
                        size="l"
                        appearance="neutral"
                        stretched
                        
                        align='center'
                        onClick={() => routeNavigator.push("/rank")}
                    >
                        Прочитать
                    </Button>
                    <Button
                        size="l"
                        appearance="accent"
                        stretched
                        onClick={() => routeNavigator.push("/echo-photo")}
                    >
                        Приступить
                    </Button>
                </ButtonGroup>
            </Group>
            </Div>
            </Touch>
        </Panel>
    );
};
