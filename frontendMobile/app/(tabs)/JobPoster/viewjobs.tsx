import Feather from '@expo/vector-icons/Feather';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
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
  onDelete: (jobId: number) => void;
}

const ViewPostedJobsScreen = () => {
  const [jobs, setJobs] = useState<Job[]>([
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
  ]);

  const handleDeleteJob = (jobId: number) => {
    const jobToDelete = jobs.find(job => job.id === jobId);
    
    Alert.alert(
      'Delete Job',
      `Are you sure you want to delete the job posting for "${jobToDelete?.hotelName}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
            Alert.alert('Success', 'Job posting deleted successfully');
          },
        },
      ]
    );
  };

  const handleBackPress = () => {
    router.back();
  };

  const JobCard: React.FC<JobCardProps> = ({ job, onDelete }) => (
    <View style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{job.hotelName}</Text>
          <Text style={styles.jobAddress}>{job.address}</Text>
        </View>
        <View style={styles.actionButtons}>
          <Link href="/(tabs)/JobPoster/editjob">
            <TouchableOpacity style={styles.editButton}>
              <Icon name="edit" size={20} color="#FF8C42" />
            </TouchableOpacity>
          </Link>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => onDelete(job.id)}
          >
            <Icon name="delete" size={20} color="#FF4444" />
          </TouchableOpacity>
        </View>
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
        <View style={styles.headerTopRow}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBackPress}
          >
            <Icon name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>View posted jobs</Text>
            <Text style={styles.headerSubtitle}>
              {jobs.length} job{jobs.length !== 1 ? 's' : ''} posted
            </Text>
          </View>
          <Link href="/(tabs)/JobPoster/homepage">
            <TouchableOpacity style={styles.homeButton}>
              <Feather name="home" size={24} color="white" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard key={job.id} job={job} onDelete={handleDeleteJob} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Icon name="work-off" size={64} color="#ccc" />
            <Text style={styles.emptyStateTitle}>No Jobs Posted</Text>
            <Text style={styles.emptyStateText}>
              You haven't posted any jobs yet. Create your first job posting to get started.
            </Text>
            <Link href="/(tabs)/JobPoster/jobpost">
              <TouchableOpacity style={styles.createJobButton}>
                <Text style={styles.createJobButtonText}>Post a Job</Text>
              </TouchableOpacity>
            </Link>
          </View>
        )}
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
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 12,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginTop: 4,
  },
  homeButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginLeft: 12,
  },
  scrollContainer: {
    padding: 16,
    flexGrow: 1,
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
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#FFF5E6',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#FFE6E6',
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  createJobButton: {
    backgroundColor: '#FF8C42',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createJobButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ViewPostedJobsScreen;