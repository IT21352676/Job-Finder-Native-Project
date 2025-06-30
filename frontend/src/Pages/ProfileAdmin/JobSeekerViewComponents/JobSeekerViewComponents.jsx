import React, { useState, useEffect } from "react";
import { Table, Button, Modal, message } from "antd";
import axios from "axios";

const JobSeekerViewComponent = ({
  requestDataUrl,
  acceptUrl,
  declineUrl,
  successAcceptMessage,
  successDeclineMessage,
  failureMessage,
  acceptButtonName,
  declineButtonName,
  modelName,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJobSeeker, setSelectedJobSeeker] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(requestDataUrl);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onViewClick = (record) => {
    setSelectedJobSeeker(record);
    setModalVisible(true);
  };

  const handleAccept = async () => {
    if (!selectedJobSeeker) return;

    try {
      const response = await fetch(
        `${acceptUrl}/${selectedJobSeeker.seeker_id}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        message.success(successAcceptMessage);
        fetchData();
      } else {
        message.error(failureMessage);
      }
    } catch (error) {
      console.error("Error accepting job seeker:", error);
      message.error(failureMessage);
    } finally {
      setModalVisible(false);
    }
  };

  const handleDecline = async () => {
    console.log("Called");
    if (!selectedJobSeeker) return;

    try {
      const response = await axios.put(
        `${declineUrl}/${selectedJobSeeker.seeker_id}`
      );

      if (response.status === 200) {
        message.success(successDeclineMessage);
        fetchData();
      } else {
        message.error(failureMessage);
      }
    } catch (error) {
      message.error(failureMessage);
    } finally {
      setModalVisible(false);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "seeker_id", key: "seeker_id" },
    { title: "First Name", dataIndex: "firstname", key: "firstname" },
    { title: "Last Name", dataIndex: "lastname", key: "lastname" },
    { title: "Phone Number", dataIndex: "telnumber", key: "telnumber" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => onViewClick(record)}
          style={{ background: "#FFA500", width: "100px" }}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div
      style={{
        width: "80%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        rowKey="seeker_id"
        style={{ width: "80%" }}
      />

      <Modal
        title={modelName}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        centered
        width={1000}
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
        footer={[
          declineButtonName && (
            <Button key="decline" onClick={handleDecline}>
              {declineButtonName}
            </Button>
          ),
          acceptButtonName && (
            <Button key="accept" type="primary" onClick={handleAccept}>
              {acceptButtonName}
            </Button>
          ),
        ]}
      >
        {selectedJobSeeker && (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "50%" }}>
              <p>
                <strong>User Id :</strong>
                {selectedJobSeeker.seeker_id}
              </p>

              <p>
                <strong>Name :</strong> {selectedJobSeeker.FirstName}{" "}
                {selectedJobSeeker.lastname}
              </p>
              <p>
                <strong>Phone Number :</strong> {selectedJobSeeker.telnumber}
              </p>
              <p>
                <strong>Birth Date :</strong>{" "}
                {new Date(selectedJobSeeker.birthday).toLocaleDateString()}
              </p>
              <p>
                <strong>NIC :</strong> {selectedJobSeeker.nic}
              </p>
              <p>
                <strong>Address : </strong> {selectedJobSeeker.addressLine},
                {selectedJobSeeker.city}
              </p>
            </div>
            <div style={{ width: "50%" }}>
              <p>
                <strong></strong>
                <img
                  src={selectedJobSeeker.proofDoc_front}
                  alt="Not Found"
                  style={{ width: "60%" }}
                />
              </p>
              <p>
                <strong></strong>
                <img
                  src={selectedJobSeeker.proofDoc_back}
                  alt="Not Found"
                  style={{ width: "60%" }}
                />
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default JobSeekerViewComponent;
