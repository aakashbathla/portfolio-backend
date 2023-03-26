import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Home.scss";
import { AuthContext } from "../../utilities/authContext";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { setCurrentUser, currentUser } = useContext(AuthContext);
  const cat = useLocation().search;
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let res;
        if (currentUser && currentUser.id) {
          res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}api/posts/users${cat}`,
            { withCredentials: true }
          );
        } else {
          res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}api/posts${cat}`
          );
        }
        if (res.status === 200) {
          return setPosts(res.data);
        }
        console.log(res);
        // else handle error
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [cat]);

  return (
    <div className="home-container">
      <div className="posts">
        {posts.length > 0 &&
          posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="img">
                {post.post_img && <img src={`${post.post_img}`} alt="" />}
              </div>
              <div className="content">
                <Link className="link" to={`/post/${post.id}`}>
                  <h3>{post.title}</h3>
                  <p>
                    By <b>{post.user_name}</b> on{" "}
                    {post.post_created_date.split("T")[0]}
                  </p>
                  <div
                    className="content-description"
                    dangerouslySetInnerHTML={{ __html: post.description }}
                  ></div>
                  <button> Read More</button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
