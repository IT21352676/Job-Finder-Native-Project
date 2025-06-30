import React from 'react';
import { Link } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';

export default function VerificationMethodScreen() {
  const handleEmailVerification = () => {
    // Navigate to email OTP verification
    console.log('Navigate to Email OTP');
  };

  const handleMobileVerification = () => {
    // Navigate to mobile OTP verification
    console.log('Navigate to Mobile OTP');
  };

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
          {/* Header with Background Image */}
          <ImageBackground
            source={{ uri: 'https://static.vecteezy.com/system/resources/previews/031/002/800/non_2x/otp-icon-vector.jpg' }}
            style={styles.header}
            resizeMode="cover"
          >
            {/* Orange overlay to maintain the orange theme */}
            <View style={styles.overlay} />
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>Jobs</Text>
            </View>
          </ImageBackground>

          {/* Verification Card */}
          <View style={styles.verificationCard}>
            {/* Verification Title */}
            <Text style={styles.verificationTitle}>
              Choose Verification Method
            </Text>
            <Text style={styles.verificationSubtitle}>
              How would you like to receive your OTP?
            </Text>

            {/* Email Verification Button */}
            
            <TouchableOpacity 
              style={styles.verificationButton}
              activeOpacity={0.8}
            >
              <Link href="/(tabs)/otpemail"><Text style={styles.verificationButtonText}>Verify with Email</Text></Link>
            </TouchableOpacity>
            

            {/* Mobile Verification Button */}
            
            <TouchableOpacity 
              style={styles.mobileButton}
              activeOpacity={0.8}
            >
              <Link href="/(tabs)/otpmobile"><Text style={styles.mobileButtonText}>Verify with Mobile</Text></Link>
            </TouchableOpacity>

            <TouchableOpacity 
             
              style={styles.cancel}
              activeOpacity={0.8}
            >
              <Link href="/(tabs)/loginseeker"><Text style={styles.cancelText}>Cancel</Text></Link>
            </TouchableOpacity>
            

            
            
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 140, 66, 0.7)',
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
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 140, 66, 0.7)',
  },
  logoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'rgba(255, 140, 66, 1)',
    letterSpacing: 3,
    textAlign: 'center',
  },
  verificationCard: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 35,
    paddingTop: 25,
    minHeight: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  verificationTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  verificationSubtitle: {
    fontSize: 15,
    color: '#888',
    marginBottom: 60,
    lineHeight: 22,
    textAlign: 'center',
  },
  verificationButton: {
    backgroundColor: '#ff8c42',
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#ff8c42',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  verificationButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  mobileButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ff8c42',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  mobileButtonText: {
    color: '#ff8c42',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  backContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  backText: {
    fontSize: 14,
    color: '#888',
  },
  backLink: {
    fontSize: 14,
    color: '#ff8c42',
    fontWeight: '600',
  },
  cancel:{
    alignItems: 'center',
  },
  cancelText:{
    color:'#000',
    textDecorationLine: 'underline'
  }
});