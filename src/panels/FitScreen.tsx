import { FC, useEffect, useState } from 'react';
import { Panel, PanelHeader, NavIdProps, Group, ButtonGroup, Button, PanelHeaderBack, PanelSpinner, Card, Div, Text } from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export interface FitScreenProps extends NavIdProps {
    fetchedUser?: UserInfo;
}
interface FitItem {
    id: number;
    name: string;
    description: string;
}
export const FitScreen: FC<FitScreenProps> = ({ id }) => {
    const [fitItems, setFitItems] = useState<FitItem[]>([]);
    const routeNavigator = useRouteNavigator();

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
            // Фильтруем элементы с названием "be fit"
            const fitData = data.filter((item: { name: string }) => item.name === 'be fit');
            setFitItems(fitData);
        })
        .catch(error => console.error("Error fetching fit items", error));
    }, []);    
    
    return (
        <Panel id={id} aria-busy={fitItems.length === 0}>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />} style={{ paddingBottom: "2vh" }}>
                ITMO FIT
            </PanelHeader>

            {fitItems.length > 0 ? (
                fitItems.map(item => (
                    <Div>
                    <Card key={item.id} mode="outline-tint" style={{ marginBottom: '16px', minWidth: '240px' }}>
                        <Div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img 
                                src="https://i.postimg.cc/ZCLjMHgh/Vector-4.png" 
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
                    // <ContentCard
                    //     key={item.id}
                    //     src="https://images.unsplash.com/photo-1603928726698-a015a1015d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                    //     alt={item.name}
                    //     subtitle="ITMO FIT"
                    //     header={item.name}
                    //     text={item.description}
                    //     caption="Photo by Alexander Jawfox on Unsplash"
                    //     maxHeight={500}
                    // />
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
                    <PanelSpinner size="large" height={100} disableAnimation={true}>BE FIT || ITMO BE</PanelSpinner>
                </Group>
            )}

            <Group
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "10vh",
                }}
            >
                <div className="button-group">
                    <ButtonGroup
                        mode="horizontal"
                        gap="s"
                        stretched
                        style={{ paddingBottom: '1vh' }}
                    >
                        <Button
                            size="m"
                            appearance="accent-invariable"
                            stretched
                            className="custom-card"
                            onClick={() => routeNavigator.push("/persik")}
                        >
                            Рейтинг
                        </Button>
                    </ButtonGroup>
                </div>
            </Group>
        </Panel>
    );
}