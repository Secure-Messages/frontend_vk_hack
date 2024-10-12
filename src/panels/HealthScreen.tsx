import { FC, useEffect, useState } from 'react';
import { Panel, PanelHeader, NavIdProps, Group, ButtonGroup, Button, ContentCard, PanelHeaderBack, PanelSpinner } from '@vkontakte/vkui';
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
    
    return (
        <Panel id={id} aria-busy={healthItems.length === 0}>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />} style={{ paddingBottom: "2vh" }}>
                ITMO HEALTHY
            </PanelHeader>

            {healthItems.length > 0 ? (
                healthItems.map(item => (
                    <ContentCard
                        key={item.id}
                        src="https://images.unsplash.com/photo-1603928726698-a015a1015d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                        alt={item.name}
                        subtitle="ITMO HEALTHY"
                        header={item.name}
                        text={item.description}
                        caption="Photo by Alexander Jawfox on Unsplash"
                        maxHeight={500}
                    />
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