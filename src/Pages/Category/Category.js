import React, { createRef } from "react";
import { Link } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import "./Category.css";
import Pdf from "react-to-pdf";
import Button from "react-bootstrap/Button";
import { MDBBtn } from "mdb-react-ui-kit";

const Category = () => {
  const courses = useLoaderData();
  const ref = createRef();
  return (
    <div>
      <div className="header">
        <h3>Course Details</h3>
        <Pdf targetRef={ref} filename="Course-Details.pdf">
          {({ toPdf }) => (
            <Button onClick={toPdf}>
              <FaDownload></FaDownload>
            </Button>
          )}
        </Pdf>
      </div>
      <div ref={ref} class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col">
          <div class="card">
            <img src={courses.image} class="card-img-top" alt="Skyscrapers" />
            <div class="card-body">
              <h5 class="card-title">{courses.name}</h5>
              <p class="card-text">{courses.details}</p>
            </div>
            <div class="card-footer">
              <MDBBtn className="text-dark" color="light">
                <Link to={`/checkout/${courses.id}`}>Get premium Access</Link>
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
