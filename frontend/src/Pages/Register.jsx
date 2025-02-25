import React, { useEffect, useState } from "react";
import { Form, Input, message, Button, Card, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Components/Spinner";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Ensure Bootstrap is imported

const { Title, Text } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:8080/api/v1/users/register", values);
      message.success(" Registration Successful!");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.error(
        "❌ Registration error:",
        error.response?.data || error.message
      );
      message.error(
        error.response?.data?.message || "Invalid registration details"
      );
    }
  };

  // Prevent logged-in users from accessing the register page
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded-4 w-50">
        {loading && <Spinner />}

        <h2 className="text-center text-primary">Financify</h2>
        <p className="text-center text-muted">
          Start tracking your finances easily!
        </p>

        <Form layout="vertical" onFinish={submitHandler} className="mt-3">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name is required!" }]}
          >
            <Input className="form-control" placeholder="Enter your name" />
          </Form.Item>

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
              placeholder="Enter a secure password"
            />
          </Form.Item>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <Link to="/login" className="text-decoration-none">
              Already have an account? Login
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              className="btn btn-primary"
            >
              Register
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
