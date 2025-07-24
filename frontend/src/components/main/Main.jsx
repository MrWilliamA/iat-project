import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CourseCard from "./CourseCard";
import "./Main.css";
import Error from "../Error";
import Loading from "../Loading";

const fetchCourses = async () => {
  const res = await axios.get("http://localhost:5000/api/courses"); // Use your real backend URL if deployed
  return res.data;
};

const Main = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false, // Do not refetch when tab/window regains focus
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} />;

  return (
    <main>
      <h1>Available MicroCourses</h1>
      <p className="tag-line">Peruse our wonderful list of courses!</p>
      <section className="course-list">
        {data?.map((course) => (
          <CourseCard course={course} key={course._id} />
        ))}
      </section>
    </main>
  );
};

export default Main;
