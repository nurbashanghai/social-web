import React, {useEffect, useState} from 'react';
import PostList from "../Posts/Post-list";
import Sidebar from "../Sidebar/Sidebar";
import {useHistory} from 'react-router-dom';
import SidebarRight from "../Sidebar/SidebarRight";

const MainPage = () => {

    let history = useHistory();

    let [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')));

    return (
        <div className={'d-flex justify-content-around'} >
                <PostList />
                <SidebarRight />
        </div>
    );
};

export default MainPage;
