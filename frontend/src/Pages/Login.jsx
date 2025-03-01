import React, { useState, useEffect } from "react";
import { Form, Input, message, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";
import Spinner from "../Components/Spinner";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Ensure Bootstrap is imported

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/users/login",
        values
      );
      setLoading(false);
      message.success(" Login successful!");

      // Store user details (without password) in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: " " })
      );

      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error("❌ Login error:", error.response?.data || error.message);
      message.error(
        error.response?.data?.message || "Invalid email or password"
      );
    }
  };

  // Redirect logged-in users away from login page
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="position-relative vh-100 bg-light d-flex justify-content-center align-items-center">
      <h1
        className="position-absolute top-0 start-0 m-4 fw-bold text-primary"
        style={{ fontSize: "2.5rem" }}
      >
        Financify
      </h1>

      <div className="card shadow-lg p-4 rounded-4 w-50">
        {loading && <Spinner />}

        <p className="text-center text-muted">
          Start tracking your finances easily!
        </p>

        <Form layout="vertical" onFinish={submitHandler} className="mt-3">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input className="form-control" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is required!" }]}
          >
            <Input
              type="password"
              className="form-control"
              placeholder="Enter your password"
            />
          </Form.Item>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <Link to="/register" className="text-decoration-none">
              New here? Register
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              className="btn btn-primary"
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
