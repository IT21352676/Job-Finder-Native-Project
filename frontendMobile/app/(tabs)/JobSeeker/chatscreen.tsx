import { Link } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface Props {
  socket: any;
  roomId: string;
  userId: any;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const ChatScreen = ({ socket, roomId, userId, setModalVisible }: Props) => {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<
    {
      message: string;
      senderId?: number;
      roomId?: string;
      userType: string;
      senderSocketId: string;
    }[]
  >([]);

  const handleSendMessage = () => {
    socket.emit("send_message", {
      roomId: roomId,
      senderId: userId,
      userType: "Job Seeker",
      message: message,
    });
    setMessage("");
  };

  useEffect(() => {
    const handleReceiveMessage = (data: any) => {
      console.log("📩 Message received:", data);
      console.log("Sender:", socket.id);
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF8C42" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setModalVisible(false)}
        >
          <Link href="/(tabs)/JobSeeker/joblist">
            <Icon name="arrow-back" size={24} color="white" />
          </Link>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat with Us</Text>
      </View>

      {/* Messages Area */}
      <View style={styles.messagesContainer}>
        {messages ? (
          messages.map((m) =>
            m.userType === "Job Seeker" ? (
              <Text style={styles.outgoingMessage}>{m.message}</Text>
            ) : (
              m.userType === "Job Poster" && (
                <Text style={styles.incomingMessage}>{m.message}</Text>
              )
            )
          )
        ) : (
          <Text style={styles.noMessages}>No Messages</Text>
        )}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outgoingMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#FF8C42",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
    maxWidth: "70%",
  },
  incomingMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e0e0e0",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
    maxWidth: "70%",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#FF8C42",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  messagesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    overflow: "scroll",
  },
  noMessages: {
    color: "#666",
    fontSize: 16,
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
});

export default ChatScreen;
