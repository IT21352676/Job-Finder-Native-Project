import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const jobs = [
  {
    title: 'Stock Keeper',
    rate: 'Rs.2200',
    location: 'Galle',
    hours: '1',
    date: '2024-06-01',
    startTime: '8:10 AM',
    totalHours: '15:00:00',
    rating: 5.0,
  },
  {
    title: 'Waiter',
    rate: 'Rs.1800',
    location: 'Colombo',
    hours: '2',
    date: '2024-06-12',
    startTime: '10:00 AM',
    totalHours: '8:00:00',
    rating: 4.2,
  },
  {
    title: 'Kitchen Helper',
    rate: 'Rs.1500',
    location: 'Kandy',
    hours: '5',
    date: '2024-07-01',
    startTime: '6:00 AM',
    totalHours: '12:00:00',
    rating: 4.0,
  },
];

const JobsList = () => {
  const [activeNav, setActiveNav] = useState('Jobs');

  const goBack = () => Alert.alert('Navigation', 'Go back');

  const newPosting = () => Alert.alert('Action', 'Create new job posting');

  const applyJob = (jobTitle: string) =>
    Alert.alert('Apply', `Applied for ${jobTitle}`);

  const handleNavPress = (navItem: string) => {
    setActiveNav(navItem);
    Alert.alert('Navigation', `Go to ${navItem}`);
  };

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const stars = Array.from({ length: 5 }, (_, i) => (i < full ? '★' : '☆'));
    return stars.join(' ');
  };

  const navItems = [
    { id: 'Home', icon: 'home', text: 'Home' },
    { id: 'Jobs', icon: 'briefcase', text: 'Jobs' },
    { id: 'Wallet', icon: 'credit-card', text: 'Wallet' },
    { id: 'Profile', icon: 'user', text: 'Profile' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF8C42" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn} onPress={goBack}>
            <Feather name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Jobs</Text>
            <Text style={styles.headerSubtitle}>Find your next job</Text>
          </View>
        </View>
        <TouchableOpacity onPress={newPosting} style={styles.newPostBtn}>
          <Text style={styles.newPostText}>New Posting</Text>
        </TouchableOpacity>
      </View>

      {/* Jobs List */}
      <ScrollView contentContainerStyle={styles.jobsContainer}>
        {jobs.map((job, index) => (
          <View key={index} style={styles.jobCard}>
            <View style={styles.jobHeader}>
              <View>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.badge}>New Posting</Text>
              </View>
              <Text style={styles.rate}>{job.rate}</Text>
            </View>

            <View style={styles.rowGroup}>
              <JobDetail label="Hourly Rate" value={job.rate} />
              <JobDetail label="Location" value={job.location} />
              <JobDetail label="Work Hours" value={job.hours} />
            </View>

            <View style={styles.rowGroup}>
              <JobDetail label="Job Date" value={job.date} />
              <JobDetail label="Start Time" value={job.startTime} />
              <JobDetail label="Total Hours" value={job.totalHours} />
            </View>

            <View style={styles.jobFooter}>
              <Text style={styles.rating}>
                {renderStars(job.rating)} ({job.rating.toFixed(1)})
              </Text>
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
  container: {
    flex: 1,
    backgroundColor: '#FF8C42',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FF8C42',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    fontSize: 22,
    color: 'white',
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  newPostBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  newPostText: {
    fontSize: 12,
    color: 'white',
  },
  jobsContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  jobCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    elevation: 5,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  badge: {
    fontSize: 10,
    backgroundColor: '#E8F5E8',
    color: '#4CAF50',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  rate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8C42',
  },
  rowGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detail: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  jobFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rating: {
    fontSize: 14,
    color: '#FFD700',
  },
  applyBtn: {
    backgroundColor: '#FF8C42',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  applyText: {
    color: 'white',
    fontWeight: 'bold',
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
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navIcon: {
    marginBottom: 4,
  },
  navText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#999',
  },
  navTextActive: {
    color: '#FF8C42',
  },
});

export default JobsList;
