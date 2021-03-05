import React, {useState, useEffect} from 'react';
import axios from "axios";
import {API_USERS} from "../API/Adress";
import Register from "./Register";
import instaLogo from '../../assets/9364675fb26a.png'

const Login = () => {

    let [users, setUsers] = useState([]);
    let [currUser, setCurrUser] = useState({});

    useEffect(() => {
        axios.get(API_USERS).then(res => setUsers(res.data));
    },[]);

    function handleInp(e){
        let obj = {
            ...currUser,
            [e.target.name]: e.target.value
        };
        setCurrUser(obj)
    }

    async function login(){
        await axios.get(API_USERS).then(res => setUsers(res.data));
        let check = false;
        await users.forEach(item => {
            if(item.account === currUser.account && item.password === currUser.password){
                localStorage.setItem('currentUser', JSON.stringify(item));
                check = true;
            }
        });

        if(check){
            alert('Logged In');
            window.location.pathname = '/'
        }
    }

    return (
        <div className={'d-flex align-items-center container mt-5'} >
            <img className={'img-fluid col-5'} src={instaLogo} />
            <div>
                <div className={'col-5 my-5'} >
                    <h5>Email</h5>
                    <input onChange={handleInp} name={'account'} />
                    <h5>Password</h5>
                    <input onChange={handleInp} name={'password'} />
                    <div>
                        <button className={'btn btn-dark'} onClick={login} >Login</button>
                    </div>
                </div>
                <div className={'col-12 my-5'} >
                    <h5>Or Register..</h5>
                    <Register/>
                </div>
            </div>
        </div>
    );
};

export default Login;
