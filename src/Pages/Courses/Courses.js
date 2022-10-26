import React from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./Courses.css";
import Card from "react-bootstrap/Card";
import { Button, CardGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { MDBBtn } from "mdb-react-ui-kit";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);
  return (
    <div>
      <h3>Courses</h3>
      {courses.map((course) => (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col mb-2">
            <div className="card h-100">
              <img src={course.image} class="card-img-top" alt="Skyscrapers" />
              <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
              <div className="card-footer">
                <MDBBtn className="text-dark" color="light">
                  <Link to={`category/${course.id}`}>See Details</Link>
                </MDBBtn>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Courses;
