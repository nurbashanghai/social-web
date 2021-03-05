import React,{useState, useEffect} from 'react';
import Comments from "./Comments";
import axios from "axios";
import {API_POSTS} from "../API/Adress";

const PostItem = ({post}) => {

    let [likes, setLikes] = useState(0);

    function getLikes(){
        axios.get(`${API_POSTS}/${post.id}`).then(res => {
            return res.data.likes === undefined ? setLikes(0) : setLikes(res.data.likes);
        })
    }

    useEffect(() => {
        getLikes()
    },[]);

    async function sendLike(){
        let like = +likes + 1;
        await axios.patch(`${API_POSTS}/${post.id}`, {
            likes: like
        });
        getLikes()
    }

    return (
        <div className={'my-5 shadow-lg p-3 mb-5 bg-white rounded'} style={{backgroundColor: 'white'}} >
            <div className={'col-10'} style={{borderRadius: '15px'}} >
                <h5> <img className={'my-3'} style={{height: 50, borderRadius: "50%"}} src={post.avatar} /> {post.name} {post.lastname}</h5>
                <p>{post.content}</p>
                <div className="d-flex justify-content-center" >
                    <div>
                    <img className={'img-fluid col-12 my-3'} style={{borderRadius: '5%', textAlign: 'center'}} src={post.img} />
                    </div>
                </div>
                <div onClick={sendLike} >❤️{likes}</div>
                <Comments postId={post.id} />
            </div>
        </div>
    );
};

export default PostItem;
