import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Job {
  id: number;
  hotelName: string;
  address: string;
  contactInfo: string;
  phone: string;
  schedule: string;
  time: string;
  jobDetails: string;
  duration: string;
}

interface JobCardProps {
  job: Job;
}

const ViewPostedJobsScreen = () => {
  const jobs: Job[] = [
    {
      id: 1,
      hotelName: 'Hotel A',
      address: '123 Main Street',
      contactInfo: 'contact@example.com',
      phone: '123-456-7890',
      schedule: '2024-08-28',
      time: '10:00 AM',
      jobDetails: 'Room cleaning and maintenance',
      duration: '2048',
    },
    {
      id: 2,
      hotelName: 'Hotel B',
      address: '456 Oak Avenue',
      contactInfo: 'info@hotelb.com',
      phone: '987-654-3210',
      schedule: '2024-08-29',
      time: '2:00 PM',
      jobDetails: 'Front desk assistance',
      duration: '1024',
    },
  ];

  const JobCard: React.FC<JobCardProps> = ({ job }) => (
    <View style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{job.hotelName}</Text>
          <Text style={styles.jobAddress}>{job.address}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Icon name="edit" size={20} color="#FF8C42" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.jobDetails}>
        <Text style={styles.detailLabel}>Contact:</Text>
        <Text style={styles.detailValue}>{job.contactInfo}</Text>
        
        <Text style={styles.detailLabel}>Phone:</Text>
        <Text style={styles.detailValue}>{job.phone}</Text>
        
        <Text style={styles.detailLabel}>Schedule:</Text>
        <Text style={styles.detailValue}>{job.schedule}</Text>
        
        <Text style={styles.detailLabel}>Time:</Text>
        <Text style={styles.detailValue}>{job.time}</Text>
        
        <Text style={styles.detailLabel}>Job Details:</Text>
        <Text style={styles.detailValue}>{job.jobDetails}</Text>
        
        <Text style={styles.detailLabel}>Duration:</Text>
        <Text style={styles.detailValue}>{job.duration}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>View posted jobs</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  scrollContainer: {
    padding: 16,
  },
  jobCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  jobAddress: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    padding: 4,
  },
  jobDetails: {
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
});

export default ViewPostedJobsScreen;