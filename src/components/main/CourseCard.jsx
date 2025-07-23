import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="course-card" key={course.id}>
      <div className="img-container">
        <img src={`/images/${course.img}`} alt="" />
      </div>
      <div className="card-text">
        <h2>{course.title}</h2>
        <p>{course.description}</p>
        <div className="price-container">
          <span className="hours">{course.hours} hours</span>
          <span className="price">${course.price}</span>
        </div>
        <button className="details">View Details</button>
      </div>
    </div>
  );
};

export default CourseCard;
