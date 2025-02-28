import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Select, message, Table } from "antd";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import Spinner from "../Components/Spinner";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
    },
  ];

  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8080/api/v1/transactions/get-transaction",
        { userid: user._id }
      );
      setLoading(false);
      setAllTransaction(res.data);
    } catch (error) {
      console.log(error);
      message.error("Cannot Fetch Transactions");
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      await axios.post(
        "http://localhost:8080/api/v1/transactions/add-transaction",
        {
          ...values,
          userid: user._id,
        }
      );
      setLoading(false);
      message.success("Transaction added successfully");
      setShowModal(false);
    } catch (error) {
      setLoading(false);
      message.error("Failed to add transaction");
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>range filters</div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content">
        <Table columns={columns} dataSource={allTransaction} />
      </div>
      <Modal
        title="Add Transaction"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="type" name="type">
            <Select>
              <Select.Option value="Income">Income</Select.Option>
              <Select.Option value="Expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="electricity">Electricity</Select.Option>
              <Select.Option value="water">Water</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
              <Select.Option value="Rent">Rent</Select.Option>
              <Select.Option value="miscellenous">Miscellenous</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Home;
