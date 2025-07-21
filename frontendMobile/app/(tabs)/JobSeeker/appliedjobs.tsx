import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Modal,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JobCard from "./jobcard";

interface NavigationProp {
  navigate: (screen: string) => void;
  goBack: () => void;
}

interface PendingJobsProps {
  navigation: NavigationProp;
}
interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

const PendingJobsScreen: React.FC<PendingJobsProps> = ({ navigation }) => {
  const [activeNav, setActiveNav] = useState("Jobs");
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const [acceptedJobs, setAcceptedJobs] = useState([] as any);
  const [pendingJobs, setPendingJobs] = useState([] as any);
  const [rejectedJobs, setRejectedJobs] = useState([] as any);

  const [userData, setUserData] = useState<User>();

  const fetchStoredData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");

      if (token && userJson) {
        const user = JSON.parse(userJson);
        console.log("Auto-login user:", user.firstname);
        console.log("Token:", token);

        setUserData(user);
      }
    } catch (error) {
      console.error("Error retrieving login data:", error);
    }
  }, []);

  useEffect(() => {
    fetchStoredData();
  }, [fetchStoredData]);

  const getAcceptedJobs = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/mobile/secured/application/accept/${userData?.id}`
      );
      const data = await res.json();
      setAcceptedJobs(data.data);
    } catch (err) {
      console.error("Failed to fetch joblist:", err);
      setAcceptedJobs([]);
    }
  };
  const getPendingJobs = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/mobile/secured/application/pending/${userData?.id}`
      );
      const data = await res.json();
      setPendingJobs(data.data);
      console.log(data);
    } catch (err) {
      console.error("Failed to fetch joblist:", err);
      setPendingJobs([]);
    }
  };
  const getRejectedJobs = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/mobile/secured/application/reject/${userData?.id}`
      );
      const data = await res.json();
      setRejectedJobs(data.data);
    } catch (err) {
      console.error("Failed to fetch joblist:", err);
      setRejectedJobs([]);
    }
  };
  useEffect(() => {
    getAcceptedJobs();
    getPendingJobs();
    getRejectedJobs();
  }, [userData]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF8C42" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <Link href="/(tabs)/JobSeeker/homepage">
              <Feather name="arrow-left" size={24} color="white" />
            </Link>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pending Applications</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterVisible(true)}
          >
            <Feather name="filter" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.completedButton}
            onPress={() => navigation.navigate("CompletedJobsScreen")}
          >
            <Feather name="check-circle" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Current Filter */}
      {selectedFilter !== "All" && (
        <View style={styles.currentFilter}>
          <Text style={styles.filterText}>Showing: {selectedFilter}</Text>
          <TouchableOpacity onPress={() => setSelectedFilter("All")}>
            <Feather name="x" size={18} color="#FF8C42" />
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.jobCard} activeOpacity={0.8}>
          {pendingJobs?.map((job: any) => (
            <JobCard
              job_id={job.job_id}
              apply_date={job.apply_date}
              status={job.status}
              key={job.job_id}
            />
          ))}
        </TouchableOpacity>

        {acceptedJobs?.map((job: any, index: any) => (
          <JobCard
            job_id={job.job_id}
            apply_date={job.apply_date}
            status={job.status}
            key={job.job_id}
          />
        ))}

        {rejectedJobs?.map((job: any, index: any) => (
          <JobCard
            job_id={job.job_id}
            apply_date={job.apply_date}
            status={job.status}
            key={job.job_id}
          />
        ))}

        {/* {filteredJobs.length === 0 && (
          <View style={styles.emptyState}>
            <Feather name="clock" size={64} color="#ccc" />
            <Text style={styles.emptyStateText}>No pending applications</Text>
            <Text style={styles.emptyStateSubtext}>
              Your pending job applications will appear here
            </Text>
          </View>
        )} */}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={filterVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter by Status</Text>
              <TouchableOpacity onPress={() => setFilterVisible(false)}>
                <Feather name="x" size={20} color="#333" />
              </TouchableOpacity>
            </View>

            {/* {filterOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.filterOption,
                  selectedFilter === option && styles.selectedFilterOption,
                ]}
                onPress={() => {
                  setSelectedFilter(option);
                  setFilterVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    selectedFilter === option && styles.selectedFilterText,
                  ]}
                >
                  {option}
                </Text>
                {selectedFilter === option && (
                  <Feather name="check" size={20} color="#FF8C42" />
                )}
              </TouchableOpacity>
            ))} */}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default PendingJobsScreen;
