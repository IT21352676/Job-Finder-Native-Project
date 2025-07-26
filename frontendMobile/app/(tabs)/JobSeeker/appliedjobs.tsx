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
  const [isLoading, setIsLoading] = useState(true);

  const [userData, setUserData] = useState<User>();

  const filterOptions = ["All", "Pending", "Accepted", "Rejected"];

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
      setAcceptedJobs(data.data || []);
    } catch (err) {
      console.error("Failed to fetch accepted jobs:", err);
      setAcceptedJobs([]);
    }
  };

  const getPendingJobs = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/mobile/secured/application/pending/${userData?.id}`
      );
      const data = await res.json();
      setPendingJobs(data.data || []);
      console.log(data);
    } catch (err) {
      console.error("Failed to fetch pending jobs:", err);
      setPendingJobs([]);
    }
  };

  const getRejectedJobs = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/mobile/secured/application/reject/${userData?.id}`
      );
      const data = await res.json();
      setRejectedJobs(data.data || []);
    } catch (err) {
      console.error("Failed to fetch rejected jobs:", err);
      setRejectedJobs([]);
    }
  };

  useEffect(() => {
    if (userData?.id) {
      setIsLoading(true);
      Promise.all([
        getAcceptedJobs(),
        getPendingJobs(),
        getRejectedJobs(),
      ]).finally(() => {
        setIsLoading(false);
      });
    }
  }, [userData]);

  // Filter jobs based on selected filter
  const getFilteredJobs = () => {
    switch (selectedFilter) {
      case "Pending":
        return pendingJobs;
      case "Accepted":
        return acceptedJobs;
      case "Rejected":
        return rejectedJobs;
      default:
        return [...pendingJobs, ...acceptedJobs, ...rejectedJobs];
    }
  };

  const filteredJobs = getFilteredJobs();
  const totalJobs =
    pendingJobs.length + acceptedJobs.length + rejectedJobs.length;

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
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>My Applications</Text>
            <Text style={styles.headerSubtitle}>
              {totalJobs} total application{totalJobs !== 1 ? "s" : ""}
            </Text>
          </View>
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
        contentContainerStyle={styles.scrollContent}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading applications...</Text>
          </View>
        ) : filteredJobs.length === 0 ? (
          <View style={styles.emptyState}>
            <Feather name="clock" size={64} color="#ccc" />
            <Text style={styles.emptyStateText}>
              {selectedFilter === "All"
                ? "No applications found"
                : `No ${selectedFilter.toLowerCase()} applications`}
            </Text>
            <Text style={styles.emptyStateSubtext}>
              {selectedFilter === "All"
                ? "Your job applications will appear here"
                : `Your ${selectedFilter.toLowerCase()} applications will appear here`}
            </Text>
          </View>
        ) : (
          filteredJobs.map((job: any) => (
            <JobCard
              key={`${job.job_id}-${job.application_id || job.apply_date}`}
              user_id={userData?.id}
              job_id={job.job_id}
              apply_date={job.apply_date}
              status={job.status}
              application_id={job.application_id}
            />
          ))
        )}
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

            {filterOptions.map((option) => (
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
                  {option !== "All" && (
                    <Text style={styles.filterCount}>
                      {" "}
                      (
                      {option === "Pending"
                        ? pendingJobs.length
                        : option === "Accepted"
                        ? acceptedJobs.length
                        : option === "Rejected"
                        ? rejectedJobs.length
                        : 0}
                      )
                    </Text>
                  )}
                </Text>
                {selectedFilter === option && (
                  <Feather name="check" size={20} color="#FF8C42" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
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
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerTitleContainer: {
    marginLeft: 15,
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 2,
  },
  headerRight: {
    flexDirection: "row",
    gap: 10,
  },
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
    padding: 12,
    backgroundColor: "rgba(255, 140, 66, 0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 140, 66, 0.2)",
  },
  filterText: {
    color: "#FF8C42",
    fontWeight: "600",
    fontSize: 14,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginTop: 20,
    textAlign: "center",
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
    textAlign: "center",
    lineHeight: 20,
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
    width: "85%",
    maxHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  filterOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedFilterOption: {
    backgroundColor: "rgba(255, 140, 66, 0.1)",
  },
  filterOptionText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  selectedFilterText: {
    color: "#FF8C42",
    fontWeight: "600",
  },
  filterCount: {
    fontSize: 14,
    color: "#999",
    fontWeight: "normal",
  },
});

export default PendingJobsScreen;
