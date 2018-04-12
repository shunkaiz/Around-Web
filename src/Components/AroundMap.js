import React from 'react';
import { withScriptjs,withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import {AroundMarker} from "./AroundMarker";
import $ from 'jquery';

class AroundMap extends React.Component{


    render(){

        return(
            <GoogleMap
                defaultZoom={11}
                defaultCenter={{lat: -34.340, lng: 150.647}}
            >

                {this.props.posts.map((post)=>{
                    return <AroundMarker key = {$(post.url)} post = {post}/>
                })}

            </GoogleMap>
        )
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));