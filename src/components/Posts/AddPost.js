import React,{useState} from 'react';
import axios from "axios";
import {API_POSTS} from "../API/Adress";

const AddPost = ({loadPosts}) => {

    let [post, setPost] = useState({});

    function handleInp(e){
        let obj = {
            ...post,
            ...JSON.parse(localStorage.getItem('currentUser')),
            userId: JSON.parse(localStorage.getItem('currentUser')).id,
            [e.target.name]: e.target.value,
            id: Date.now(),
            comments: []
        };
        setPost(obj)
    }

    function sendPost(){
        axios.post(API_POSTS, post).then(() => loadPosts())
    }

    return (
        <div className={'col-12'} style={{border: '1px solid black',borderRadius: 15}} >
            <div className={'p-3'}  >
                <h3 style={{marginBottom: '20px', textAlign: "center"}}>Create post</h3>
                <h5><strong>Content</strong></h5>
                <input onChange={handleInp} name={'content'} />
                <h5>Image</h5>
                <input onChange={handleInp} name={'img'} className={'mb-2'} />
                <img style={{textAlign: "center"}} className={'img-fluid'} src={post.img} />
                <div>
                    <button className={'btn btn-dark'} onClick={sendPost} >Post</button>
                </div>
            </div>
        </div>
    );
};

export default AddPost;
