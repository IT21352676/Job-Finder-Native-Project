import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Modal,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';

interface NavigationProp {
  navigate: (screen: string) => void;
  goBack: () => void;
}

interface CompletedJobsProps {
  navigation: NavigationProp;
}

const CompletedJobsScreen: React.FC<CompletedJobsProps> = ({ navigation }) => {
  const [activeNav, setActiveNav] = useState('Jobs');
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const completedJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'Tech Innovations Ltd',
      location: 'Colombo, Sri Lanka',
      salary: 'Rs. 120,000 - 150,000',
      appliedDate: '2024-06-15',
      completedDate: '2024-07-01',
      status: 'Approved',
      type: 'Full-time',
      description: 'Lead development of enterprise-level React applications with modern stack.',
      feedback: 'Congratulations! Your application has been approved. Please report to HR on Monday.',
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      company: 'Creative Solutions',
      location: 'Kandy, Sri Lanka',
      salary: 'Rs. 70,000 - 95,000',
      appliedDate: '2024-06-10',
      completedDate: '2024-06-25',
      status: 'Rejected',
      type: 'Full-time',
      description: 'Design user-friendly interfaces for web and mobile applications.',
      feedback: 'Thank you for your interest. We decided to proceed with another candidate who better matches our requirements.',
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'WebTech Solutions',
      location: 'Gampaha, Sri Lanka',
      salary: 'Rs. 100,000 - 130,000',
      appliedDate: '2024-06-05',
      completedDate: '2024-06-28',
      status: 'Approved',
      type: 'Remote',
      description: 'Develop and maintain full-stack web applications using modern technologies.',
      feedback: 'Welcome to the team! Your start date is July 15th. HR will contact you with onboarding details.',
    },
    {
      id: 4,
      title: 'Marketing Specialist',
      company: 'Digital Marketing Pro',
      location: 'Galle, Sri Lanka',
      salary: 'Rs. 65,000 - 80,000',
      appliedDate: '2024-05-28',
      completedDate: '2024-06-20',
      status: 'Rejected',
      type: 'Part-time',
      description: 'Create and execute digital marketing campaigns across multiple platforms.',
      feedback: 'We were impressed with your portfolio, but chose someone with more experience in B2B marketing.',
    },
    {
      id: 5,
      title: 'Data Scientist',
      company: 'Analytics Hub',
      location: 'Colombo, Sri Lanka',
      salary: 'Rs. 110,000 - 140,000',
      appliedDate: '2024-05-20',
      completedDate: '2024-06-18',
      status: 'Approved',
      type: 'Full-time',
      description: 'Analyze complex datasets and build predictive models for business insights.',
      feedback: 'Excellent technical skills demonstrated! Please complete the background check process.',
    },
    {
      id: 6,
      title: 'Mobile App Developer',
      company: 'App Studio',
      location: 'Negombo, Sri Lanka',
      salary: 'Rs. 85,000 - 115,000',
      appliedDate: '2024-05-15',
      completedDate: '2024-06-10',
      status: 'Rejected',
      type: 'Contract',
      description: 'Build native mobile applications for iOS and Android platforms.',
      feedback: 'Your React Native skills are good, but we need someone with native development experience.',
    },
  ];

  const filterOptions = ['All', 'Approved', 'Rejected'];

  const filteredJobs = selectedFilter === 'All' 
    ? completedJobs 
    : completedJobs.filter(job => job.status === selectedFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return '#4CAF50';
      case 'Rejected': return '#F44336';
      default: return '#999';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return 'check-circle';
      case 'Rejected': return 'x-circle';
      default: return 'help-circle';
    }
  };


  const approvedCount = completedJobs.filter(job => job.status === 'Approved').length;
  const rejectedCount = completedJobs.filter(job => job.status === 'Rejected').length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF8C42" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <Link href="/(tabs)/JobSeeker/homepage">
              <Feather name="arrow-left" size={24} color="white" />
            </Link>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Completed Applications</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setFilterVisible(true)}
          >
            <Feather name="filter" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.pendingButton}
            onPress={() => navigation.navigate('PendingJobsScreen')}
          >
            <Feather name="clock" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Statistics Summary */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: '#E8F5E8' }]}>
            <Feather name="check-circle" size={20} color="#4CAF50" />
          </View>
          <Text style={styles.statNumber}>{approvedCount}</Text>
          <Text style={styles.statLabel}>Approved</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: '#FFEBEE' }]}>
            <Feather name="x-circle" size={20} color="#F44336" />
          </View>
          <Text style={styles.statNumber}>{rejectedCount}</Text>
          <Text style={styles.statLabel}>Rejected</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: '#E3F2FD' }]}>
            <Feather name="briefcase" size={20} color="#2196F3" />
          </View>
          <Text style={styles.statNumber}>{completedJobs.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      {/* Current Filter */}
      {selectedFilter !== 'All' && (
        <View style={styles.currentFilter}>
          <Text style={styles.filterText}>Showing: {selectedFilter}</Text>
          <TouchableOpacity onPress={() => setSelectedFilter('All')}>
            <Feather name="x" size={18} color="#FF8C42" />
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {filteredJobs.map((job) => (
          <TouchableOpacity key={job.id} style={styles.jobCard} activeOpacity={0.8}>
            <View style={styles.jobHeader}>
              <View style={styles.jobTitleContainer}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.jobCompany}>{job.company}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(job.status) }]}>
                <Feather name={getStatusIcon(job.status)} size={12} color="white" />
                <Text style={styles.statusText}>{job.status}</Text>
              </View>
            </View>
            
            <View style={styles.jobDetails}>
              <View style={styles.jobDetailItem}>
                <Feather name="map-pin" size={16} color="#666" />
                <Text style={styles.jobDetailText}>{job.location}</Text>
              </View>
              <View style={styles.jobDetailItem}>
                <Feather name="dollar-sign" size={16} color="#666" />
                <Text style={styles.jobDetailText}>{job.salary}</Text>
              </View>
              <View style={styles.jobDetailItem}>
                <Feather name="calendar" size={16} color="#666" />
                <Text style={styles.jobDetailText}>Applied: {job.appliedDate}</Text>
              </View>
              <View style={styles.jobDetailItem}>
                <Feather name="check-square" size={16} color="#666" />
                <Text style={styles.jobDetailText}>Completed: {job.completedDate}</Text>
              </View>
              <View style={styles.jobDetailItem}>
                <Feather name="clock" size={16} color="#666" />
                <Text style={styles.jobDetailText}>{job.type}</Text>
              </View>
            </View>
            
            <Text style={styles.jobDescription}>{job.description}</Text>
            
            {/* Feedback Section */}
            <View style={styles.feedbackContainer}>
              <Text style={styles.feedbackTitle}>Company Feedback:</Text>
              <Text style={[
                styles.feedbackText,
                { color: job.status === 'Approved' ? '#4CAF50' : '#F44336' }
              ]}>
                {job.feedback}
              </Text>
            </View>
            
            <View style={styles.jobActions}>

              {job.status === 'Approved' && (
                <TouchableOpacity style={styles.actionButton}>
                <Feather name="message-circle" size={16} color="#4CAF50" />
                <Text style={styles.actionText}>Message HR</Text>
              </TouchableOpacity>
              )}
              {job.status === 'Rejected' && (
                <TouchableOpacity style={styles.actionButton}>
                <Feather name="message-circle" size={16} color="#4CAF50" />
                <Text style={styles.actionText}>Message HR</Text>
              </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="phone" size={16} color="#2196F3" />
                <Text style={styles.actionText}>Call</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {filteredJobs.length === 0 && (
          <View style={styles.emptyState}>
            <Feather name="briefcase" size={64} color="#ccc" />
            <Text style={styles.emptyStateText}>No completed applications</Text>
            <Text style={styles.emptyStateSubtext}>
              Your completed job applications will appear here
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={filterVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter by Status</Text>
              <TouchableOpacity onPress={() => setFilterVisible(false)}>
                <Feather name="x" size={20} color="#333" />
              </TouchableOpacity>
            </View>
            
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.filterOption,
                  selectedFilter === option && styles.selectedFilterOption
                ]}
                onPress={() => {
                  setSelectedFilter(option);
                  setFilterVisible(false);
                }}
              >
                <View style={styles.filterOptionContent}>
                  <Text style={[
                    styles.filterOptionText,
                    selectedFilter === option && styles.selectedFilterText
                  ]}>
                    {option}
                  </Text>
                  {option !== 'All' && (
                    <Text style={styles.filterOptionCount}>
                      ({option === 'Approved' ? approvedCount : option === 'Rejected' ? rejectedCount : completedJobs.length})
                    </Text>
                  )}
                </View>
                {selectedFilter === option && (
                  <Feather name="check" size={20} color="#FF8C42" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    backgroundColor: '#FF8C42',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: 15 },
  headerRight: { flexDirection: 'row', gap: 10 },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pendingButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  currentFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 15,
    padding: 10,
    backgroundColor: 'rgba(255, 140, 66, 0.1)',
    borderRadius: 8,
  },
  filterText: { color: '#FF8C42', fontWeight: '600' },
  scrollContainer: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  jobCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  jobTitleContainer: { flex: 1 },
  jobTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  jobCompany: { fontSize: 14, color: '#666' },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  statusText: { fontSize: 12, color: 'white', fontWeight: '600' },
  jobDetails: { marginBottom: 15 },
  jobDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  jobDetailText: { fontSize: 14, color: '#666', marginLeft: 8 },
  jobDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  feedbackContainer: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  feedbackTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  feedbackText: {
    fontSize: 13,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  jobActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 5,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    flex: 1,
    justifyContent: 'center',
  },
  contactButton: {
    backgroundColor: '#E8F5E8',
  },
  reapplyButton: {
    backgroundColor: '#E3F2FD',
  },
  actionText: { fontSize: 12, marginLeft: 4, color: '#666' },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 20,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterModal: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedFilterOption: { backgroundColor: 'rgba(255, 140, 66, 0.1)' },
  filterOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterOptionText: { fontSize: 16, color: '#333' },
  filterOptionCount: { fontSize: 14, color: '#666' },
  selectedFilterText: { color: '#FF8C42', fontWeight: '600' },
  bottomNav: {
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
  navText: { fontSize: 10, fontWeight: '500', color: '#999', marginTop: 4 },
  navTextActive: { color: '#FF8C42' },
});

export default CompletedJobsScreen;