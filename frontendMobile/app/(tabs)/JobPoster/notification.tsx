import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";

import io from "socket.io-client";
import Toast, { BaseToast } from "react-native-toast-message";
import { TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

type Notification = {
  id: number;
  type: string;
  from_user_id: number;
  to_user_id: number;
  job_id: number;
  status: "pending" | "accepted" | "rejected";
  is_read: boolean;
  created_at: string;
};

const socket = io("http://localhost:8001");

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const roomIdRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState<
    { message: string; senderId?: number; roomId?: string }[]
  >([]);

  // TODO: Replace with dynamic userId (e.g., from auth context or AsyncStorage)
  const userId = 1; // poster ID

  useEffect(() => {
    listenChatNotification();
  }, []);

  const listenChatNotification = () => {
    socket.emit("register", userId);

    socket.on("new_notification", (data) => {
      console.log("Received Notification:", data.notificationId);
      setTimeout(() => {
        Toast.show({
          type: "chat_notification", // 👈 matches the config key
          text1: "New Chat Request",
          text2: "Tap to open the chat room",
          onPress: () => {
            roomIdRef.current = data.notificationId;
            handleAccept(data.notificationId, data.socketId);
            console.log(data.notificationId);
            setModalVisible(true);
            socket.emit("join_room", data.notificationId);

            // ✅ Navigate to ChatScreen here
            //navigation.navigate('ChatScreen', { roomId: data.roomId });
          },
          position: "top",
          // visibilityTime: 5000,
        });
      }, 2000);
    });
  };

  useEffect(() => {
    const handleMessage = (data: any) => {
      console.log("📩 Message received:", data);
      console.log("Sender:", socket.id);
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receive_message", handleMessage);

    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, []);

  const toastConfig = {
    chat_notification: ({ text1, text2, onPress, ...rest }: any) => (
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
              Accept & Open Chat
            </Text>
          </TouchableOpacity>
        )}
      />
    ),
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleSendMessage = () => {
    socket.emit("send_message", {
      roomId: roomIdRef.current,
      senderId: userId,
      message: message,
    });
    setMessage("");
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/mobile/secured/notification/chat-request/${userId}`
      );
      console.log(res.body);
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (notificationId: number, socketId: string) => {
    try {
      const res = await fetch(
        `http://localhost:8000/mobile/secured/notification/${notificationId}/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            socketId,
          }),
        }
      );
      const data = await res.json();
      console.log("Chat accepted:", data);
      // Optionally reload list
      fetchNotifications();
    } catch (err) {
      console.error("Error accepting chat request:", err);
    }
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.text}>
        Chat request from user #{item.from_user_id}
      </Text>
      {item.status === "pending" ? (
        <TouchableOpacity
          style={styles.acceptButton}
          // onPress={() => handleAccept(item.id)}
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.acceptedText}>Accepted</Text>
      )}
    </View>
  );

  if (loading) {
    return (
      <ActivityIndicator
        style={{ marginTop: 40 }}
        size="large"
        color="#FF8C42"
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)} // Android back button
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.noMessages}>
              {messages.map((i) => i.message)}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name="arrow-downward" size={24} color="orange" />
              <Text>Close</Text>
            </TouchableOpacity>
          </View>

          {/* Message Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Write your message"
              placeholderTextColor="#999"
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => handleSendMessage()}
            >
              <Icon name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        ListEmptyComponent={<Text style={styles.empty}>No notifications</Text>}
      />

      <Toast config={toastConfig} />
    </View>
  );
};

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
    flex: 1,
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
    padding: 16,
  },
  notificationItem: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  acceptButton: {
    backgroundColor: "#FF8C42",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },

  acceptedText: {
    color: "green",
    fontWeight: "bold",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#666",
  },
});

export default NotificationScreen;
