import React, {useState, useEffect} from 'react';
import axios from "axios";
import {API_POSTS} from "../API/Adress";

const AddComments = ({postId, comments, setComments, loadComments}) => {

    let [comment, setComment] = useState({});
    let [allComments, setAllComments] = useState(comments);



    function handleInp(e){
        let obj = {
            name: JSON.parse(localStorage.getItem('currentUser')).name,
            lastname: JSON.parse(localStorage.getItem('currentUser')).lastname,
            comment: e.target.value
        };
        setComment(obj)
    }

    function sendComment(){
        let arrOfComm = comments;
        arrOfComm.push(comment);
        axios.patch(`${API_POSTS}/${postId}`,
            {comments: arrOfComm}
        ).then(() => loadComments())
    }


    return (
        <div className={'p-1'} >
            Leave your comment here:
            <div className={'my-2'} ><input style={{borderRadius: 10, boxShadow: '2px 2px 7px'}} onChange={handleInp} /></div>
            <div>
                <button className={'btn btn-primary'} onClick={() => sendComment()} >Send</button>
            </div>
        </div>
    );
};

export default AddComments;
