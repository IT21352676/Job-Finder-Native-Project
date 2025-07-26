import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  StatusBar,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatRequestScreen from "./chatrequest";
import io from "socket.io-client";
import Toast, { BaseToast } from "react-native-toast-message";

export const socket = io("http://localhost:8001");

const FETCH_DASHBOARD_APP_DATA =
  "http://localhost:8000/mobile/secured/dashboard/applications/";

const FETCH_DASHBOARD_JOB_DATA =
  "http://localhost:8000/mobile/secured/dashboard/jobs/";

interface NavigationProp {
  navigate: (screen: string) => void;
  goBack: () => void;
}

interface JobPosterDashboardProps {
  navigation: NavigationProp;
}

const JobPosterDashboard: React.FC<JobPosterDashboardProps> = ({
  navigation,
}) => {
  const [activeNav, setActiveNav] = useState("Home");
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Welcome to Job Poster Dashboard! How can I help you manage your job postings?",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleNavPress = (navItem: string) => {
    setActiveNav(navItem);
    if (navItem === "Jobs") {
      navigation.navigate("JobsScreen");
    } else if (navItem === "Wallet") {
      // navigation.navigate('WalletScreen');
    } else if (navItem === "Profile") {
      navigation.navigate("ProfileScreen");
    }
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "user", text: inputText },
    ]);
    setInputText("");
    // Simulated bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "Thanks for your message! I will assist you with your job posting needs shortly.",
        },
      ]);
    }, 800);
  };
  const toastConfig = {
    job_apply_notification: ({ text1, text2, onPress, ...rest }: any) => (
      <BaseToast
        {...rest}
        contentContainerStyle={{ paddingRight: 12 }}
        text1={text1}
        text2={text2}
      />
    ),
  };

  const navItems = [
    { id: "Home", icon: "home" as const, text: "Home" },
    { id: "Jobs", icon: "briefcase" as const, text: "Jobs" },
    { id: "Wallet", icon: "credit-card" as const, text: "Wallet" },
    { id: "Profile", icon: "user" as const, text: "Profile" },
  ];

  interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
  }
  const [userData, setUserData] = useState<User>({} as User);
  socket.emit("register", userData.id, "Job Poster");

  const fetchStoredData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");

      if (token && userJson) {
        const user = JSON.parse(userJson);
        console.log("Auto-login user:", user.firstname);
        console.log("Token:", token);

        setUserData(user);
      } else {
        console.log("Auth data not found");
      }
    } catch (error) {
      console.error("Error retrieving login data:", error);
    }
  }, []);

  useEffect(() => {
    fetchStoredData();
  }, [fetchStoredData]);

  const [applications, setApplications] = useState<number | null>(null);

  useEffect(() => {
    const fetchDashboardDataEarnings = async () => {
      const response = await fetch(
        FETCH_DASHBOARD_APP_DATA + `${userData?.id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        alert("Something went wrong");
        return;
      }

      const result = await response.json(); // result: array of objects

      if (!result || result.length === 0) {
        setApplications(0);
      } else {
        const applicationValue = parseFloat(result[0].count || "0");
        setApplications(applicationValue);
      }

      console.log(result);
    };

    fetchDashboardDataEarnings();
  }, [userData?.id]);

  const [jobs, setjobs] = useState<number | null>(null);

  useEffect(() => {
    const fetchDashboardDataEarnings = async () => {
      const response = await fetch(
        FETCH_DASHBOARD_JOB_DATA + `${userData?.id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        alert("Something went wrong");
        return;
      }

      const result = await response.json(); // result: array of objects

      if (!result || result.length === 0) {
        setjobs(0);
      } else {
        const applicationValue = parseFloat(result[0].count || "0");
        setjobs(applicationValue);
      }

      console.log(result);
    };

    fetchDashboardDataEarnings();
  }, [userData?.id]);

  const listenJobApplyNotification = () => {
    socket.on("new_job_apply", (data: any) => {
      console.log("Received Notification:", data);
      setTimeout(() => {
        Toast.show({
          type: "job_apply_notification",
          text1: `New job application`,
          text2: `User ${data.seekerId} applied for job ${data.jobId}`,

          position: "top",
        });
      }, 2000);
    });
  };

  useEffect(() => {
    listenJobApplyNotification();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF8C42" barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Hello {userData?.firstname}!</Text>
            <Text style={styles.userName}>Good day to you</Text>
          </View>
          <View style={styles.notificationIcons}>
            <TouchableOpacity style={styles.notificationIcon}>
              <Feather name="bell" size={16} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationIcon}>
              <Feather name="settings" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Active Jobs</Text>
            <Text style={styles.statAmount}>{jobs}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Applications</Text>
            <Text style={styles.statAmount}>{applications}</Text>
          </View>
        </View>

        {/* Menu Grid */}
        <View style={styles.menuGrid}>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
            <Feather name="plus-circle" size={24} color="white" />
            <Link href="/(tabs)/JobPoster/jobpost">
              <Text style={styles.menuText}>POST NEW JOB</Text>
            </Link>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
            <Feather name="eye" size={24} color="white" />
            <Link href="/(tabs)/JobPoster/viewjobs">
              <Text style={styles.menuText}>VIEW JOBS</Text>
            </Link>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
            <Feather name="message-circle" size={24} color="white" />
            <Link href="/(tabs)/JobPoster/viewapplicant">
              <Text style={styles.menuText}>VIEW APPLICANTS</Text>
            </Link>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
            <Feather name="message-circle" size={24} color="white" />
            <Link href="/(tabs)/JobPoster/viewreviews">
              <Text style={styles.menuText}>VIEW REVIEWS</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating AI Bot */}
      {/* <TouchableOpacity
        style={styles.floatingBot}
        onPress={() => setChatVisible(true)}
        activeOpacity={0.8}
      >
        <Feather name="message-circle" size={26} color="white" />
      </TouchableOpacity> */}

      {/* Chat Modal */}
      <Modal
        visible={chatVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setChatVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.chatModal}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatTitle}>AI Assistant</Text>
              <TouchableOpacity onPress={() => setChatVisible(false)}>
                <Feather name="x" size={20} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.chatMessages}>
              {messages.map((msg) => (
                <View
                  key={msg.id}
                  style={[
                    styles.chatBubble,
                    msg.sender === "bot" ? styles.botBubble : styles.userBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.chatText,
                      msg.sender === "bot" ? styles.botText : styles.userText,
                    ]}
                  >
                    {msg.text}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              style={styles.inputRow}
            >
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                placeholder="Type your message"
                style={styles.textInput}
              />
              <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                <Feather name="send" size={20} color="white" />
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
      <View style={styles.toastWrapper}>
        <ChatRequestScreen user={userData} socket={socket} />
      </View>

      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

export default JobPosterDashboard;

const styles = StyleSheet.create({
  toastWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    elevation: 9999,
    pointerEvents: "box-none",
  },
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  scrollContent: { paddingBottom: 90 },
  header: {
    backgroundColor: "#FF8C42",
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greetingContainer: { flex: 1 },
  greeting: { fontSize: 18, fontWeight: "600", color: "white" },
  userName: { fontSize: 16, color: "rgba(255, 255, 255, 0.9)", marginTop: 2 },
  notificationIcons: { flexDirection: "row", gap: 10 },
  notificationIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  statsContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
    gap: 10,
  },
  statCard: {
    backgroundColor: "#4CAF50",
    flex: 1,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    elevation: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 5,
  },
  statAmount: { fontSize: 24, fontWeight: "bold", color: "white" },
  menuGrid: {
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  menuItem: {
    backgroundColor: "#FF8C42",
    borderRadius: 15,
    padding: 20,
    width: "30%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginRight: "5%",
    elevation: 4,
  },
  menuText: {
    fontSize: 9,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    marginTop: 8,
  },
  quickActionsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  quickActions: {
    flexDirection: "row",
    gap: 15,
  },
  quickActionButton: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    flex: 1,
    elevation: 2,
  },
  quickActionText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
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
  navItem: { alignItems: "center", flex: 1 },
  navIcon: { marginBottom: 4 },
  navText: { fontSize: 10, fontWeight: "500", color: "#999" },
  navTextActive: { color: "#FF8C42" },
  floatingBot: {
    position: "absolute",
    bottom: 85,
    right: 24,
    backgroundColor: "#4CAF50",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 12,
    zIndex: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  chatModal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    padding: 15,
  },
  chatText: {
    fontSize: 14,
    lineHeight: 20,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  chatTitle: { fontSize: 16, fontWeight: "bold" },
  chatMessages: { maxHeight: 250 },
  chatBubble: {
    padding: 10,
    borderRadius: 12,
    marginVertical: 4,
    maxWidth: "80%",
  },
  botBubble: {
    backgroundColor: "#E8F5E9",
    alignSelf: "flex-start",
  },
  userBubble: {
    backgroundColor: "#FFECB3",
    alignSelf: "flex-end",
  },
  botText: { color: "#333" },
  userText: { color: "#333" },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingBottom: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 20,
  },
});
