import React from 'react';
import {GoogleMap, Marker, InfoWindow } from "react-google-maps";

export class AroundMarker extends React.Component{
    state ={
        isOpen : false
    }
    onToggleOpen = () =>{
        this.setState((prevState)=>{
            return {isOpen:!prevState.isOpen};
        })
    }

    render(){
        const {location, url, message, user} = this.props.post;
        return(
            <Marker
                position={{lat: location.lat, lng: location.lon }}
                onClick={this.onToggleOpen}
            >
                {this.state.isOpen ? <InfoWindow onCloseClick={this.onToggleOpen}>
                    <div>abc</div>
                </InfoWindow>:null}
            </Marker>
        )
    }

}