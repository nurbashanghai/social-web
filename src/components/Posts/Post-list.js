import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_POSTS} from "../API/Adress";
import PostItem from "./Post-item";
import AddPost from "./AddPost";
import './Post-list.css'

const PostList = () => {

    let [posts, setPosts] = useState([]);

    let [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')));

    useEffect(() => {
        loadPosts();
    },[]);

    function loadPosts(){
        axios.get(API_POSTS).then(res => {
            setPosts(res.data.reverse());
        });
    }

    function deletePost(id){
        axios.delete(`${API_POSTS}/${id}`).then(() => loadPosts())
    }

    function search(e){
        axios.get(`${API_POSTS}?_&q=${e.target.value}`).then(res => setPosts(res.data))
    }

    return (
        <div id={'scrollDiv'} className={'col-7'} >
            <AddPost loadPosts={loadPosts} />
            Search Posts: <input onChange={search} />
                {posts.map((post, index) => {
                    if(post.userId === user.id){
                        return <div key={index+'postItem+'} ><PostItem canDelete={true} post={post}/><button className={'btn btn-danger'} onClick={() => deletePost(post.id)} >delete</button></div>
                    }
                        return <PostItem canDelete={true} key={index+'postItem-'} post={post}/>
                })}
        </div>
    );
};

export default PostList;
