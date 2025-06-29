// OTPEmailVerification.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';

interface OTPEmailVerificationProps {
  navigation?: any; // Replace with your navigation type
}

const OTPEmailVerification: React.FC<OTPEmailVerificationProps> = ({ navigation }) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [resendTimer, setResendTimer] = useState<number>(0);
  const otpRefs = useRef<(TextInput | null)[]>([]);

  const email: string = 'pramodellahama74@gmail.com';

  const handleOtpChange = (value: string, index: number): void => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number): void => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOTP = (): void => {
    if (resendTimer === 0) {
      // Implement resend OTP logic
      Alert.alert('OTP Sent', 'A new OTP has been sent to your email address');
      setResendTimer(30);
      
      // Start countdown
      const timer = setInterval(() => {
        setResendTimer((prev: number) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleNext = (): void => {
    const otpValue = otp.join('');
    if (otpValue.length === 4) {
      // Verify OTP logic here
      console.log('Verifying Email OTP:', otpValue);
      // navigation.navigate('IdentityVerification');
    } else {
      Alert.alert('Error', 'Please enter the complete OTP');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Icon Container */}
        <View style={styles.iconContainer}>
          <View style={styles.documentIcon}>
            <View style={styles.documentBody} />
            <View style={styles.documentHeader} />
            <View style={styles.documentLines} />
          </View>
          <View style={styles.emailIcon}>
            <View style={styles.emailBody} />
            <View style={styles.emailFlap} />
          </View>
        </View>

        {/* Text Content */}
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>Email</Text>
        <Text style={styles.statusText}>You are almost done.</Text>
        <Text style={styles.description}>
          Please enter the verification code sent to your email address.
        </Text>
        <Text style={styles.email}>{email}</Text>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) {
                  otpRefs.current[index] = ref;
                }
              }}
              style={styles.otpInput}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={({ nativeEvent }: NativeSyntheticEvent<TextInputKeyPressEventData>) => 
                handleKeyPress(nativeEvent.key, index)
              }
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        {/* Resend OTP */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>OTP not received? </Text>
          <TouchableOpacity onPress={handleResendOTP} disabled={resendTimer > 0}>
            <Text style={[styles.resendLink, resendTimer > 0 && styles.disabledLink]}>
              RESEND {resendTimer > 0 && `(${resendTimer}s)`}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
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
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#ff8c42',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  documentIcon: {
    width: 35,
    height: 45,
    position: 'relative',
  },
  documentBody: {
    width: 35,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#333',
  },
  documentHeader: {
    position: 'absolute',
    top: 5,
    left: 5,
    right: 5,
    height: 12,
    backgroundColor: '#333',
    borderRadius: 2,
  },
  documentLines: {
    position: 'absolute',
    top: 22,
    left: 5,
    right: 5,
    height: 2,
    backgroundColor: '#ddd',
  },
  emailIcon: {
    position: 'absolute',
    top: 20,
    right: 8,
    width: 20,
    height: 14,
  },
  emailBody: {
    width: 20,
    height: 14,
    backgroundColor: 'white',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#333',
    position: 'relative',
  },
  emailFlap: {
    position: 'absolute',
    top: 0,
    left: 4,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'white',
  },
  title: {
    color: '#333',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
  },
  statusText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 10,
  },
  email: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  resendText: {
    color: '#666',
    fontSize: 14,
  },
  resendLink: {
    color: '#ff8c42',
    fontSize: 14,
    fontWeight: '600',
  },
  disabledLink: {
    color: '#ccc',
  },
  nextButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#ff8c42',
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OTPEmailVerification;