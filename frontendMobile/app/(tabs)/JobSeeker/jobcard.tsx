import { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  TextInput,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import JobCountdown from "@/components/date_countdown";

const JobCard = ({
  job_id,
  apply_date,
  status,
  user_id,
  application_id,
}: any) => {
  const [jobDetails, setJobDetails] = useState<any>();
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [isReviewModalVisible, setReviewModalVisible] = useState(false);

  const addReview = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/mobile/secured/add-job-review",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            job_id,
            user_id,
            rating,
            review,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      Alert.alert("Success", "Review submitted successfully!");
    } catch (err) {
      console.error("Network error:", err);
      Alert.alert("Error", "Failed to submit review");
    }
  };

  useEffect(() => {
    const getJobDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/mobile/secured/job-poster/get-job/${job_id}`
        );
        const data = await res.json();
        setJobDetails(data.data[0]);
        console.log(data);
      } catch (err) {
        console.error("Failed to fetch joblist:", err);
        setJobDetails({} as any);
      }
    };

    if (job_id) {
      getJobDetails();
    }
  }, [job_id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review":
      case "Pending":
        return "#FF8C42";
      case "Interview Scheduled":
      case "Accepted":
        return "#4CAF50";
      case "Rejected":
        return "#F44336";
      default:
        return "#999";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Under Review":
      case "Pending":
        return "clock";
      case "Interview Scheduled":
        return "calendar";
      case "Accepted":
        return "check-circle";
      case "Rejected":
        return "x-circle";
      default:
        return "help-circle";
    }
  };

  return (
    <View
      style={[
        styles.jobCard,
        status !== "Rejected" && styles.jobCardWithCountdown,
      ]}
    >
      {/* Countdown positioned at top left - only show for non-rejected applications */}
      {status !== "Rejected" && (
        <View style={styles.countdownContainer}>
          <JobCountdown
            applicationId={application_id}
            jobId={job_id}
            onComplete={() => {
              Alert.alert(
                "Job Deadline Reached",
                "The job deadline has been reached for this application."
              );
            }}
            style={styles.countdownStyle}
          />
        </View>
      )}

      <View style={styles.jobHeader}>
        <View style={styles.jobTitleContainer}>
          <Text style={styles.jobTitle}>
            {jobDetails?.title || "Loading..."}
          </Text>
          <Text style={styles.jobCompany}>
            {jobDetails?.requirements || ""}
          </Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(status) },
          ]}
        >
          <Feather name={getStatusIcon(status)} size={12} color="white" />
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>

      <View style={styles.jobDetails}>
        <View style={styles.jobDetailItem}>
          <Feather name="map-pin" size={16} color="#666" />
          <Text style={styles.jobDetailText}>
            {jobDetails?.location || "N/A"}
          </Text>
        </View>

        <View style={styles.jobDetailItem}>
          <Feather name="calendar" size={16} color="#666" />
          <Text style={styles.jobDetailText}>Applied: {apply_date}</Text>
        </View>

        <View style={styles.jobDetailItem}>
          <Feather name="clock" size={16} color="#666" />
          <Text style={styles.jobDetailText}>
            {jobDetails?.work_hours || "N/A"}
          </Text>
        </View>
      </View>

      <Text style={styles.jobDescription}>
        {jobDetails?.description || "No description available"}
      </Text>

      {/* Only show review button for accepted jobs */}
      {status === "Accepted" && (
        <TouchableOpacity
          style={styles.actionButtonReview}
          onPress={() => setReviewModalVisible(true)}
        >
          <Feather name="star" size={16} color="white" />
          <Text style={styles.actionTextReview}>Add Review</Text>
        </TouchableOpacity>
      )}

      <View style={styles.jobActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="message-circle" size={16} color="#4CAF50" />
          <Text style={styles.actionText}>Message HR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="phone" size={16} color="#2196F3" />
          <Text style={styles.actionText}>Call</Text>
        </TouchableOpacity>
      </View>

      {/* Review Modal */}
      <Modal
        visible={isReviewModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setReviewModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.reviewModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Review</Text>
              <TouchableOpacity onPress={() => setReviewModalVisible(false)}>
                <Feather name="x" size={20} color="#333" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Rating (1-5)</Text>
            <TextInput
              placeholder="Enter rating from 1 to 5"
              value={rating}
              onChangeText={setRating}
              keyboardType="numeric"
              style={styles.input}
              maxLength={1}
            />

            <Text style={styles.inputLabel}>Review</Text>
            <TextInput
              placeholder="Write your review here..."
              value={review}
              onChangeText={setReview}
              style={[styles.input, styles.textArea]}
              multiline
              textAlignVertical="top"
            />

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={async () => {
                  if (!rating || !review) {
                    Alert.alert(
                      "Error",
                      "Please fill in both rating and review"
                    );
                    return;
                  }
                  if (parseInt(rating) < 1 || parseInt(rating) > 5) {
                    Alert.alert("Error", "Rating must be between 1 and 5");
                    return;
                  }
                  await addReview();
                  setReviewModalVisible(false);
                  setRating("");
                  setReview("");
                }}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setReviewModalVisible(false);
                  setRating("");
                  setReview("");
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  jobCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    paddingTop: 20, // Default padding
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: "relative", // Enable absolute positioning
  },
  // Add conditional padding for non-rejected cards
  jobCardWithCountdown: {
    paddingTop: 50, // Extra padding when countdown is present
  },
  countdownContainer: {
    position: "absolute",
    top: 12,
    left: 12,
    zIndex: 10,
  },
  countdownStyle: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
    paddingRight: 8,
  },
  jobTitleContainer: {
    flex: 1,
    paddingRight: 12,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    lineHeight: 22,
  },
  jobCompany: {
    fontSize: 14,
    color: "#666",
    lineHeight: 18,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
    minWidth: 80,
    justifyContent: "center",
  },
  statusText: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
  },
  jobDetails: {
    marginBottom: 15,
    gap: 8,
  },
  jobDetailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  jobDetailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
    flex: 1,
  },
  jobDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 15,
  },
  actionButtonReview: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "#FF8C42",
    alignSelf: "flex-start",
    marginBottom: 15,
    gap: 6,
  },
  actionTextReview: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
  },
  jobActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    gap: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F8F8F8",
    flex: 1,
    justifyContent: "center",
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  reviewModal: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 20,
    width: "100%",
    maxWidth: 400,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#FF8C42",
  },
  cancelButton: {
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default JobCard;
