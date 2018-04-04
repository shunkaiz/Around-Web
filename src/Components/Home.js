import React from 'react';
import $ from 'jquery';
import { Tabs, Button, Spin} from 'antd';
import {API_ROOT, GEO_OPTIONS, AUTH_PREFIX, TOKEN_KEY} from "../constants";
import {Gallery} from "./Gallery";
import {CreatePostButton} from "./CreatePostButton";


export class Home extends React.Component {
    state = {
        loadingGeoLocation: false,
        loadingPost: false,
        error : '',
        posts : []
    }

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
        this.setState({loadingGeoLocation: false, error: ''});
        //console.log(position);
        const {latitude, longitude} = position.coords;
        localStorage.setItem('POS_KEY', JSON.stringify({lat: latitude, lon: longitude}));
        this.loadNearbyPosts(position);
    }

    onFailedLoadGeoLocation = () => {
        this.setState({loadingGeoLocation: false, error: 'Failed to get Geo location'})
    }

    componentDidMount(){
        this.setState({loadingGeoLocation: true});
        this.getGeoLocation();
    }

    getGalleryPanelContent = () =>{
        if(this.state.error){
            return <div>{this.state.error}</div>
        }else if(this.state.loadingGeoLocation){
            return  <Spin tip='Loading Geo Location...'/>
        }else if(this.state.loadingPost){
            return <Spin tip='Loading Posts...'/>
        }else if(this.state.post && this.state.posts.length > 0){
            const images = this.state.posts.map((post)=>{
                return{
                    user: post.user,
                    src: post.url,
                    thumbnail: post.url,
                    thumbnailWidth: 400,
                    thumbnailHeight: 300,
                    caption: post.message,
                }
            })
            return <Gallery images={images}/>
        }else{
            return <div>content</div>
        }
    }

    loadNearbyPosts = (position) => {
        const latitude = 37.7915953;
        const longitude = -122.3937977;
        this.setState({loadingPost: true});
        $.ajax({
            url: `${API_ROOT}/search?lat=${latitude}&lon=${longitude}&range=20`,
            method : 'GET',
            headers : {
                Authorization : `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
            },
        }).then((response)=>{
            this.setState({loadingPost: false, posts: response});
            console.log(response);
        },(response)=>{
            this.setState({loadingPost: false, error: response.responseText});
        }).catch((error)=>{
            console.log('')
        })
    }

    render() {
        const operations = <CreatePostButton type={'primary'}></CreatePostButton>;
        const TabPane = Tabs.TabPane;
        return (
            <Tabs tabBarExtraContent={operations} className = 'mainTabs'>
                <TabPane tab="Post" key="1">
                    {this.getGalleryPanelContent()}
                </TabPane>
                <TabPane tab="Map" key="2">Content of Tab Pane 2</TabPane>
            </Tabs>
        );
    }
}
