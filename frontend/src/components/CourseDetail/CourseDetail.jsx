import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./CourseDetail.css";

const fetchCourseById = async (id) => {
  const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
  return res.data;
};

const CourseDetail = () => {
  const { courseId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => fetchCourseById(courseId),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <p>Loading course...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <main>
      <section className="course-detail">
        <div className="course-img-container">
          <img src={`/images/large/${data.img}`} alt="" />
        </div>
        <div className="details-container">
          <h1>{data.title}</h1>
          {/* <p>{data.description}</p> */}
          {data.description.split("\n\n").map((para, index) => (
            <p key={index}>{para}</p>
          ))}
          <p>
            <strong>Hours:</strong> {data.hours}
          </p>
          <p>
            <strong>Price:</strong> ${data.price}
          </p>
        </div>
      </section>
    </main>
  );
};

export default CourseDetail;
