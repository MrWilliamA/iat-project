import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  console.log(course.description); // Debugging line to check course data
  return (
    <div className="course-card" key={course._id}>
      <div className="img-container">
        <img src={`/images/thumb/${course.img}`} alt="" />
      </div>
      <div className="card-text">
        <h2>{course.title}</h2>
        <p>{course.summary}</p>
        <div className="price-container">
          <span className="hours">{course.hours} hours</span>
          <span className="price">${course.price}</span>
        </div>
        <button className="details">
          <Link to={`/courses/${course._id}`}>View Details</Link>
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
