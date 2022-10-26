import React, { createRef } from "react";
import { FaDownload } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import "./Category.css";
import Pdf from "react-to-pdf";

const Category = () => {
  const courses = useLoaderData();
  const ref = createRef();
  return (
    <div>
      <div className="header">
        <h3>Course Details</h3>
        <Pdf targetRef={ref} filename="code-example.pdf">
          {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
        </Pdf>
        <FaDownload></FaDownload>
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
              <small class="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
