// VerificationSuccess.tsx
import { Link } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

interface VerificationSuccessProps {
  navigation?: any; // Replace with your navigation type
  verificationType?: 'email' | 'mobile'; // Optional prop to customize message
}

const VerificationSuccess: React.FC<VerificationSuccessProps> = ({ 
  navigation, 
  verificationType = 'email' 
}) => {
  const handleBackToLogin = (): void => {
    // navigation.navigate('Login');
    console.log('Navigating back to login...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon Container */}
        <View style={styles.iconContainer}>
          <View style={styles.checkmarkContainer}>
            <View style={styles.checkmark}>
              <View style={styles.checkmarkStem} />
              <View style={styles.checkmarkKick} />
            </View>
          </View>
        </View>

        {/* Success Content */}
        <Text style={styles.title}>Verification Successful!</Text>
        <Text style={styles.subtitle}>
          {verificationType === 'email' ? 'Email Verified' : 'Mobile Verified'}
        </Text>
        
        <Text style={styles.congratsText}>Congratulations!</Text>
        
        <Text style={styles.description}>
          Your {verificationType} has been successfully verified. You can now access all features of your account.
        </Text>

        {/* Success Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <View style={styles.detailIcon}>
              <View style={styles.smallCheck} />
            </View>
            <Text style={styles.detailText}>
              {verificationType === 'email' ? 'Email address confirmed' : 'Phone number confirmed'}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <View style={styles.detailIcon}>
              <View style={styles.smallCheck} />
            </View>
            <Text style={styles.detailText}>Account security enhanced</Text>
          </View>
          
          <View style={styles.detailItem}>
            <View style={styles.detailIcon}>
              <View style={styles.smallCheck} />
            </View>
            <Text style={styles.detailText}>Full access granted</Text>
          </View>
        </View>

        {/* Back to Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleBackToLogin}>
          <Link href='/(tabs)/registerseeker'><Text style={styles.loginButtonText}>Back to Login</Text></Link>   
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff8c42',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#ff8c42',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    shadowColor: '#ff8c42',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  checkmarkContainer: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    width: 40,
    height: 40,
    position: 'relative',
  },
  checkmarkStem: {
    position: 'absolute',
    width: 3,
    height: 20,
    backgroundColor: 'white',
    left: 22,
    top: 10,
    transform: [{ rotate: '45deg' }],
    borderRadius: 2,
  },
  checkmarkKick: {
    position: 'absolute',
    width: 3,
    height: 12,
    backgroundColor: 'white',
    left: 16,
    top: 18,
    transform: [{ rotate: '-45deg' }],
    borderRadius: 2,
  },
  title: {
    color: '#333',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#ff8c42',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  congratsText: {
    color: '#333',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  detailIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#ff8c42',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  smallCheck: {
    width: 8,
    height: 8,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderLeftColor: 'white',
    borderBottomColor: 'white',
    transform: [{ rotate: '-45deg' }],
    marginTop: -2,
  },
  detailText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  loginButton: {
    width: '100%',
    padding: 16,
    backgroundColor: '#ff8c42',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#ff8c42',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default VerificationSuccess;