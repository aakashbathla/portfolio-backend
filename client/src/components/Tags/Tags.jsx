import React from "react";
import { Link } from "react-router-dom";
import "./Tags.scss";
export default function Tags() {
  return (
    <div className="links">
      <Link className="link" to="/?cat=art">
        <span>Daily Todo</span>
      </Link>
      <Link className="link" to="/?cat=food">
        <span>Office Work</span>
      </Link>
      <Link className="link" to="/?cat=sport">
        <span>Gym</span>
      </Link>
      <Link className="link" to="/?cat=science">
        <span>Study</span>
      </Link>
      <Link className="link" to="/?cat=technology">
        <span>English</span>
      </Link>
      <Link className="link" to="/?cat=technology">
        <span>Technical</span>
      </Link>
      <Link className="link" to="/?cat=technology">
        <span>Novels</span>
      </Link>
      <Link className="link" to="/?cat=technology">
        <span>Personal</span>
      </Link>
      <Link className="link" to="/?cat=technology">
        <span>React.js</span>
      </Link>
      <Link className="link" to="/?cat=technology">
        <span>Node.js</span>
      </Link>
      <Link className="link" to="/?cat=technology">
        <span>Vue.js</span>
      </Link>
    </div>
  );
}
