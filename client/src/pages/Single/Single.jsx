import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Single.scss";
import editIcon from "../../img/edit.png";
import deleteIcon from "../../img/delete.png"
import Menu from "../../components/Menu/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../../utilities/authContext";

export default function Single() {
    const [post, setPost] = useState({})
    const postId = useParams().id
    const { currentUser } = useContext(AuthContext)
    const [relatedPosts, setrelatedPosts] = useState([])

    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}api/posts/${postId}`, { withCredentials: true })
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/posts/${postId}`)
                setPost(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchPosts()
    }, [postId])

    useEffect(() => {
        const fetchRelatedPosts = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/posts/?cat=${post.cat}`)
                setrelatedPosts(res.data.slice(0, 10))
            } catch (error) {
                console.log(error);
            }
        }
        fetchRelatedPosts()
    }, [post.cat])
    return (
        <div className="single-container">
            <div className="content">
                <div className="post-contain">
                    <img src={`${post?.post_img}`} alt="" />
                </div>
                <div className="user">
                    <img src={`${post?.user_img}`} alt="" />
                    <div className="info">
                        <span>{post?.user_name}</span>
                        <p>Posted {moment(post.post_created_date).fromNow()}</p>
                    </div>
                    {currentUser?.id === post.user_id &&
                        <div className="edit">
                            <Link to={`/write?edit-post=${post.id}`} state={post}>
                                <img src={editIcon} alt="" />
                            </Link>
                            <img onClick={handleDelete} src={deleteIcon} alt="" />
                        </div>
                    }
                </div>
                <h1>{post?.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.description }}></div>
            </div>
            <div className="menu">
                <Menu relatedPosts={relatedPosts} />
            </div>
        </div>
    )
}