import { Link, router } from "expo-router";
import React, { useState, useRef } from "react";
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
} from "react-native";
import { useLocalSearchParams } from "expo-router";

interface OTPEmailVerificationProps {
  navigation?: any; // Replace with your navigation type
}

const API_URL = "http://localhost:8000/mobile/otp/verify-otp";

const RESEND_OTP_URL = "http://localhost:8000/mobile/otp/send-otp";

const OTPEmailVerification: React.FC<OTPEmailVerificationProps> = ({
  navigation,
}) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [resendTimer, setResendTimer] = useState<number>(0);
  const otpRefs = useRef<TextInput[]>([]);

  const { email } = useLocalSearchParams();
  console.log("Email from params:", email);

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
    if (key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer === 0) {
      try {
        const response = await fetch(RESEND_OTP_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          Alert.alert(
            "OTP Sent",
            "A new OTP has been sent to your email address"
          );

          alert("A new OTP has been sent to your email address");
          setResendTimer(30);
        }
      } catch (error: any) {
        console.log(error);
        Alert.alert("Error", "Something went wrong. Please try again.");
        alert(error);
      }

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

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length === 4) {
      // Verify OTP logic here
      console.log("Verifying Email OTP:", otpValue);
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            otp: otpValue,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          Alert.alert("OTP verification Failed", data.error);
          alert(`OTP verification Failed, ${data.error}`);
          return;
        }

        Alert.alert("OTP verification Successful!");
        alert(`OTP verification Successful!`);

        // Navigate to OTP screen with email
        router.push({
          pathname: "/authentication/loginposter",
        });
      } catch (error: any) {
        console.log(error);
        Alert.alert("Error", "Something went wrong. Please try again.");
        alert(error);
      }
    } else {
      Alert.alert("Error", "Please enter the complete OTP");
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
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.description}>
          Thank you for registering with us. Please type the OTP that is shared
          to your email address.
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
              style={[
                styles.otpInput,
                digit ? styles.otpInputFilled : styles.otpInputEmpty,
              ]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={({
                nativeEvent,
              }: NativeSyntheticEvent<TextInputKeyPressEventData>) =>
                handleKeyPress(nativeEvent.key, index)
              }
              keyboardType="numeric"
              maxLength={1}
              placeholderTextColor="#ccc"
            />
          ))}
        </View>

        {/* Resend OTP */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>OTP not received? </Text>
          <TouchableOpacity
            onPress={handleResendOTP}
            disabled={resendTimer > 0}
          >
            <Text
              style={[
                styles.resendLink,
                resendTimer > 0 && styles.disabledLink,
              ]}
            >
              RESEND {resendTimer > 0 && `(${resendTimer}s)`}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          style={[
            styles.nextButton,
            otp.join("").length === 4
              ? styles.nextButtonActive
              : styles.nextButtonInactive,
          ]}
        >
          <Text style={styles.nextButtonText} onPress={handleVerify}>
            Verify
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff8c42",
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#ff8c42",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    position: "relative",
    shadowColor: "#ff8c42",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  documentIcon: {
    width: 35,
    height: 45,
    position: "relative",
  },
  documentBody: {
    width: 35,
    height: 45,
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#333",
  },
  documentHeader: {
    position: "absolute",
    top: 5,
    left: 5,
    right: 5,
    height: 12,
    backgroundColor: "#333",
    borderRadius: 2,
  },
  documentLines: {
    position: "absolute",
    top: 22,
    left: 5,
    right: 5,
    height: 2,
    backgroundColor: "#ddd",
  },
  emailIcon: {
    position: "absolute",
    top: 15,
    right: 10,
    width: 24,
    height: 18,
  },
  emailBody: {
    width: 20,
    height: 14,
    backgroundColor: "white",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#333",
  },
  emailFlap: {
    position: "absolute",
    top: 0,
    left: 10,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "white",
  },
  title: {
    color: "#333",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    color: "#333",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
  },
  greeting: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 15,
  },
  description: {
    color: "#666",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  email: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  otpInputEmpty: {
    borderColor: "#e0e0e0",
    backgroundColor: "#fafafa",
  },
  otpInputFilled: {
    borderColor: "#ff8c42",
    backgroundColor: "#fff",
  },
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  resendText: {
    color: "#666",
    fontSize: 14,
  },
  resendLink: {
    color: "#ff8c42",
    fontSize: 14,
    fontWeight: "600",
  },
  disabledLink: {
    color: "#ccc",
  },
  nextButton: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  nextButtonActive: {
    backgroundColor: "#ff8c42",
  },
  nextButtonInactive: {
    backgroundColor: "#ccc",
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default OTPEmailVerification;
