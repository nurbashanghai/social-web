import React, {useState, useEffect} from 'react';
import axios from "axios";
import {API_USERS} from "../API/Adress";
import {useHistory} from 'react-router-dom';

const SidebarRight = () => {
    let history = useHistory();

    let [users, setUsers] = useState([]);
    let [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')));

    let [friends, setFriends] = useState([]);

    async function loadUsers(){
        await axios.get(API_USERS).then(res => setUsers(res.data));

    }

    function loadFriends(){
        axios.get(`${API_USERS}/${currentUser.id}`).then(res => {
            let arrUniq = [...new Set(res.data.friends)];
            setFriends(arrUniq);
            localStorage.setItem('friends', JSON.stringify(arrUniq))
        });
    }

    useEffect(() => {
        loadUsers();
        loadFriends();
    },[]);

    function addToFriend(item){
        let arr = [...friends,{
            name: item.name,
            lastname: item.lastname,
            id: item.id,
            avatar: item.avatar
        }];
        let arrUniq = [...new Set(arr)];
        axios.patch(`${API_USERS}/${currentUser.id}`, {
            friends: arrUniq
        });
        localStorage.setItem('friends', JSON.stringify(arrUniq));
        setFriends(arrUniq);
    }

    function toChat(item){
        history.push({
            pathname: '/messages',
            state: {person: item}
        })
    }

    return (
        <div>
            <h5 className={'mt-5'} style={{textAlign: 'center'}} >Accounts</h5>
            {
                users.map(item => (
                    <div style={{textAlign: 'center'}} key={item.id+'user'} >
                        <h5>{item.name}</h5>
                        <img style={{borderRadius: '100%'}} className={'img-fluid col-12 col-md-3'} src={item.avatar}/>
                        <h5>{item.lastname}</h5>

                        <button className={'btn btn-success mx-1'} onClick={() => addToFriend(item)} >Add to friends</button>
                        <button className={'btn btn-dark'} onClick={() => toChat(item)} >Open Chat</button>
                    </div>
                ))
            }
            <h5 className={'mt-5'} style={{textAlign: 'center'}} >You subscribed to:</h5>
            {
                friends.map(item => (
                    <div style={{textAlign: 'center'}} key={item.id+'friend'}>
                        <h5>{item.name} {item.lastname}</h5>
                        <img className={'img-fluid col-2'} src={item.avatar} />
                    </div>
                ))
            }
        </div>
    );
};

export default SidebarRight;
