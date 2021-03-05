import React, {useState} from 'react';
import axios from "axios";
import {API_USERS} from "../API/Adress";

const Register = () => {

    let [user, setUser] = useState({});
    let [password, setPassword] = useState('');

    function handleInp(e){
        let obj = {
            ...user,
            [e.target.name]: e.target.value,
            id: Date.now(),
            friends: []
        };
        setUser(obj)
    }

    function check2ndPassword(){
        return password === user.password;
    }

    async function signUp(){

        let check = false;

        await axios.get(API_USERS).then(res => {
            res.data.forEach(item => {
                if(item.name === user.name || item.account === user.account){
                    alert('User Already Exists!');
                    return check = true;
                }
            })
        });

        if(!check){
            if(check2ndPassword()){
                axios.post(API_USERS, user);
                return alert('Signed up! ', user.email);
            } else {
                alert('Passwords are not the same')
            }
        }
    }

    return (
        <div className={'d-flex flex-column'} >
            <h5>Name</h5>
            <input type={'text'} onChange={handleInp} name='name' />
            <h5>Last Name</h5>
            <input type={'text'} onChange={handleInp} name='lastname' />
            <h5>Email</h5>
            <input type={'email'} onChange={handleInp} name='account' />
            <h5>Avatar</h5>
            <input onChange={handleInp} type={'text'} name={'avatar'} />
            <img className={'img-fluid col-5'} />
            <h5>Password</h5>
            <input type={'password'} onChange={handleInp} name={'password'} />
            <h5>Confirm Password</h5>
            <input type={'password'} onChange={e => setPassword(e.target.value)} name={'password2'} />
            <div>
                <button className={'btn btn-dark'} onClick={signUp} >Sign Up</button>
            </div>
        </div>
    );
};

export default Register;
