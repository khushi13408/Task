import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleCreateTask = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token"); // Get the token from localStorage

    try {
      const response = await axios.post(
        "http://localhost:5000/task/createTask",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the headers
          },
        }
      );

      if (response.data.code === 201) {
        toast.success("Task created successfully!");
        setTitle("");
        setDescription("");

        // Navigate to /task after 1 second
        setTimeout(() => {
          navigate("/task");
        }, 1000);
      } else if (response.data.code === 401 || response.data.code === 400) {
        // Unauthorized: Show session expired message and navigate to login
        toast.error("Session expired. Please log in again.");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error("Failed to create the task");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2>Create Task</h2>
      <form onSubmit={handleCreateTask}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Create Task
        </button>
      </form>
    </div>
  );
}
