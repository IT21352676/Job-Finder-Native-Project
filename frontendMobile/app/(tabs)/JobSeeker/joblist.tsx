import React, { useEffect, useRef, useState } from "react";
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
import io from "socket.io-client";
import Toast, { BaseToast } from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialIcons";
import ChatScreen from "./chatscreen";
import { Link } from "expo-router";

const socket = io("http://localhost:8001");

const JobsList = () => {
  // TODO: Replace with dynamic userId (e.g., from auth context or AsyncStorage)
  const userId = 2; // seeker ID

  const [activeNav, setActiveNav] = useState("Jobs");
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const roomIdRef = useRef("");

  const [jobs, setJobs] = useState([] as any);

  socket.emit("register", userId, "Job Seeker");

  const fetchJobList = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/mobile/secured/job-poster/get-all-open"
      );
      const data = await res.json();
      setJobs(data.data);
    } catch (err) {
      console.error("Failed to fetch joblist:", err);
      setJobs({} as any);
    }
  };

  useEffect(() => {
    fetchJobList();
  }, []);

  const goBack = () => Alert.alert("Navigation", "Go back");

  const newPosting = () => Alert.alert("Action", "Create new job posting");

  const applyJob = (jobTitle: string) =>
    Alert.alert("Apply", `Applied for ${jobTitle}`);

  const handleNavPress = (navItem: string) => {
    setActiveNav(navItem);
    Alert.alert("Navigation", `Go to ${navItem}`);
  };

  const toastConfig = {
    chat_accepted_notification: ({ text1, text2, onPress, ...rest }: any) => (
      <BaseToast
        {...rest}
        contentContainerStyle={{ paddingRight: 12 }}
        text1={text1}
        text2={text2}
        renderTrailingIcon={() => (
          <TouchableOpacity
            onPress={onPress}
            style={{
              backgroundColor: "#FF8C42",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 4,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Open Chat
            </Text>
          </TouchableOpacity>
        )}
      />
    ),
    request_sent_notification: ({ text1, text2, ...rest }: any) => (
      <BaseToast
        {...rest}
        contentContainerStyle={{
          paddingRight: 12,
          backgroundColor: "#d4edda",
          borderRightColor: "#28a745",
          borderRightWidth: 6,
          borderRadius: 8,
        }}
        text1Style={{
          fontSize: 16,
          fontWeight: "bold",
          color: "#155724",
        }}
        text2Style={{
          fontSize: 14,
          color: "#155724",
        }}
        text1={text1}
        text2={text2}
      />
    ),
    request_failed_notification: ({ text1, text2, ...rest }: any) => (
      <BaseToast
        {...rest}
        contentContainerStyle={{
          paddingRight: 12,
          backgroundColor: "#edd4d4ff",
          borderRightColor: "#a72828ff",
          borderRightWidth: 6,
          borderRadius: 8,
        }}
        text1Style={{
          fontSize: 16,
          fontWeight: "bold",
          color: "#571515ff",
        }}
        text2Style={{
          fontSize: 14,
          color: "#571515ff",
        }}
        text1={text1}
        text2={text2}
      />
    ),
  };

  const listenChatAcceptNotification = () => {
    socket.on("accepted_notification", (data) => {
      console.log("Received Accepted Notification:", data);
      roomIdRef.current = data.roomId;
      setTimeout(() => {
        Toast.show({
          type: "chat_accepted_notification",
          text1: "Chat request accepted",
          text2: "Tap to open the chat room",
          onPress: () => {
            setModalVisible(true);
            socket.emit("join_room", data.roomId);
          },
          position: "top",
        });
      }, 2000);
    });
  };
  useEffect(() => {
    listenChatAcceptNotification();
  }, []);

  const handleChatWithUS = async (posterId: string, jobId: string) => {
    const fromUserId = userId;
    const toUserId = posterId;

    try {
      const res = await fetch(
        "http://localhost:8000/mobile/secured/notification/chat-request",
        {
          method: "POST",
          body: JSON.stringify({ jobId, fromUserId, toUserId }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();

      if (res.status === 404) {
        Toast.show({
          type: "request_failed_notification",
          text1: "Request sending failed",
          text2: data.error,

          position: "top",
        });
        return console.log(data.error);
      }
      console.log(data.message);
      Toast.show({
        type: "request_sent_notification",
        text1: "Chat request sent succesfully",
        text2: "Wait for poster acceptance",

        position: "top",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const stars = Array.from({ length: 5 }, (_, i) => (i < full ? "★" : "☆"));
    return stars.join(" ");
  };

  const navItems = [
    { id: "Home", icon: "home", text: "Home" },
    { id: "Jobs", icon: "briefcase", text: "Jobs" },
    { id: "Wallet", icon: "credit-card", text: "Wallet" },
    { id: "Profile", icon: "user", text: "Profile" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)} // Android back button
      >
        <View style={styles.modalOverlay}>
          <ChatScreen
            socket={socket}
            roomId={roomIdRef.current}
            userId={userId}
            setModalVisible={setModalVisible}
          />
        </View>
      </Modal>
      <StatusBar barStyle="light-content" backgroundColor="#FF8C42" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn}>
            <Link href="/(tabs)/JobSeeker/homepage">
              <Feather name="arrow-left" size={20} color="white" />
            </Link>
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Jobs</Text>
            <Text style={styles.headerSubtitle}>Find your next job</Text>
          </View>
        </View>
      </View>

      {/* Jobs List */}
      <ScrollView contentContainerStyle={styles.jobsContainer}>
        {jobs.map((job: any, index: any) => (
          <View key={index} style={styles.jobCard}>
            <View style={styles.jobHeader}>
              <View>
                <Text style={styles.title}>{job.title}</Text>
                <Text style={styles.badge}>New Posting</Text>
              </View>
              <Text style={styles.rate}>{job.status.toUpperCase()}</Text>
            </View>

            <View style={styles.rowGroup}>
              <JobDetail label="Description" value={job.description} />
              <JobDetail label="Location" value={job.location} />
              <JobDetail label="Work Hours" value={job.work_hours} />
            </View>

            <View style={styles.rowGroup}>
              <JobDetail label="Gender" value={job.gender.toUpperCase()} />
              <JobDetail
                label="Start Date"
                value={new Date(
                  job.start_date && job.start_date
                ).toLocaleDateString()}
              />
              <JobDetail
                label="Job Date"
                value={new Date(
                  job.start_date && job.job_date
                ).toLocaleDateString()}
              />
            </View>
            <View style={styles.rowGroup}>
              <JobDetail label="Openings" value={job.amount_of_seekers} />
            </View>

            <View style={styles.jobFooter}>
              <Text style={styles.rating}>
                {job.rating && renderStars(job.rating)}
                {job.rating ? job.rating.toFixed(1) : "No ratings"}
              </Text>

              <TouchableOpacity
                onPress={() => handleChatWithUS(job.poster_id, job.job_id)}
                style={styles.chatBtn}
              >
                <Text style={styles.chatText}>Chat With Us</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => applyJob(job.title)}
                style={styles.applyBtn}
              >
                <Text style={styles.applyText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.navItem}
            onPress={() => handleNavPress(item.id)}
            activeOpacity={0.7}
          >
            <Feather
              name={item.icon as any}
              size={20}
              color={activeNav === item.id ? "#FF8C42" : "#999"}
              style={styles.navIcon}
            />
            <Text
              style={[
                styles.navText,
                activeNav === item.id && styles.navTextActive,
              ]}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

type JobDetailProps = {
  label: string;
  value: string;
};

const JobDetail: React.FC<JobDetailProps> = ({ label, value }) => (
  <View style={styles.detail}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    maxHeight: 100,
    backgroundColor: "white",
  },
  sendButton: {
    backgroundColor: "#FF8C42",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  noMessages: {
    color: "#666",
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
  },
  modalOverlay: {
    display: "contents",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: "#FF8C42",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  container: {
    flex: 1,
    backgroundColor: "#FF8C42",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#FF8C42",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    fontSize: 22,
    color: "white",
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "white",
    opacity: 0.9,
  },
  newPostBtn: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  newPostText: {
    fontSize: 12,
    color: "white",
  },
  jobsContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  jobCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    elevation: 5,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  badge: {
    fontSize: 10,
    backgroundColor: "#E8F5E8",
    color: "#4CAF50",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  rate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF8C42",
  },
  rowGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  detail: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: "#666",
    textTransform: "uppercase",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  jobFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rating: {
    fontSize: 14,
    color: "#FFD700",
  },
  applyBtn: {
    backgroundColor: "#FF8C42",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  chatBtn: {
    backgroundColor: "#FF8C42",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  applyText: {
    color: "white",
    fontWeight: "bold",
  },
  chatText: {
    color: "white",
    fontWeight: "bold",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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
  navItem: {
    alignItems: "center",
    flex: 1,
  },
  navIcon: {
    marginBottom: 4,
  },
  navText: {
    fontSize: 10,
    fontWeight: "500",
    color: "#999",
  },
  navTextActive: {
    color: "#FF8C42",
  },
});

export default JobsList;
