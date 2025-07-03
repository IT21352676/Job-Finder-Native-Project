import React, { useState } from 'react';
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
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const HomeDashboard = () => {
  const [activeNav, setActiveNav] = useState('Home');
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Welcome to Jobs! How can I help you?' },
  ]);
  const [inputText, setInputText] = useState('');

  const navigate = (section: string) => {
    Alert.alert('Navigation', `Navigating to ${section.toUpperCase()} section`);
  };

  const handleNavPress = (navItem: string) => {
    setActiveNav(navItem);
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text: inputText }]);
    setInputText('');
    // Simulated bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: 'Thanks for your message! I’ll assist you shortly.' },
      ]);
    }, 800);
  };

  const menuItems = [
    { id: 'jobs', icon: 'briefcase', text: 'JOBS' },
    { id: 'customers', icon: 'users', text: 'CUSTOMERS' },
    { id: 'products', icon: 'package', text: 'PRODUCTS' },
    { id: 'wallet', icon: 'credit-card', text: 'MY WALLET' },
    { id: 'chat', icon: 'message-circle', text: 'CHAT WITH US' },
    { id: 'profile', icon: 'user', text: 'MY PROFILE' },
  ];

  const navItems = [
    { id: 'Home', icon: 'home', text: 'Home' },
    { id: 'Jobs', icon: 'briefcase', text: 'Jobs' },
    { id: 'Wallet', icon: 'credit-card', text: 'Wallet' },
    { id: 'Profile', icon: 'user', text: 'Profile' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF8C42" barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Hello Ramel</Text>
            <Text style={styles.userName}>Good Afternoon</Text>
          </View>
          <View style={styles.notificationIcons}>
            <TouchableOpacity style={styles.notificationIcon}>
              <Feather name="bell" size={16} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationIcon}>
              <Feather name="mail" size={16} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationIcon}>
              <Feather name="settings" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>Rs. 25,000</Text>
        </View>

        {/* Menu Grid */}
        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => navigate(item.id)}
              activeOpacity={0.8}
            >
              <Feather name={item.icon as any} size={24} color="white" />
              <Text style={styles.menuText}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Floating AI Bot */}
      <TouchableOpacity
        style={styles.floatingBot}
        onPress={() => setChatVisible(true)}
        activeOpacity={0.8}
      >
        <Feather name="message-square" size={26} color="white" />
      </TouchableOpacity>

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
                    msg.sender === 'bot' ? styles.botBubble : styles.userBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.chatText,
                      msg.sender === 'bot' ? styles.botText : styles.userText,
                    ]}
                  >
                    {msg.text}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
              color={activeNav === item.id ? '#FF8C42' : '#999'}
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
    </SafeAreaView>
  );
};

export default HomeDashboard;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  scrollContent: { paddingBottom: 90 },
  header: {
    backgroundColor: '#FF8C42',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingContainer: { flex: 1 },
  greeting: { fontSize: 18, fontWeight: '600', color: 'white' },
  userName: { fontSize: 16, color: 'rgba(255, 255, 255, 0.9)', marginTop: 2 },
  notificationIcons: { flexDirection: 'row', gap: 10 },
  notificationIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  balanceCard: {
    backgroundColor: '#4CAF50',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 8,
  },
  balanceLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 5,
  },
  balanceAmount: { fontSize: 32, fontWeight: 'bold', color: 'white' },
  menuGrid: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    backgroundColor: '#FF8C42',
    borderRadius: 15,
    padding: 20,
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  menuText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginTop: 8,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 10,
  },
  navItem: { alignItems: 'center', flex: 1 },
  navIcon: { marginBottom: 4 },
  navText: { fontSize: 10, fontWeight: '500', color: '#999' },
  navTextActive: { color: '#FF8C42' },
  floatingBot: {
    position: 'absolute',
    bottom: 85,
    right: 24,
    backgroundColor: '#4CAF50',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    zIndex: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  chatModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    padding: 15,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  chatTitle: { fontSize: 16, fontWeight: 'bold' },
  chatMessages: { maxHeight: 250 },
  chatBubble: {
    padding: 10,
    borderRadius: 12,
    marginVertical: 4,
    maxWidth: '80%',
  },
  botBubble: {
    backgroundColor: '#E8F5E9',
    alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: '#FFECB3',
    alignSelf: 'flex-end',
  },
  botText: { color: '#333' },
  userText: { color: '#333' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 20,
  },
});
