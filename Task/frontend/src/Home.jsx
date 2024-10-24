import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/login")} className="btn btn-primary">
        Login
      </button>
      <button onClick={() => navigate("/signup")} className="btn btn-secondary ml-2">
        Register
      </button>

    </div>
  );
}
