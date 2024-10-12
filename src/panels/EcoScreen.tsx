import { FC, useEffect, useState } from 'react';
import { Panel, PanelHeader, PanelHeaderBack, Group, NavIdProps, ButtonGroup, Button, ContentCard, PanelSpinner } from '@vkontakte/vkui';
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
    
    return (
        <Panel id={id} aria-busy={ecoItems.length === 0}>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />} style={{ paddingBottom: "2vh" }}>
                ITMO ECO
            </PanelHeader>

            {ecoItems.length > 0 ? (
                ecoItems.map(item => (
                    <ContentCard
                        key={item.id}
                        src="https://i.postimg.cc/w7z02ZwV/Vector-3.png"
                        alt={item.name}
                        subtitle="ITMO ECO"
                        header={item.name}
                        text={item.description}
                        caption="Photo by Alexander Jawfox on Unsplash"
                        size={40}
                        height={500}
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
                    <PanelSpinner size="large" height={100} disableAnimation={true}>BE ECO || ITMO BE</PanelSpinner>
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
};
