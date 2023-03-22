import React from "react";
import { Link } from "react-router-dom";
import "./Tags.scss";
export default function Tags() {
  return (
    <div className="links">
      <Link className="link" to="/?cat=daily">
        <span>Daily Todo</span>
      </Link>
      <Link className="link" to="/?cat=office">
        <span>Office Work</span>
      </Link>
      <Link className="link" to="/?cat=gym">
        <span>Gym</span>
      </Link>
      <Link className="link" to="/?cat=study">
        <span>Study</span>
      </Link>
      <Link className="link" to="/?cat=english">
        <span>English</span>
      </Link>
      <Link className="link" to="/?cat=technical">
        <span>Technical</span>
      </Link>
      <Link className="link" to="/?cat=novels">
        <span>Novels</span>
      </Link>
      <Link className="link" to="/?cat=personal">
        <span>Personal</span>
      </Link>
      <Link className="link" to="/?cat=react">
        <span>React.js</span>
      </Link>
      <Link className="link" to="/?cat=node">
        <span>Node.js</span>
      </Link>
      <Link className="link" to="/?cat=vue">
        <span>Vue.js</span>
      </Link>
    </div>
  );
}
