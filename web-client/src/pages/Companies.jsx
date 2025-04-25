import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Select, Spin, notification } from "antd";
import { getAllCompanies, deleteCompany, assignUserToCompany } from "../services/companies.service";
import { getAllUsers } from "../services/users.service";

const CompanyPage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false); 

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const data = await getAllCompanies();
      setCompanies(data);
    } catch (error) {
      console.error("Error fetching companies", error);
      notification.error({ message: 'Error fetching companies' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (companyId) => {
    setDeleting(true);
    try {
      await deleteCompany(companyId);
      fetchCompanies();
      notification.success({ message: 'Company deleted successfully' });
    } catch (error) {
      console.error("Error deleting company", error);
      notification.error({ message: 'Error deleting company' });
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            onClick={() => handleDelete(record._id)}
            loading={deleting}
            disabled={deleting}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2>Companies</h2>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table dataSource={companies} columns={columns} rowKey="_id" />
      )}
    </div>
  );
};

export default CompanyPage;
