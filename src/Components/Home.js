import React from 'react';
import { Tabs, Button} from 'antd';

export class Home extends React.Component {
    render() {
        const operations = <Button type={'primary'}>Create My New Post</Button>;
        const TabPane = Tabs.TabPane;
        return (
            <Tabs tabBarExtraContent={operations} className = 'mainTabs'>
                <TabPane tab="Post" key="1">Content of Tab Pane 1</TabPane>
                <TabPane tab="Map" key="2">Content of Tab Pane 2</TabPane>
            </Tabs>
        );
    }
}
