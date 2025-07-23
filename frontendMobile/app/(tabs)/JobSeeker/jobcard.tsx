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

const JobCard = ({ job_id, apply_date, status, user_id }: any) => {
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
    } catch (err) {
      console.error("Network error:", err);
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
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review":
        return "#FF8C42";
      case "Interview Scheduled":
        return "#4CAF50";
      default:
        return "#999";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Under Review":
        return "clock";
      case "Interview Scheduled":
        return "calendar";
      default:
        return "help-circle";
    }
  };

  return (
    <>
      <View style={styles.jobHeader}>
        <View style={styles.jobTitleContainer}>
          <Text style={styles.jobTitle}>{jobDetails?.title}</Text>
          <Text style={styles.jobCompany}>{jobDetails?.requirements}</Text>
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
          <Text style={styles.jobDetailText}>{jobDetails?.location}</Text>
        </View>

        <View style={styles.jobDetailItem}>
          <Feather name="calendar" size={16} color="#666" />
          <Text style={styles.jobDetailText}>Applied: {apply_date}</Text>
        </View>
        <View style={styles.jobDetailItem}>
          <Feather name="clock" size={16} color="#666" />
          <Text style={styles.jobDetailText}>{jobDetails?.work_hours}</Text>
        </View>
      </View>

      <Text style={styles.jobDescription}>{jobDetails?.description}</Text>
      <TouchableOpacity
        style={styles.actionButtonReview}
        onPress={() => setReviewModalVisible(true)}
      >
        <Text style={styles.actionTextReview}>Add review</Text>
      </TouchableOpacity>

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

      <Modal
        visible={isReviewModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.reviewModal}>
            <Text style={styles.modalTitle}>Add Review</Text>

            <TextInput
              placeholder="Rating (1-5)"
              value={rating}
              onChangeText={setRating}
              keyboardType="numeric"
              style={styles.input}
            />

            <TextInput
              placeholder="Write your review"
              value={review}
              onChangeText={setReview}
              style={[styles.input, { height: 100 }]}
              multiline
            />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={styles.modalButton}
                onPress={async () => {
                  await addReview();
                  setReviewModalVisible(false);
                  setRating("");
                  setReview("");
                }}
              >
                <Text style={{ color: "white" }}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#aaa" }]}
                onPress={() => setReviewModalVisible(false)}
              >
                <Text style={{ color: "white" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  reviewModal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 14,
  },
  modalButton: {
    backgroundColor: "#FF8C42",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: {
    backgroundColor: "#FF8C42",
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 15,
  },
  headerRight: { flexDirection: "row", gap: 10 },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  completedButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  currentFilter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 15,
    padding: 10,
    backgroundColor: "rgba(255, 140, 66, 0.1)",
    borderRadius: 8,
  },
  filterText: { color: "#FF8C42", fontWeight: "600" },
  scrollContainer: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  jobCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  jobTitleContainer: { flex: 1 },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  jobCompany: { fontSize: 14, color: "#666" },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  statusText: { fontSize: 12, color: "white", fontWeight: "600" },
  jobDetails: { marginBottom: 15 },
  jobDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  jobDetailText: { fontSize: 14, color: "#666", marginLeft: 8 },
  jobDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 15,
  },
  jobActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F8F8F8",
    flex: 1,
    marginHorizontal: 2,
    justifyContent: "center",
  },

  actionButtonReview: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f83a00ff",
    width: 200,

    marginHorizontal: 2,
    justifyContent: "center",
  },
  actionTextReview: { fontSize: 12, marginLeft: 5, color: "white" },
  actionText: { fontSize: 12, marginLeft: 5, color: "#666" },
  emptyState: {
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginTop: 20,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  filterModal: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    maxHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  filterOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedFilterOption: { backgroundColor: "rgba(255, 140, 66, 0.1)" },
  filterOptionText: { fontSize: 16, color: "#333" },
  selectedFilterText: { color: "#FF8C42", fontWeight: "600" },
  bottomNav: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 10,
  },
  navItem: { alignItems: "center", flex: 1 },
  navText: { fontSize: 10, fontWeight: "500", color: "#999", marginTop: 4 },
  navTextActive: { color: "#FF8C42" },
});

export default JobCard;
