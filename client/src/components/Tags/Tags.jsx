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
      <Link className="link" to="/?cat=vue">
        <span>9th Science</span>
      </Link>
      <Link className="link" to="/?cat=vue">
        <span>10th Science</span>
      </Link>
      <Link className="link" to="/?cat=vue">
        <span>11th Physics</span>
      </Link>
      <Link className="link" to="/?cat=vue">
        <span>11th Chemistry</span>
      </Link>
      <Link className="link" to="/?cat=vue">
        <span>12th Physics</span>
      </Link>
      <Link className="link" to="/?cat=vue">
        <span>12th Chemistry</span>
      </Link>
      <Link className="link" to="/?cat=vue">
        <span>9th Math</span>
      </Link>
      <Link className="link" to="/?cat=vue">
        <span>10th Math</span>
      </Link>
      <Link className="link" to="/?cat=vue">
        <span>11th Math</span>
      </Link>
      <Link className="link" to="/?cat=vue">
        <span>12th Math</span>
      </Link>
    </div>
  );
}
