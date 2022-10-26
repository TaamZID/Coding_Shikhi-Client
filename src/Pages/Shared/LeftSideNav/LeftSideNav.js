import React from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

const LeftSideNav = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);
  return (
    <div>
      <ul class="list-group list-group-light">
        <h3 className="mb-4">Categories : {courses.length}</h3>
        <div>
          {courses.map((course) => (
            <li
              key={course.id}
              class="list-group-item px-3 border-0 rounded-3 list-group-item-success mb-2"
            >
              <Link to={`/courses/category/${course.id}`}>{course.name}</Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default LeftSideNav;
