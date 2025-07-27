import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "./CourseDetail.css";
import { Link } from "react-router-dom";

// function for fetching relevant course data
const fetchCourseById = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}`);
  return res.data;
};

const CourseDetail = () => {
  const { courseId } = useParams();

  // Tanstack Query for fetching course details
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => fetchCourseById(courseId),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000,
  });

  const queryClient = useQueryClient();

  // handling course enrollment with a mutation
  const enrollMutation = useMutation({
    mutationFn: (id) =>
      axios.patch(`${process.env.REACT_APP_API_URL}/courses/${id}/enroll`),
    onSuccess: () => {
      // Refetch course list or update cache directly
      queryClient.invalidateQueries(["course", courseId]); // or use setQueryData if only 1 course
    },
  });

  const handleEnroll = () => {
    enrollMutation.mutate(data._id);
  };

  // loading and error handling
  if (isLoading) return <p>Loading course...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <main>
      <section className="course-detail">
        <div className="back-link">
          <Link to="/" className="back-link">
            &larr; Back to Courses
          </Link>
        </div>
        <div className="course-img-container">
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/images/large/${data.img}`}
            alt="Course"
          />
        </div>
        <div className="details-container">
          <h1>{data.title}</h1>
          <p className="category">
            <strong>Category:</strong>{" "}
            <span>
              {data.category}&nbsp;&nbsp;-&nbsp;&nbsp;{" "}
              <strong>Instructor:</strong> <span>{data.instructor}</span>
            </span>
          </p>
          {data.description.split("\n\n").map((para, index) => (
            <p key={index}>{para}</p>
          ))}

          <div className="details-price-container">
            <span className="duration">{data.duration} hours</span>
            <span className="price">${data.price}</span>
          </div>

          <h2 className="modules-title">Learning Modules:</h2>
          <div className="modules">
            <div className="module-row">
              <div>
                <strong>Name</strong>
              </div>
              <div>
                <strong>Marks</strong>
              </div>
            </div>
            {data.modules.map((module) => (
              <div className="module-row" key={module.name}>
                <div>{module.name}</div>
                <div>
                  <strong>{module.marks}</strong>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleEnroll}
            className={`enroll-button ${data.enrolled ? "grey" : "red"}`}
          >
            {data.enrolled ? "Unenroll" : "Enroll Now!"}
          </button>
        </div>
      </section>
    </main>
  );
};

export default CourseDetail;
