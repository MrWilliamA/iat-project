import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import CourseDetail from "./components/CourseDetail/CourseDetail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="container">
      <QueryClientProvider client={queryClient}>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
        </Routes>
        <Footer />
      </QueryClientProvider>
    </div>
  );
}

export default App;
