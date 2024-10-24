import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function GetTask() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      try {
        const response = await axios.get("http://localhost:5000/task/getTasks", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the headers
          },
        });

        if (response.data.code === 200) {
          setTasks(response.data.data); // Assuming the tasks are in response.data.data
        } else if (response.data.code === 401) {
          // Unauthorized: Redirect to login and show session expired toast
          toast.error("Session expired. Please log in again.");
          setTimeout(() => {
            navigate("/login");
          }, 1000); // Delay navigation
        } else {
          setError("Failed to fetch tasks");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    };

    fetchTasks();
  }, [navigate]); // Add navigate to dependencies

  const handleEdit = (id) => {
    localStorage.setItem("taskId", id); // Store task ID in localStorage
    navigate("/updateTask"); // Redirect to update task page
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return; // Exit if the user cancels

    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(`http://localhost:5000/task/deleteTask/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Task deleted successfully");
        setTasks(tasks.filter((task) => task._id !== id)); // Remove the deleted task from the state
      } else {
        setError("Failed to delete the task.");
      }
    } catch (error) {
      setError("An error occurred while deleting the task.");
    }
  };

  const handleAddTask = () => {
    navigate("/createTask"); // Redirect to create task page
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear localStorage
    toast.success("Logged out successfully!"); // Show success message
    setTimeout(() => {
      navigate("/login"); // Navigate to login page after 1 second
    }, 1000);
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2>Task List</h2>

      {/* Add Task Button */}
      <div className="mb-3">
        <button className="btn btn-primary" onClick={handleAddTask}>
          Add Task
        </button>
        {/* Logout Button */}
        <button className="btn btn-danger ms-2" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th> {/* New column for actions */}
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm mr-2"
                    onClick={() => handleEdit(task._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No tasks available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
