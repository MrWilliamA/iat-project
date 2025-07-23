import "./Main.css";
import CourseCard from "./CourseCard";

const Main = () => {
  const dummyData = [
    {
      id: 1,
      title: "MicroCourse 1",
      description: "This is the first MicroCourse.",
      hours: 10,
      price: 399,
      img: "1.png",
    },
    {
      id: 2,
      title: "MicroCourse 2",
      description: "This is the second MicroCourse.",
      hours: 60,
      price: 599,
      img: "2.png",
    },
    {
      id: 3,
      title: "MicroCourse 3",
      description: "This is the third MicroCourse.",
      hours: 90,
      price: 650,
      img: "3.jpg",
    },
    {
      id: 4,
      title: "MicroCourse 4",
      description: "This is the fourth MicroCourse.",
      hours: 100,
      price: 799,
      img: "4.png",
    },
  ];

  return (
    <main>
      <h1>Available MicroCourses Courses</h1>
      <p className="tag-line">Peruse our wonderful list of courses!</p>
      <section className="course-list">
        {dummyData?.map((course) => (
          <CourseCard course={course} key={course.id} />
        ))}
      </section>
    </main>
  );
};

export default Main;
