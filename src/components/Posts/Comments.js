import React, {useState, useEffect} from 'react';
import AddComments from "./AddComments";
import {API_POSTS} from "../API/Adress";
import axios from "axios";

const Comments = ({postId}) => {

    let [modal, setModal] = useState(false);
    let [comments, setComments] = useState([]);

    function loadComments(){
        axios.get(`${API_POSTS}/${postId}`).then(res => setComments(res.data.comments));
    }

    useEffect(() => {
        loadComments()
    }, []);

    return (
        <div>
            <AddComments comments={comments} setComments={setComments} loadComments={loadComments} postId={postId} />
            {
                modal ? (
                    <div>
                        <button className={'btn btn-primary mb-1'} onClick={() => setModal(false)} >Close</button>
                        {
                            comments.map(item => (
                                <div>
                                    <h5>{item.name}</h5>
                                    {item.comment}
                                </div>
                            ))
                        }
                    </div>
                ) : <button className={'btn btn-success mb-1'} onClick={() => setModal(true)} >Show comments</button>
            }

        </div>
    );
};

export default Comments;
