import React, {useState, useEffect} from 'react';
import {API_MESSAGES, API_USERS} from "../API/Adress";
import axios from "axios";
import './chat.css';

import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

import {useCollectionData} from "react-firebase-hooks/firestore";
import MessageSingle from "./Message-Single";

firebase.initializeApp({
    apiKey: "AIzaSyClSRqTog6d_RGHjj_azt5MtXBIWtXaKLc",
    authDomain: "social-web-8b403.firebaseapp.com",
    projectId: "social-web-8b403",
    storageBucket: "social-web-8b403.appspot.com",
    messagingSenderId: "296462815034",
    appId: "1:296462815034:web:d0c94c76aeee447a8e4a03",
    measurementId: "G-ZLM6QTD65P"
});

const firestore = firebase.firestore();

if (!firebase.apps.length) {
    firebase.initializeApp({});
}

const MessagesFireBase = ({location}) => {

    const [isShown, setIsShown] = useState(false);

    const trigger = firestore.collection('triggers');
    const query = trigger.orderBy('createdAt').limit(25);
    const [triggers] = useCollectionData(query, {idField: 'id'});

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const opponentUser = location.state.person;

    let [msgArr, setMsgArr] = useState(['Loading']);
    let [chatId, setChatId] = useState(0);
    let [msg, setMsg] = useState('');

    function loadChatById(){
        console.log('loadChatById');
        axios.get(`${API_MESSAGES}/${chatId}`).then(chatRooms => {
            setMsgArr(chatRooms.data.dialog)
        })
    }

    useEffect(() => {
        loadChatById()
    },[isShown]);

    async function loadChat(){
        await axios.get(API_MESSAGES).then(chatRooms => {
                chatRooms.data.map(chat => {
                    if(chat.him === opponentUser.account && chat.me === currentUser.account){
                        setChatId(chat.id);
                        if(msgArr.length === chat.dialog.length){
                            console.log('here');
                            return null;
                        } else {
                            setMsgArr(chat.dialog);
                        }
                    } else if (chat.me === opponentUser.account && chat.him === currentUser.account){
                        setChatId(chat.id);
                        if(msgArr.length === chat.dialog.length){
                            console.log('here');
                            return null;
                        } else {
                            setMsgArr(chat.dialog);
                        }
                    }
                })
            })
    }

    useEffect(() => {
        loadChat()
    },[trigger]);

    async function sendThisMsg(){
        let arr = [...msgArr];
        arr.push(`${currentUser.name} ${msg}`);

        await trigger.add({
            id: Date.now(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        await axios.patch(`${API_MESSAGES}/${chatId}`, {
            dialog: arr
        });

        setMsgArr(arr)

    }

    return (
        <div className='chat pb-5' style={{color: 'red', textAlign: "center", fontWeight: 'bold'}}>
            <div onMouseEnter={() => setIsShown(true)}
                 onMouseLeave={() => setIsShown(false)} >
            <div>
                <h5 style={{marginRight: '60%', }}>{opponentUser.name}</h5>
                <img className={'img-fluid col-3 col-md-2'} style={{marginRight: '60%', borderRadius: '100%'}} src={opponentUser.avatar} />
            </div>
            <div style={{color: 'white'}}>
                {
                    msgArr.map((item,index) => <MessageSingle item={item} className={'my-5'} key={item+index} />)
                }
            </div>

            <form>
                <input style={{borderRadius: 15}} value={msg} onChange={(e) => setMsg(e.target.value)} />
            </form>
            <button className={'btn btn-success my-3'} onClick={sendThisMsg} >Send message</button>
            <div>
                <h5 style={{marginLeft: '70%'}}>{currentUser.name}</h5>
                <img className={'img-fluid col-3 col-md-2'} style={{marginLeft: '70%', borderRadius: '100%'}} src={currentUser.avatar} />
            </div>
            </div>
        </div>
    );
};

export default MessagesFireBase;
