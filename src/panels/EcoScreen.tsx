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
            mode: 'cors',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const ecoData = data.filter((item: {name: string}) => item.name === 'be eco');
            setEcoItems(ecoData);
        })
        .catch(error => console.error("Error fetching eco items", error));
    }, []);    
    const handleSwipeStart = (e: { startX: number }) => {
        setSwipeStart(e.startX);
    };

    const handleSwipeMove = (e: { shiftX: number }) => {
        if (swipeStart !== null && e.shiftX > 100) { 
            routeNavigator.back(); 
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
                            <div style={{ marginTop: '4px', fontSize: '14px', color: 'gray', textAlign: 'center', width: '80%' }}>{item.description}</div>
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
                alt="Сортировка - основа!"
                subtitle="unsplash"
                header="Сортировка - основа!"
                text="Приложите как правильно сортировать свои отходы, мы вам за это начислем баллы)"
                caption="Все участники имеет доступ для модерирование с количесвенным ограничением"
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
                        onClick={() => window.location.href = 'https://example.com'}
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
