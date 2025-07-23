import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import CourseDetail from "./components/CourseDetail/CourseDetail";

function App() {
  return (
    <div className="container">
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
