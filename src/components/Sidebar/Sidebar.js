import React, {useState, useEffect} from 'react';

const Sidebar = () => {
    let [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')));

    return (
        <div className={' shadow-lg p-3 mb-5 bg-white rounded'} >
            {
                user !== null ? (<div>
                    <img className={'img-fluid col-6 mt-5'} src={user.avatar} />
                        <h5>Name: {user.name}</h5>
                        <h5>LastName: {user.lastname}</h5>
                </div>) : null
            }
        </div>
    );
};

export default Sidebar;
