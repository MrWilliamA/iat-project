import { useParams } from "react-router-dom";

const courses = [
  {
    id: "1",
    title: "Intro to React",
    description: "Learn the basics of React.",
  },
  { id: "2", title: "Advanced JS", description: "Deep dive into JavaScript." },
  {
    id: "3",
    title: "Web Accessibility",
    description: "Make your apps accessible.",
  },
];

const CourseDetail = () => {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === courseId);

  return <div>{course.title}</div>;
};

export default CourseDetail;
