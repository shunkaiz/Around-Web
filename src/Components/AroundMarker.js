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
        const {lat, lng} = this.props.post.localion;
        return(
            <Marker
                position={{ lat: this.props.post.lat, lng: this.props.pos.lng }}
                onClick={this.onToggleOpen}
            >
                {this.state.isOpen ? <InfoWindow onCloseClick={this.onToggleOpen}>
                    <div>abc</div>
                </InfoWindow>:null}
            </Marker>
        )
    }

}