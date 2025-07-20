import Feather from "@expo/vector-icons/Feather";
import { Link, router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FETCH_API_URL = "http://localhost:8000/mobile/secured/job-poster/get/";
const DELETE_API_URL =
  "http://localhost:8000/mobile/secured/job-poster/delete/";
const UPDATE_API_URL = "http://localhost:8000/mobile/secured/job-poster/edit/";

interface Job {
  job_id: number;
  poster_id: number;
  title: string;
  description: string;
  gender: string;
  status: string;
  work_hours: number;
  posted_date: string;
  job_date: string;
  start_date: string;
  amount_of_seekers: number;
  hourly_title: string;
  location: string;
  requirements: string[];
}

interface JobCardProps {
  job: Job;
  onDelete: (jobId: number) => void;
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

const ViewPostedJobsScreen = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const handleDeleteJob = async (jobId: number) => {
    const jobToDelete = jobs.find((job) => job.job_id === jobId);

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(DELETE_API_URL + `${jobId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }
      alert("Job posting deleted successfully");
      Alert.alert("Success", "Job posting deleted successfully");
    } catch (error: any) {
      console.error("Job delete error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
      alert(error);
    }

    // Alert.alert(
    //   "Delete Job",
    //   `Are you sure you want to delete the job posting for "${jobToDelete?.title}"?`,
    //   [
    //     {
    //       text: "Cancel",
    //       style: "cancel",
    //     },
    //     {
    //       text: "Delete",
    //       style: "destructive",
    //       onPress: async () => {
    //         const token = await AsyncStorage.getItem("token");
    //         const response = await fetch(DELETE_API_URL, {
    //           method: "DELETE",
    //           headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${token}`,
    //           },
    //         });

    //         if (!response.ok) {
    //           throw new Error("Failed to delete job");
    //         }
    //         alert("Job posting deleted successfully");
    //         Alert.alert("Success", "Job posting deleted successfully");
    //       },
    //     },
    //   ]
    // );
  };

  const handleEditPress = (job_id: number) => {
    router.push({
      pathname: "/authentication/otpemail",
      params: { jobId: job_id },
    });
  };

  const handleBackPress = () => {
    router.back();
  };

  const JobCard: React.FC<JobCardProps> = ({ job, onDelete }) => (
    <View style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.jobAddress}>{job.location}</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              router.push({
                pathname: "/JobPoster/editjob",
                params: { jobId: job.job_id },
              });
            }}
          >
            <Icon name="edit" size={20} color="#FF8C42" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(job.job_id)}
          >
            <Icon name="delete" size={20} color="#FF4444" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.jobDetails}>
        <Text style={styles.detailLabel}>Job ID:</Text>
        <Text style={styles.detailValue}>{job.job_id}</Text>

        <Text style={styles.detailLabel}>Status:</Text>
        <Text style={styles.detailValue}>{job.status}</Text>

        <Text style={styles.detailLabel}>Duration:</Text>
        <Text style={styles.detailValue}>{job.work_hours}</Text>

        <Text style={styles.detailLabel}>Schedule:</Text>
        <Text style={styles.detailValue}>{job.job_date}</Text>

        <Text style={styles.detailLabel}>Number of employeements:</Text>
        <Text style={styles.detailValue}>{job.amount_of_seekers}</Text>

        <Text style={styles.detailLabel}>Job Details:</Text>
        <Text style={styles.detailValue}>{job.description}</Text>

        <Text style={styles.detailLabel}>Requirements:</Text>
        <Text style={styles.detailValue}>{job.requirements}</Text>
      </View>
    </View>
  );

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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token || !userData) return;

        const response = await fetch(FETCH_API_URL + `${userData.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();
        setJobs(data.data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    if (userData) {
      fetchJobs();
    }
  }, [userData]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Icon name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>View posted jobs</Text>
            <Text style={styles.headerSubtitle}>
              {jobs.length} job{jobs.length !== 1 ? "s" : ""} posted
            </Text>
          </View>
          <Link href="/(tabs)/JobPoster/homepage">
            <TouchableOpacity style={styles.homeButton}>
              <Feather name="home" size={24} color="white" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard key={job.job_id} job={job} onDelete={handleDeleteJob} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Icon name="work-off" size={64} color="#ccc" />
            <Text style={styles.emptyStateTitle}>No Jobs Posted</Text>
            <Text style={styles.emptyStateText}>
              You haven't posted any jobs yet. Create your first job posting to
              get started.
            </Text>
            <Link href="/(tabs)/JobPoster/jobpost">
              <TouchableOpacity style={styles.createJobButton}>
                <Text style={styles.createJobButtonText}>Post a Job</Text>
              </TouchableOpacity>
            </Link>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    backgroundColor: "#FF8C42",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginRight: 12,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    marginTop: 4,
  },
  homeButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginLeft: 12,
  },
  scrollContainer: {
    padding: 16,
    flexGrow: 1,
  },
  jobCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  jobAddress: {
    fontSize: 14,
    color: "#666",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  editButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#FFF5E6",
  },
  deleteButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#FFE6E6",
  },
  jobDetails: {
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  detailValue: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  createJobButton: {
    backgroundColor: "#FF8C42",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createJobButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ViewPostedJobsScreen;
