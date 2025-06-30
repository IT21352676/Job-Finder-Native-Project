import React, { useState, useEffect } from "react";
import { Table, Button, Modal, message } from "antd";

const ViewComponent = ({
  requestDataUrl,
  acceptUrl,
  declineUrl,
  successAcceptMessage,
  successDeclineMessage,
  failureMessage,
  acceptButtonName,
  declineButtonName,
  modelname,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJobPoster, setSelectedJobPoster] = useState(null);

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
    setSelectedJobPoster(record); // Set the state
    setModalVisible(true);
  };

  const handleAccept = async () => {
    if (!selectedJobPoster) return;

    try {
      const response = await fetch(
        `${acceptUrl}/${selectedJobPoster.poster_id}`,
        {
          method: "PUT",
        }
      );

      fetchData();

      if (response.status === 200) {
        message.success(successAcceptMessage);
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
    if (!selectedJobPoster) return;

    try {
      const response = await fetch(
        `${declineUrl}/${selectedJobPoster.poster_id}`,
        {
          method: "PUT",
        }
      );

      fetchData();

      if (response.status === 200) {
        message.success(successDeclineMessage);
      } else {
        message.error(failureMessage);
      }
    } catch (error) {
      console.error("Error declining job seeker:", error);
      message.error(failureMessage);
    } finally {
      setModalVisible(false);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "poster_id",
      key: "poster_id",
    },
    {
      title: "Name",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Phone Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
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
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        rowKey="JobPosterID"
        style={{ width: "80%" }}
      />

      <Modal
        title={modelname}
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
        {selectedJobPoster && (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "50%" }}>
              <p>
                <strong>ID:</strong> {selectedJobPoster.poster_id}
              </p>
              <p>
                <strong>Name:</strong> {selectedJobPoster.firstname}{" "}
                {selectedJobPoster.lastname}
              </p>
              <p>
                <strong>Company:</strong> {selectedJobPoster.company}
              </p>
              <p>
                <strong>Phone Number:</strong> {selectedJobPoster.contactNumber}
              </p>
              <p>
                <strong>Email Address:</strong> {selectedJobPoster.emailAddress}
              </p>
              <p>
                <strong>Address:</strong> {selectedJobPoster.address}
              </p>
            </div>
            <div style={{ width: "50%" }}>
              <p>
                <strong>Image 1:</strong>
                <img
                  src={selectedJobPoster.proofDoc_front}
                  alt="Not found"
                  style={{ width: "60%" }}
                />
              </p>
              <p>
                <strong>Image 2:</strong>
                <img
                  src={selectedJobPoster.proofDoc_back}
                  alt="Not found"
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

export default ViewComponent;
