import React from 'react';
import $ from 'jquery';
import { Modal, Button, message } from 'antd';
import {WrappedCreatePostForm} from "./CreatePostForm";
import {API_ROOT, TOKEN_KEY, POS_KEY, AUTH_PREFIX, LOC_SHAKE} from "../constants";

export class CreatePostButton extends React.Component{
    state = {
        visible: false,
        confirmLoading: false,
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        this.form.validateFields((err, value)=>{
            if(!err){

                const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
                const formData = new FormData();
                formData.set('lat', lat + Math.random() * LOC_SHAKE * 2 - LOC_SHAKE)
                formData.set('lon', lon + Math.random() * LOC_SHAKE * 2 - LOC_SHAKE)
                formData.set('message', value.message)
                formData.set('image', value.image[0])

                // show loading on create button
                this.setState({confirmLoading: true });
                $.ajax({
                    url: `${API_ROOT}/post`,
                    method: 'POST',
                    data: formData,
                    headers: {
                        Authorization:`${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
                    },
                    processData: false,
                    contentType: false,
                    dataType: 'text'
                }).then((response)=>{
                    message.success('created a post successfully');
                    return this.props.loadNearbyPosts().then(()=>{
                        this.setState({
                            confirmLoading: false,
                            visible: false
                        });
                    });
                }, (error)=>{
                    message.error(error.responseText);
                    this.setState({
                        confirmLoading: false,
                        visible: false
                    });
                }).catch((error) =>{
                    console.log(error);
                })


            }
        })




    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }
    saveFormRef = (form) =>{
        this.form = form;
    }

    render() {
        const { visible, confirmLoading, } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>Create New Post</Button>
                <Modal title="Create New Post"
                       visible={visible}
                       onOk={this.handleOk}
                       okText={'Create'}
                       confirmLoading={confirmLoading}
                       onCancel={this.handleCancel}
                >
                    <WrappedCreatePostForm ref = {this.saveFormRef}/>
                </Modal>
            </div>
        );
    }
}