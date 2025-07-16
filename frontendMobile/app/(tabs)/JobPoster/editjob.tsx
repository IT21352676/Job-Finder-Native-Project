import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const EditJobScreen = () => {
  const [hotelName, setHotelName] = useState('Hotel A');
  const [address, setAddress] = useState('123 Main Street');
  const [contactInfo, setContactInfo] = useState('contact@example.com');
  const [phone, setPhone] = useState('123-456-7890');
  const [schedule, setSchedule] = useState('2024-08-28');
  const [time, setTime] = useState('10:00 AM');
  const [jobDetails, setJobDetails] = useState('');
  const [duration, setDuration] = useState('2048');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Edit Job</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Hotel Name</Text>
          <TextInput
            style={styles.input}
            value={hotelName}
            onChangeText={setHotelName}
            placeholder="Enter hotel name"
          />

          <Text style={styles.label}>Address Location</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter address"
          />

          <Text style={styles.label}>Contact Information</Text>
          <TextInput
            style={styles.input}
            value={contactInfo}
            onChangeText={setContactInfo}
            placeholder="Enter contact information"
          />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Schedule</Text>
          <TextInput
            style={styles.input}
            value={schedule}
            onChangeText={setSchedule}
            placeholder="Enter schedule date"
          />

          <Text style={styles.label}>Time</Text>
          <TextInput
            style={styles.input}
            value={time}
            onChangeText={setTime}
            placeholder="Enter time"
          />

          <Text style={styles.label}>Job Details</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={jobDetails}
            onChangeText={setJobDetails}
            placeholder="Enter job details"
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Duration</Text>
          <TextInput
            style={styles.input}
            value={duration}
            onChangeText={setDuration}
            placeholder="Enter duration"
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.saveButton}>
           <Link href="/(tabs)/JobPoster/viewjobs"><Text style={styles.saveButtonText}>Save Changes</Text></Link> 
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    backgroundColor: '#FF8C42',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: 'white',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#FF8C42',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default EditJobScreen;