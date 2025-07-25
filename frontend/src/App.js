import Header from "./components/header/Header";
import Main from "./components/main/Main";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import CourseDetail from "./components/CourseDetail/CourseDetail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="container">
      {/* load tanstack query client */}
      <QueryClientProvider client={queryClient}>
        <Header />
        {/* load routes */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
        </Routes>
        <Footer />
      </QueryClientProvider>
    </div>
  );
}

export default App;
