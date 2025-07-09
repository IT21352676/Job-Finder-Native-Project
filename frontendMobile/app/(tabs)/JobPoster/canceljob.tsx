import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

interface Job {
  id: number;
  title: string;
  description: string;
}

interface JobCardProps {
  job: Job;
}

const CancelDeleteJobsScreen = () => {
  const jobs: Job[] = [
    {
      id: 1,
      title: 'Job 1',
      description: 'Description of Job 1',
    },
    {
      id: 2,
      title: 'Job 2',
      description: 'Description of Job 2',
    },
    {
      id: 3,
      title: 'Job 3',
      description: 'Description of Job 3',
    },
    {
      id: 4,
      title: 'Job 4',
      description: 'Description of Job 4',
    },
    {
      id: 5,
      title: 'Job 5',
      description: 'Description of Job 5',
    },
  ];

  const handleDelete = (jobId: number): void => {
    console.log('Delete job:', jobId);
  };

  const JobCard: React.FC<JobCardProps> = ({ job }) => (
    <View style={styles.jobCard}>
      <View style={styles.jobInfo}>
        <Text style={styles.jobTitle}>{job.title}</Text>
        <Text style={styles.jobDescription}>{job.description}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(job.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Cancel/Delete the Jobs</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  jobDescription: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    backgroundColor: '#FF4444',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 12,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CancelDeleteJobsScreen;