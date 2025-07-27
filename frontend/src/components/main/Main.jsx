import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CourseCard from "./CourseCard";
import "./Main.css";
import Error from "../Error";
import Loading from "../Loading";
import AddCourseForm from "./AddCourseForm";
import { useState } from "react";

// fetch all courses using axios library
const fetchCourses = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/courses/`);
  return res.data;
};

const Main = () => {
  // state to manage visibility of AddCourseForm
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);

  const toggleAddCourseForm = () => {
    setShowAddCourseForm((prev) => !prev);
  };

  // TanStack Query for fetching courses and handling caching
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false, // Do not refetch when tab/window regains focus
  });

  // loading and error components
  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} />;

  return (
    <main>
      <h1>Available MicroCourses</h1>
      <p className="tag-line">Peruse our wonderful list of courses!</p>
      {showAddCourseForm && (
        <AddCourseForm setShowAddCourseForm={setShowAddCourseForm} />
      )}
      {!showAddCourseForm && (
        <button
          type="submit"
          className="add-course"
          onClick={toggleAddCourseForm}
        >
          Add New Course
        </button>
      )}
      <section className="course-list">
        {data?.map((course) => (
          <CourseCard course={course} key={course._id} />
        ))}
      </section>
    </main>
  );
};

export default Main;
