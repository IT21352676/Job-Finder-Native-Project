// MobileVerificationSuccess.tsx
import { Link } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

interface MobileVerificationSuccessProps {
  navigation?: any; // Replace with your navigation type
}

const MobileVerificationSuccess: React.FC<MobileVerificationSuccessProps> = ({ navigation }) => {
  const phoneNumber: string = '+94724751535';

  const handleBackToLogin = (): void => {
    // navigation.navigate('Login');
    console.log('Navigating back to login...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon Container */}
        <View style={styles.iconContainer}>
          <View style={styles.phoneIcon}>
            <View style={styles.phoneBody} />
            <View style={styles.phoneScreen} />
          </View>
          <View style={styles.checkmarkIcon}>
            <View style={styles.checkmark}>
              <View style={styles.checkmarkStem} />
              <View style={styles.checkmarkKick} />
            </View>
          </View>
        </View>

        {/* Success Content */}
        <Text style={styles.title}>Verification Successful!</Text>
        <Text style={styles.subtitle}>Mobile Verified</Text>
        
        <Text style={styles.greeting}>Hello John,</Text>
        
        <Text style={styles.description}>
          Congratulations! Your mobile number has been successfully verified. You can now access all features of your account.
        </Text>

        <Text style={styles.phoneNumber}>{phoneNumber}</Text>

        {/* Success Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <View style={styles.detailIcon}>
              <View style={styles.smallCheck} />
            </View>
            <Text style={styles.detailText}>Phone number confirmed</Text>
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
            <Text style={styles.detailText}>SMS notifications enabled</Text>
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
    position: 'relative',
    shadowColor: '#ff8c42',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  phoneIcon: {
    width: 35,
    height: 50,
    position: 'relative',
  },
  phoneBody: {
    width: 35,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#333',
  },
  phoneScreen: {
    position: 'absolute',
    top: 8,
    left: 5,
    right: 5,
    bottom: 12,
    backgroundColor: '#333',
    borderRadius: 3,
  },
  checkmarkIcon: {
    position: 'absolute',
    top: 15,
    right: 8,
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#333',
  },
  checkmark: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  checkmarkStem: {
    position: 'absolute',
    width: 2,
    height: 12,
    backgroundColor: '#333',
    left: 11,
    top: 4,
    transform: [{ rotate: '45deg' }],
    borderRadius: 1,
  },
  checkmarkKick: {
    position: 'absolute',
    width: 2,
    height: 8,
    backgroundColor: '#333',
    left: 7,
    top: 8,
    transform: [{ rotate: '-45deg' }],
    borderRadius: 1,
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
  greeting: {
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
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  phoneNumber: {
    color: '#333',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
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

export default MobileVerificationSuccess;