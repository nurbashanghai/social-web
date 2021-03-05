import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

const Header = () => {
    let history = useHistory();

    let [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
    console.log(user === null);
    if(JSON.parse(localStorage.getItem('currentUser')) == null){
        history.push('/login')
    }

    function logout(){
        localStorage.clear();
        history.replace('/login');
        window.location.reload()
    }

    return (
        <div style={{backgroundColor: 'WhiteSmoke', borderBottom: '1px groove black'}} >
                <div className={'d-flex flex-wrap justify-content-around py-4'} >
                    <Link style={{color: 'black', fontSize: 30}} to={'/'}>𝓢𝓸𝓬𝓲𝓪𝓵-𝓦𝓮𝓫</Link>
                    <Link style={{color: 'black',fontSize: 20}} >𝑀𝑒𝓈𝓈𝒶𝑔𝑒𝓈</Link>
                    <Link style={{color: 'black',fontSize: 20}} >𝒢𝓇𝑜𝓊𝓅𝓈</Link>
                    {
                        user !== null ? <h5>𝒜𝒸𝒸𝑜𝓊𝓃𝓉: {user.account} <button className={'btn btn-dark'} onClick={logout} >𝐿𝑜𝑔𝑜𝓊𝓉</button></h5> : <button className={'btn btn-dark'} >𝐿𝑜𝑔𝒾𝓃</button>
                    }
                </div>
        </div>
    );
};

export default Header;
