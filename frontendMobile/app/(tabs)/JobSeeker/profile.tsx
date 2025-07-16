import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';

const ProfileScreen = () => {
  const user = {
    name: 'Chenura Silva',
    email: 'chenura@example.com',
    location: 'Colombo, Sri Lanka',
    avatar: 'https://media.licdn.com/dms/image/v2/D5603AQFxEGz9TZHpng/profile-displayphoto-shrink_800_800/B56Zc1UO8ZG0Ac-/0/1748946188120?e=1757548800&v=beta&t=HsAhTqxaQ2zi7d53aFuMrPhRwrYJQbJFlWgKqdSRnMA',
    resumeUploaded: true,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF8C42" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity>
            <Link href="/(tabs)/JobSeeker/editprofile"><Feather name="edit-2" size={20} color="white" /></Link>
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileCard}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <View style={styles.locationRow}>
            <Feather name="map-pin" size={16} color="#666" />
            <Text style={styles.location}>{user.location}</Text>
          </View>
        </View>

        {/* Resume */}
        <View style={styles.resumeSection}>
          <Text style={styles.sectionTitle}>Resume</Text>
          {user.resumeUploaded ? (
            <TouchableOpacity style={styles.resumeButton}>
              <Feather name="file-text" size={16} color="#4CAF50" />
              <Text style={styles.resumeText}>View Resume</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.resumeButton}>
              <Feather name="upload" size={16} color="#FF8C42" />
              <Text style={styles.resumeText}>Upload Resume</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Settings */}
        <View style={styles.settingsSection}>
          <TouchableOpacity style={styles.settingItem}>
            <Feather name="settings" size={18} color="#333" />
            <Text style={styles.settingText}>Account Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Feather name="lock" size={18} color="#333" />
            <Text style={styles.settingText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Feather name="help-circle" size={18} color="#333" />
            <Text style={styles.settingText}>Help & Support</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <Feather name="home" size={18} color="white" />
          <Link href="/(tabs)/JobSeeker/homepage"><Text style={styles.logoutText}>Home</Text></Link>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  scrollContent: { padding: 20 },
  header: {
    backgroundColor: '#FF8C42',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  profileCard: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    elevation: 2,
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  email: { fontSize: 14, color: '#666', marginTop: 4 },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  location: { marginLeft: 5, fontSize: 14, color: '#666' },
  resumeSection: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  resumeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 10,
  },
  resumeText: { marginLeft: 8, fontSize: 14, color: '#444' },
  settingsSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 30,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
  settingText: { marginLeft: 12, fontSize: 14, color: '#333' },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FF8C42',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: { color: 'white', fontWeight: 'bold', fontSize: 14, marginLeft: 8 },
});

export default ProfileScreen;
