import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Linking,
} from 'react-native';

export default function PosterRegistrationScreen() {
  const [currentPage, setCurrentPage] = useState('register');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    password: '',
    address: '',
    city: '',
    emailAddress: '',
    telephoneNumber: '',
  });

  const handleInputChange = (field: string, value: string) => {
  
  };

  const handleRegister = () => {
  
  };


  if (currentPage === 'success') {
    return (
      <SafeAreaView style={styles.successContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#ff8c42" />
        
        <View style={styles.successContent}>
          <View style={styles.successCard}>
            <View style={styles.successIcon}>
              <Text style={styles.checkMark}>✓</Text>
            </View>
            <Text style={styles.successTitle}>Registration Successful!</Text>
            <Text style={styles.successMessage}>Welcome to Jobs as a Poster!</Text>
            
            <TouchableOpacity 
              style={styles.registerButton}
              activeOpacity={0.8}
            >
              <Text style={styles.registerButtonText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#ff8c42" />
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.mainScrollView}
          contentContainerStyle={styles.mainScrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Register</Text>
              <Text style={styles.headerSubtitle}>Register as Job Poster</Text>
            </View>
          </View>

          {/* Registration Form */}
          <View style={styles.registrationCard}>
            {/* First Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>First Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={formData.firstName}
                  onChangeText={(value) => handleInputChange('firstName', value)}
                  placeholder="First Name"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            {/* Last Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={formData.lastName}
                  onChangeText={(value) => handleInputChange('lastName', value)}
                  placeholder="Last Name"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            {/* Company Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Company Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={formData.companyName}
                  onChangeText={(value) => handleInputChange('companyName', value)}
                  placeholder="Company Name"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  secureTextEntry={true}
                />
              </View>
            </View>

            {/* Address */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Address</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={formData.address}
                  onChangeText={(value) => handleInputChange('address', value)}
                  placeholder="Address"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            {/* City */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>City</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={formData.city}
                  onChangeText={(value) => handleInputChange('city', value)}
                  placeholder="City"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            {/* Email Address */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={formData.emailAddress}
                  onChangeText={(value) => handleInputChange('emailAddress', value)}
                  placeholder="Email Address"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Telephone Number */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Telephone Number</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={formData.telephoneNumber}
                  onChangeText={(value) => handleInputChange('telephoneNumber', value)}
                  placeholder="Telephone Number"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Register Button */}
            <Link href="/(tabs)/identityverify">
                <TouchableOpacity 
                style={styles.registerButton}
                activeOpacity={0.8}
                >
                <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
            </Link>

            {/* Already have an account section */}
            <View style={styles.loginSection}>
              <Text style={styles.loginText}>Already have an account?</Text>
              <TouchableOpacity 
                activeOpacity={0.7}
              >
                <Link href="/(tabs)/Authentication Tabs/loginposter"><Text style={styles.loginLink}>Sign In</Text></Link>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff8c42',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  mainScrollView: {
    flex: 1,
  },
  mainScrollContent: {
    flexGrow: 1,
  },
  header: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 40,
    paddingHorizontal: 25,
    backgroundColor: '#ff8c42',
  },
  headerContent: {
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  registrationCard: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    paddingTop: 30,
    minHeight: 700,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
  },
  textInput: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 15,
    color: '#333',
    backgroundColor: 'transparent',
  },
  registerButton: {
    backgroundColor: '#ff8c42',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal:8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#ff8c42',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  loginText: {
    fontSize: 14,
    color: '#666',
    marginRight: 5,
  },
  loginLink: {
    fontSize: 14,
    color: '#ff8c42',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  successContainer: {
    flex: 1,
    backgroundColor: '#ff8c42',
  },
  successContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  successCard: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 15,
    width: '100%',
    maxWidth: 350,
  },
  successIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#4CAF50',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  checkMark: {
    fontSize: 40,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
});