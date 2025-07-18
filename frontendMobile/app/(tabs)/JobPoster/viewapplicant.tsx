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
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Link, router } from 'expo-router';

interface Applicant {
  id: number;
  name: string;
  jobTitle: string;
  appliedDate: string;
  status: 'pending' | 'approved' | 'declined';
  experience: string;
  location: string;
  phone: string;
  email: string;
}

const ViewApplicantsScreen = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: 1,
      name: 'John Doe',
      jobTitle: 'Hotel A - Room Cleaning',
      appliedDate: '2024-08-25',
      status: 'pending',
      experience: '3 years',
      location: 'Colombo',
      phone: '+94 77 123 4567',
      email: 'john.doe@email.com',
    },
    {
      id: 2,
      name: 'Jane Smith',
      jobTitle: 'Hotel B - Front Desk',
      appliedDate: '2024-08-26',
      status: 'pending',
      experience: '2 years',
      location: 'Kandy',
      phone: '+94 71 987 6543',
      email: 'jane.smith@email.com',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      jobTitle: 'Hotel A - Room Cleaning',
      appliedDate: '2024-08-27',
      status: 'approved',
      experience: '5 years',
      location: 'Galle',
      phone: '+94 76 456 7890',
      email: 'mike.johnson@email.com',
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      jobTitle: 'Hotel B - Front Desk',
      appliedDate: '2024-08-28',
      status: 'declined',
      experience: '1 year',
      location: 'Negombo',
      phone: '+94 75 321 9876',
      email: 'sarah.wilson@email.com',
    },
  ]);

  const handleApprove = (applicantId: number) => {
    Alert.alert(
      'Approve Applicant',
      'Are you sure you want to approve this applicant?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Approve',
          onPress: () => {
            setApplicants(prev =>
              prev.map(app =>
                app.id === applicantId ? { ...app, status: 'approved' } : app
              )
            );
            Alert.alert('Success', 'Applicant approved successfully');
          },
        },
      ]
    );
  };

  const handleDecline = (applicantId: number) => {
    Alert.alert(
      'Decline Applicant',
      'Are you sure you want to decline this applicant?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Decline',
          style: 'destructive',
          onPress: () => {
            setApplicants(prev =>
              prev.map(app =>
                app.id === applicantId ? { ...app, status: 'declined' } : app
              )
            );
            Alert.alert('Success', 'Applicant declined successfully');
          },
        },
      ]
    );
  };

  const handleViewResume = (applicant: Applicant) => {
    // Navigate to resume page with applicant data
    router.push({
      pathname: '/(tabs)/JobPoster/viewapplicant',
      params: {
        applicantId: applicant.id,
        applicantData: JSON.stringify(applicant),
      },
    });
  };

  const handleCall = (phone: string) => {
    Alert.alert('Call', `Calling ${phone}...`);
  };

  const handleBackPress = () => {
    router.back();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return '#4CAF50';
      case 'declined':
        return '#F44336';
      default:
        return '#FF9800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'declined':
        return 'Declined';
      default:
        return 'Pending';
    }
  };

  const pendingApplicants = applicants.filter(app => app.status === 'pending');
  const processedApplicants = applicants.filter(app => app.status !== 'pending');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF8C42" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>View Applicants</Text>
            <Text style={styles.headerSubtitle}>
              {applicants.length} total applicant{applicants.length !== 1 ? 's' : ''}
            </Text>
          </View>
          <Link href="/(tabs)/JobPoster/homepage" asChild>
            <TouchableOpacity style={styles.homeButton}>
              <Feather name="home" size={24} color="white" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Pending Applications Section */}
        {pendingApplicants.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Pending Applications ({pendingApplicants.length})
            </Text>
            {pendingApplicants.map((applicant) => (
              <View key={applicant.id} style={styles.applicantCard}>
                <View style={styles.applicantInfo}>
                  <Text style={styles.applicantName}>{applicant.name}</Text>
                  <Text style={styles.jobTitle}>{applicant.jobTitle}</Text>
                  <View style={styles.applicantDetails}>
                    <Text style={styles.detailText}>
                      <Feather name="calendar" size={12} color="#666" /> Applied: {applicant.appliedDate}
                    </Text>
                    <Text style={styles.detailText}>
                      <Feather name="briefcase" size={12} color="#666" /> Experience: {applicant.experience}
                    </Text>
                    <Text style={styles.detailText}>
                      <Feather name="map-pin" size={12} color="#666" /> Location: {applicant.location}
                    </Text>
                  </View>
                </View>

                <View style={styles.statusContainer}>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(applicant.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(applicant.status)}</Text>
                  </View>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={styles.callButton}
                    onPress={() => handleCall(applicant.phone)}
                  >
                    <Feather name="phone" size={16} color="white" />
                    <Text style={styles.buttonText}>Call</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.resumeButton}
                   
                  >
                    <Feather name="eye" size={16} color="white" />
                    <Link href="/(tabs)/JobPoster/viewresume"> <Text style={styles.buttonText}>View Resume</Text></Link>
                  </TouchableOpacity>
                </View>

                <View style={styles.decisionButtons}>
                  <TouchableOpacity 
                    style={styles.approveButton}
                    onPress={() => handleApprove(applicant.id)}
                  >
                    <Feather name="check" size={16} color="white" />
                    <Link href='/(tabs)/JobPoster/payment'><Text style={styles.buttonText}>Approve</Text></Link>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.declineButton}
                    onPress={() => handleDecline(applicant.id)}
                  >
                    <Feather name="x" size={16} color="white" />
                    <Text style={styles.buttonText}>Decline</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Processed Applications Section */}
        {processedApplicants.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Processed Applications ({processedApplicants.length})
            </Text>
            {processedApplicants.map((applicant) => (
              <View key={applicant.id} style={[styles.applicantCard, styles.processedCard]}>
                <View style={styles.applicantInfo}>
                  <Text style={styles.applicantName}>{applicant.name}</Text>
                  <Text style={styles.jobTitle}>{applicant.jobTitle}</Text>
                  <View style={styles.applicantDetails}>
                    <Text style={styles.detailText}>
                      <Feather name="calendar" size={12} color="#666" /> Applied: {applicant.appliedDate}
                    </Text>
                    <Text style={styles.detailText}>
                      <Feather name="briefcase" size={12} color="#666" /> Experience: {applicant.experience}
                    </Text>
                    <Text style={styles.detailText}>
                      <Feather name="map-pin" size={12} color="#666" /> Location: {applicant.location}
                    </Text>
                  </View>
                </View>

                <View style={styles.statusContainer}>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(applicant.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(applicant.status)}</Text>
                  </View>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={styles.callButton}
                    onPress={() => handleCall(applicant.phone)}
                  >
                    <Feather name="phone" size={16} color="white" />
                    <Text style={styles.buttonText}>Call</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.resumeButton}
                    onPress={() => handleViewResume(applicant)}
                  >
                    <Feather name="eye" size={16} color="white" />
                    <Text style={styles.buttonText}>View Resume</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Empty State */}
        {applicants.length === 0 && (
          <View style={styles.emptyState}>
            <Feather name="users" size={64} color="#ccc" />
            <Text style={styles.emptyStateTitle}>No Applicants Yet</Text>
            <Text style={styles.emptyStateText}>
              You haven't received any job applications yet. Keep your job postings active to attract candidates.
            </Text>
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
  header: {
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
    flex: 1,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  applicantCard: {
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
  processedCard: {
    opacity: 0.8,
  },
  applicantInfo: {
    marginBottom: 12,
  },
  applicantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  applicantDetails: {
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  statusContainer: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  callButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    gap: 4,
  },
  resumeButton: {
    backgroundColor: '#FF8C42',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    gap: 4,
  },
  decisionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  approveButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    gap: 4,
  },
  declineButton: {
    backgroundColor: '#F44336',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    gap: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
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
    lineHeight: 20,
  },
});

export default ViewApplicantsScreen;