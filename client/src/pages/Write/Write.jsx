import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import "./Write.scss";

export default function Write() {
  const state = useLocation().state;
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      // [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      [
        // "link",
        "image",
        // "video"
      ],
      // ["clean"],
    ],
  };
  const [value, setValue] = useState(state ? state.description : "");
  const [title, setTitle] = useState(state ? state.title : "");
  const [file, setFile] = useState(state ? state.post_img : "");
  const [cat, setCat] = useState(state ? state.cat : "");
  const [isPublished, setIsPublished] = useState(state ? state.isPublished : 1);

  const navigate = useNavigate();

  const upload = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}api/upload`,
          formData,
          { withCredentials: true }
        );
        return res.data;
      }
      return state?.post_img;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    const description = value.replace(/(<p><br><\/p>)+/g, "<p><br></p>");
    try {
      state
        ? await axios.put(
            `${process.env.REACT_APP_BASE_URL}api/posts/${state.id}`,
            {
              title,
              description: description,
              cat,
              post_img: imgUrl,
              isPublished: isPublished,
            },
            { withCredentials: true }
          )
        : await axios.post(
            `${process.env.REACT_APP_BASE_URL}api/posts/`,
            {
              title,
              description: description,
              cat,
              post_img: imgUrl,
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm"),
              isPublished: isPublished,
            },
            { withCredentials: true }
          );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="write">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <ReactQuill
          theme="snow"
          modules={modules}
          value={value}
          onChange={setValue}
        />
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <div>
            <input
              type="radio"
              checked={isPublished === 1}
              name="Published"
              value={1}
              id="published"
              onChange={(e) => setIsPublished(e.target.value)}
            />
            <label htmlFor="published"> Published</label>
          </div>
          <div>
            <input
              type="radio"
              checked={isPublished === 0}
              name="Save as draft"
              value={0}
              id="save-as"
              onChange={(e) => setIsPublished(e.target.value)}
            />
            <label htmlFor="save-as"> Save as draft</label>
          </div>

          <label htmlFor="file">
            <b>Upload Image</b>{" "}
          </label>
          {/* Need check if there is  an img or not -- if we come to edit or to create new post  */}
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="item">
          <h1>Category</h1>
          <div>
            <input
              type="radio"
              checked={cat.toLowerCase() === "daily"}
              name="cat"
              value="daily"
              id="daily"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="daily">Daily Todo</label>
          </div>
          <div>
            <input
              type="radio"
              checked={cat.toLowerCase() === "office"}
              name="cat"
              value="office"
              id="office"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="office">Office Work</label>
          </div>
          <div>
            <input
              type="radio"
              checked={cat.toLowerCase() === "gym"}
              name="cat"
              value="gym"
              id="gym"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="gym">Gym</label>
          </div>
          <div>
            <input
              type="radio"
              checked={cat.toLowerCase() === "study"}
              name="cat"
              value="study"
              id="study"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="study">Study</label>
          </div>
          <div>
            <input
              type="radio"
              checked={cat.toLowerCase() === "english"}
              name="cat"
              value="english"
              id="english"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="english">English</label>
          </div>
          <div>
            <input
              type="radio"
              checked={cat.toLowerCase() === "technical"}
              name="cat"
              value="technical"
              id="technical"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technical">Technical</label>
          </div>
          <div>
            <input
              type="radio"
              checked={cat.toLowerCase() === "novels"}
              name="cat"
              value="novels"
              id="novels"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="novels">Novels</label>
          </div>
          <div>
            <input
              type="radio"
              checked={cat.toLowerCase() === "personal"}
              name="cat"
              value="personal"
              id="personal"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="personal">Personal</label>
          </div>
          <div>
            <input
              type="radio"
              checked={cat.toLowerCase() === "react"}
              name="cat"
              value="react"
              id="react"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="react">React.js</label>
          </div>
          <div>
            <input
              type="radio"
              checked={cat.toLowerCase() === "node"}
              name="cat"
              value="node"
              id="node"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="node">Node.js</label>
          </div>
          <div>
            <input
              type="radio"
              checked={cat.toLowerCase() === "vue"}
              name="cat"
              value="vue"
              id="vue"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="vue">Vue.js</label>
          </div>
        </div>
        <div className="buttons">
          <button onClick={handleClick}>Publish</button>
        </div>
      </div>
    </div>
  );
}
