import { Query, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import "./AddCourseForm.css";

const AddCourseForm = ({ setShowAddCourseForm }) => {
  // cancel creating course and close the form
  const handleCancel = () => {
    setShowAddCourseForm(false);
    resetForm();
  };

  // create a new course via TanStack Query
  const queryClient = useQueryClient();

  const createCourse = async (formData) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/courses`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  };

  const createCourseMutation = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
      resetForm();
    },
    onError: (error) => {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to create course. Please try again.");
    },
  });

  // form state management
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    description: "",
    duration: 0,
    price: 0,
    instructor: "",
    category: "",
    modules: [{ name: "", marks: 0 }],
    imgFile: null,
  });

  // handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle course module input changes
  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...formData.modules];
    updatedModules[index][field] = field === "marks" ? Number(value) : value;
    setFormData((prev) => ({
      ...prev,
      modules: updatedModules,
    }));
  };

  // add new module per course
  const addModule = () => {
    setFormData((prev) => ({
      ...prev,
      modules: [...prev.modules, { name: "", marks: 0 }],
    }));
  };

  // handle file input change for course image
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      imgFile: e.target.files[0],
    }));
  };

  // reset form to initial state
  const resetForm = () => {
    setFormData({
      title: "",
      summary: "",
      description: "",
      duration: 0,
      price: 0,
      instructor: "",
      category: "",
      modules: [{ name: "", marks: 0 }],
      imgFile: null,
    });
  };

  // handle form submission to create new course
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("summary", formData.summary);
    payload.append("description", formData.description);
    payload.append("duration", formData.duration);
    payload.append("price", formData.price);
    payload.append("instructor", formData.instructor);
    payload.append("category", formData.category);
    payload.append("enrolled", "false"); // Always false on create
    payload.append("img", formData.imgFile); // image file

    // Append modules as JSON string
    payload.append("modules", JSON.stringify(formData.modules));

    createCourseMutation.mutate(payload);
    setShowAddCourseForm(false);
    resetForm();
  };

  return (
    <form className="add-course-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="quarter">
          <label htmlFor="title">Course Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="eighth">
          <label htmlFor="duration">
            Duration <span>(hrs)</span>:
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            placeholder="Duration (hours)"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div className="eighth">
          <label htmlFor="price">
            Price <span>($)</span>:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price ($)"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="quarter">
          <label htmlFor="instructor">Instructor:</label>
          <input
            type="text"
            id="instructor"
            name="instructor"
            placeholder="Instructor"
            value={formData.instructor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="quarter">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="third">
          <label htmlFor="summary">Summary:</label>
          <textarea
            type="text"
            id="summary"
            rows="4"
            maxLength={75}
            name="summary"
            placeholder="Summary"
            value={formData.summary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="two-thirds">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            rows="4"
            maxLength={1000}
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="third">
          <label>Modules:</label>
          {formData.modules.map((mod, i) => (
            <div key={i} className="add-module-row">
              <div className="two-thirds">
                <label>name:</label>
                <input
                  type="text"
                  placeholder="Module name"
                  value={mod.name}
                  onChange={(e) =>
                    handleModuleChange(i, "name", e.target.value)
                  }
                  required
                />
              </div>
              <div className="third">
                <label>Marks:</label>
                <input
                  type="number"
                  placeholder="Marks"
                  value={mod.marks}
                  onChange={(e) =>
                    handleModuleChange(i, "marks", e.target.value)
                  }
                  required
                />
              </div>
            </div>
          ))}
          <button type="button" className="add-module" onClick={addModule}>
            + Add Module
          </button>
        </div>
        <div className="quarter">
          <label>Course Image:</label>
          <input
            type="file"
            name="img"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="third">
          <button type="submit" className="add-course">
            Add New Course
          </button>
          <button className="cancel-add-course" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddCourseForm;
