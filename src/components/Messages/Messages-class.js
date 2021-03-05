import React, {Component} from 'react';
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

class MessagesClass extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            me: JSON.parse(localStorage.getItem('currentUser')),
            him: this.props.location.state.person
        }

    }

    componentDidMount() {
        // firebase.initializeApp({
        //     apiKey: "AIzaSyClSRqTog6d_RGHjj_azt5MtXBIWtXaKLc",
        //     authDomain: "social-web-8b403.firebaseapp.com",
        //     projectId: "social-web-8b403",
        //     storageBucket: "social-web-8b403.appspot.com",
        //     messagingSenderId: "296462815034",
        //     appId: "1:296462815034:web:d0c94c76aeee447a8e4a03",
        //     measurementId: "G-ZLM6QTD65P"
        // });
    }

    render() {
        return (
            <div className={'d-flex'} >
                <div className={'d-flex'} >
                    <div>
                        <h5>{this.state.him.name}</h5>
                        <img className={'img-fluid col-md-3'} src={this.state.him.avatar} />
                    </div>
                </div>
                <div className={'d-flex align-items-end'} >
                    <div>
                        <h5>{this.state.me.name}</h5>
                        <img className={'img-fluid col-md-3'} src={this.state.me.avatar} />
                    </div>
                </div>

            </div>
        );
    }
}

export default MessagesClass;
