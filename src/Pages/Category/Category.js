import React from "react";
import { useLoaderData } from "react-router-dom";

const Category = () => {
  const courses = useLoaderData();
  return (
    <div>
      <h3>Course Details</h3>
      <div class="row row-cols-1 row-cols-md-2 g-4">
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
