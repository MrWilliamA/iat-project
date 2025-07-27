import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="course-card" key={course._id}>
      <div className="img-container">
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/images/thumb/${course.img}`}
          alt="Course"
        />
      </div>
      <div className="card-text">
        <h2>{course.title}</h2>
        <p>{course.summary}</p>
        <div className="price-container">
          <span className="duration">{course.duration} hours</span>
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
