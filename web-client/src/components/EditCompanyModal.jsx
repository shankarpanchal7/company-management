import { useState, useEffect } from "react";
import { Modal, Button, Input, Spin, message } from "antd";
import { updateCompany } from "../services/companies.service";

const EditCompanyModal = ({ visible, onCancel, companyId, onEditSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyCity, setCompanyCity] = useState("");

  useEffect(() => {
    if (companyId) {
      // Fetch company details by ID and populate the form fields
      fetchCompanyDetails(companyId);
    }
  }, [companyId]);

  const fetchCompanyDetails = async (companyId) => {
    // API call to fetch company details and populate state
    // For now, just set some default values
    setCompanyName("Existing Company");
    setCompanyCity("Existing City");
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      await updateCompany(companyId, { name: companyName, city: companyCity });
      message.success("Company updated successfully");
      onEditSuccess();
      onCancel();
    } catch (error) {
      message.error("Failed to update company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Company"
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
          <Input
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <Input
            placeholder="Company City"
            value={companyCity}
            onChange={(e) => setCompanyCity(e.target.value)}
            className="mt-2"
          />
          <div className="flex justify-end mt-4">
            <Button onClick={onCancel} className="mr-2">
              Cancel
            </Button>
            <Button type="primary" onClick={handleEdit} disabled={loading}>
              Save
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EditCompanyModal;
