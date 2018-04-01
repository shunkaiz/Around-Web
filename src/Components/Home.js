import React from 'react';
import { Tabs, Button} from 'antd';
import {GEO_OPTIONS} from "../constants";

export class Home extends React.Component {

    getGeoLocation = () =>{
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS,
            );
        } else {
            this.setState({ error: 'Your browser does not support geolocation!' });
        }

    }

    onSuccessLoadGeoLocation = (position) =>{
        console.log(position);
    }

    onFailedLoadGeoLocation = () =>{

    }

    componentDidMount(){
        this.getGeoLocation();
    }

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
