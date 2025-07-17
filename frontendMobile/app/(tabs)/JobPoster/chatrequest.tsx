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
import ChatScreen from "./chatscreen";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}
interface Props {
  user: User;
  socket: any;
}
const ChatRequestScreen = ({ user, socket }: Props) => {
  // TODO: Replace with dynamic userId (e.g., from auth context or AsyncStorage)
  const userId = user?.id;

  const roomIdRef = useRef("");
  const [modalVisible, setModalVisible] = useState(false);

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

  const listenChatNotification = () => {
    socket.on("new_chat_notification", (data: any) => {
      console.log("Received Notification:", data);
      setTimeout(() => {
        Toast.show({
          type: "chat_notification",
          text1: "New Chat Request",
          text2: "Tap to open the chat room",
          onPress: () => {
            roomIdRef.current = data.roomId;
            handleAcceptChatRequest(
              data.notificationId,
              data.seekerSocketId,
              data.posterSocketId,
              data.roomId
            );
            socket.emit("join_room", data.roomId);
            setModalVisible(true);
          },
          position: "top",
        });
      }, 2000);
    });
  };

  useEffect(() => {
    listenChatNotification();
  }, []);

  const handleAcceptChatRequest = async (
    notificationId: number,
    seekerSocketId: string,
    posterSocketId: string,
    roomId: string
  ) => {
    try {
      const res = await fetch(
        `http://localhost:8000/mobile/secured/notification/${notificationId}/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            seekerSocketId,
            posterSocketId,
            roomId,
          }),
        }
      );
      const data = await res.json();
      console.log("Chat accepted:", data);
    } catch (err) {
      console.error("Error accepting chat request:", err);
    }
  };

  return (
    <View style={{ flex: 1 }}>
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
      <Toast config={toastConfig} />
    </View>
  );
};
const styles = StyleSheet.create({
  modalOverlay: {
    display: "contents",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatRequestScreen;
