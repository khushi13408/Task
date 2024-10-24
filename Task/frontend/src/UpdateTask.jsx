import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Ensure toast is imported

export default function UpdateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const taskId = localStorage.getItem("taskId"); // Get the task ID from localStorage

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`http://localhost:5000/task/getTask/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.code === 200) {
          setTitle(response.data.data.title);
          setDescription(response.data.data.description);
        } else {
          setError("Failed to load task details.");
        }
      } catch (error) {
        setError("An error occurred while fetching task details.");
      }
    };

    fetchTask();
  }, [taskId]);

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `http://localhost:5000/task/updateTask/${taskId}`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 200) {
        toast.success("Task updated successfully!");
        // Delay navigation by 1 second
        setTimeout(() => {
          navigate("/task"); // Redirect back to tasks list
        }, 1000);
      } else if (response.data.code === 401) {
        // Unauthorized: Show session expired message and navigate to login
        toast.error("Session expired. Please log in again.");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setError("Failed to update the task.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer /> {/* Add ToastContainer for notifications */}
      <h2>Update Task</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleUpdateTask}>
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
          Update Task
        </button>
      </form>
    </div>
  );
}
