// import React, {useState, useEffect} from 'react';
// import {API_MESSAGES, API_USERS} from "../API/Adress";
// import axios from "axios";
//
// import firebase from "firebase/app";
// import 'firebase/firestore';
// import 'firebase/auth';
//
// import {useCollectionData} from "react-firebase-hooks/firestore";
//
// firebase.initializeApp({
//     apiKey: "AIzaSyClSRqTog6d_RGHjj_azt5MtXBIWtXaKLc",
//     authDomain: "social-web-8b403.firebaseapp.com",
//     projectId: "social-web-8b403",
//     storageBucket: "social-web-8b403.appspot.com",
//     messagingSenderId: "296462815034",
//     appId: "1:296462815034:web:d0c94c76aeee447a8e4a03",
//     measurementId: "G-ZLM6QTD65P"
// });
//
// const firestore = firebase.firestore();
//
//     if (!firebase.apps.length) {
//         firebase.initializeApp({});
//     }
//
// const Messages = ({location}) => {
//
//     const trigger = firestore.collection('triggers'); //messagesRef
//
//     const query = trigger.orderBy('createdAt').limit(25);
//
//     const [triggers] = useCollectionData(query, {idField: 'id'});//messages
//
//     let [formValue, setFormValue] = useState('');
//
//     useEffect( () => {
//         loadChat();
//     },[]);
//
//
//     console.log(trigger);
//     console.log(query);
//
//     let [n, setN] = useState(0);
//
//     useEffect( () => {
//         // loadChat();
//         console.log('UPDATED!');
//     },[trigger]);
//
//     let person = location.state.person.account;
//     let [messages, setMessages] = useState([]);
//
//     let [obj, setObj] = useState({});
//
//     let [user1, setUser1] = useState('');
//     let [user2, setUser2] = useState('');
//
//     let [msgToSend, setMsgToSend] = useState('');
//
//     let [checkIfNew, setCheck] = useState(false);
//
//     let [dialogId, setId] = useState('');
//
//     async function loadChat(){
//         await axios.get(API_MESSAGES).then(res => {
//             res.data.map(item => {
//                 if(item.him === person && item.me === JSON.parse(localStorage.getItem('currentUser')).account){
//                     setUser2(item.him);
//                     setUser1(JSON.parse(localStorage.getItem('currentUser')).account);
//                     setObj(item);
//                     setId(item.id);
//                     setMessages(item.dialog);
//                 } else if(item.me === person && item.him === JSON.parse(localStorage.getItem('currentUser')).account){
//                     setUser1(item.him);
//                     setUser2(JSON.parse(localStorage.getItem('currentUser')).account);
//                     setObj(item);
//                     setId(item.id);
//                     setMessages(item.dialog);
//                 }
//             })
//         });
//     }
//
//     async function sendThisMsg(){
//
//         await trigger.add({
//             id: Date.now(),
//             createdAt: firebase.firestore.FieldValue.serverTimestamp()
//         });
//
//         if(obj.dialog){
//             let arr = [...obj.dialog,`${JSON.parse(localStorage.getItem('currentUser')).name}: ${msgToSend}`];
//             axios.patch(`${API_MESSAGES}/${dialogId}`, {
//                 dialog: arr
//             })
//         } else {
//             let arr = [`${JSON.parse(localStorage.getItem('currentUser')).name}: ${msgToSend}`];
//             axios.post(API_MESSAGES, {
//                 me: `${JSON.parse(localStorage.getItem('currentUser')).account}`,
//                 him: location.state.person.account,
//                 dialog: arr
//             })
//         }
//
//
//
//     }
//
//     return (
//         <div>
//             <div className={'d-flex flex-column'} style={{border: '1px solid black'}} >
//                 <div>
//                     {
//                         messages ? messages.map(item => (
//                                 <div key={Math.random()} >
//                                     {item}
//                                 </div>
//                             ))
//                              : <h5>Write down first message</h5>
//                     }
//                     <h5>You: {JSON.parse(localStorage.getItem('currentUser')).name}</h5>
//                 </div>
//                 <input onChange={(e) => {
//                     setFormValue(e.target.value);
//                     setMsgToSend(e.target.value);
//                 }} />
//                 <button onClick={sendThisMsg} >Send</button>
//             </div>
//         </div>
//     );
// };
//
// export default Messages;
