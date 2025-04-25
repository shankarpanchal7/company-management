import { useState } from "react";
import { Modal, Button, Select, Spin, message } from "antd";
import { assignUserToCompany } from "../services/companies.service";

const AssignUserModal = ({ visible, onCancel, userId, onAssignSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyList, setCompanyList] = useState([]); 

  const handleAssign = async () => {
    if (!selectedCompany) {
      message.error("Please select a company");
      return;
    }

    setLoading(true);
    try {
      await assignUserToCompany(userId, selectedCompany);
      message.success("User successfully assigned to company");
      onAssignSuccess();
      onCancel();
    } catch (error) {
      message.error("Failed to assign user to company");
    } finally {
      setLoading(false);
    }
  };

  const handleCompanyChange = (value) => {
    setSelectedCompany(value);
  };

  return (
    <Modal
      title="Assign User to Company"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={400}
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <div>
          <Select
            placeholder="Select a company"
            className="w-full"
            onChange={handleCompanyChange}
            value={selectedCompany}
            options={companyList.map((company) => ({
              label: company.name,
              value: company._id,
            }))}
          />
          <div className="flex justify-end mt-4">
            <Button onClick={onCancel} className="mr-2">
              Cancel
            </Button>
            <Button type="primary" onClick={handleAssign} disabled={loading}>
              Assign
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AssignUserModal;
