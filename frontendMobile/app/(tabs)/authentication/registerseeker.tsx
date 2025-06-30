import { Link } from "expo-router";
import React, { useState } from "react";
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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { router } from "expo-router";

const API_URL = "http://localhost:8000/mobile/auth/job-seeker-signup";
const RESEND_OTP_URL = "http://localhost:8000/mobile/otp/send-otp";

export default function JobSeekerRegistrationUI() {
  const [currentPage, setCurrentPage] = useState("register");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    nic: "",
    telnumber: "",
    addressLine: "",
    gender: "",
    birthday: "",
    street: "",
    city: "",
    province: "",
    password: "",
    confirmPassword: "",
  });

  const [nicFront, setNicFront] = useState<File | null>(null);
  const [nicFrontPreview, setNicFrontPreview] = useState<string | null>(null);
  const [nicBack, setNicBack] = useState<File | null>(null);
  const [nicBackPreview, setNicBackPreview] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    // Validate required fields
    const {
      firstName,
      lastName,
      email,
      nic,
      telnumber,
      addressLine,
      gender,
      birthday,
      street,
      city,
      province,
      password,
      confirmPassword,
    } = formData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !nic ||
      !telnumber ||
      !addressLine ||
      !gender ||
      !birthday ||
      !street ||
      !city ||
      !province ||
      !confirmPassword
    ) {
      Alert.alert(
        "Validation Error",
        "Please fill out all fields and upload NIC images."
      );
      return;
    }

    const dataForm = new FormData();

    dataForm.append("firstname", firstName);
    dataForm.append("lastname", lastName);
    dataForm.append("email", email);
    dataForm.append("nic", nic);
    dataForm.append("birthday", birthday);
    dataForm.append("gender", gender);
    dataForm.append("telnumber", telnumber);
    dataForm.append("addressLine", addressLine);
    dataForm.append("street", street);
    dataForm.append("city", city);
    dataForm.append("province", province);
    dataForm.append("password", password);
    dataForm.append("confirmpassword", confirmPassword);

    // Append NIC front image
    dataForm.append("profileDoc_front", nicFront!);

    // Append NIC back image
    dataForm.append("profileDoc_back", nicBack!);

    try {
      console.log("NIC front URI:", nicFront);
      console.log("NIC back URI:", nicBack);
      const response = await fetch(API_URL, {
        method: "POST",
        body: dataForm,
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Register Failed", data.error);
        alert(`Register Failed, ${data.error}`);
        return;
      }

      await fetch(RESEND_OTP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      Alert.alert("Register Successful!");
      alert(`Register Successful!`);

      // Navigate to OTP screen with email
      router.push({
        pathname: "/authentication/otpemail",
        params: { email: email },
      });
    } catch (error: any) {
      console.error("Login error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
      alert(error);
    }
  };

  const pickImage = async (side: "nicFront" | "nicBack") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      const objectURL = URL.createObjectURL(file);

      if (side === "nicFront") {
        setNicFront(file);
        setNicFrontPreview(objectURL);
      } else {
        setNicBack(file);
        setNicBackPreview(objectURL);
      }
    };

    input.click();
  };

  // const handleBackToLogin = async () => {
  //   const url = "http://localhost:8081/login";

  //   try {
  //     // Check if the URL can be opened
  //     const supported = await Linking.canOpenURL(url);

  //     if (supported) {
  //       // Open the URL in the device's default browser
  //       await Linking.openURL(url);
  //     } else {
  //       Alert.alert("Error", "Unable to open the URL");
  //     }
  //   } catch (error) {
  //     console.error("Error opening URL:", error);
  //     Alert.alert("Error", "An error occurred while opening the URL");
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#ff8c42" />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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
              <Text style={styles.headerSubtitle}>Register as Job Seeker</Text>
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
                  onChangeText={(value) =>
                    handleInputChange("firstName", value)
                  }
                  placeholder="First Name"
                  placeholderTextColor="#999"
                  autoCapitalize="words"
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
                  onChangeText={(value) => handleInputChange("lastName", value)}
                  placeholder="Last Name"
                  placeholderTextColor="#999"
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Email Address */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={formData.email}
                  onChangeText={(value) => handleInputChange("email", value)}
                  placeholder="Email Address"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* NIC */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>NIC</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={formData.nic}
                  onChangeText={(value) => handleInputChange("nic", value)}
                  placeholder="NIC number"
                  placeholderTextColor="#999"
                  // keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Gender */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Gender</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={formData.gender}
                  onChangeText={(value) => handleInputChange("gender", value)}
                  placeholder="Gender"
                  placeholderTextColor="#999"
                  // keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* BD */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Birthday</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={formData.birthday}
                  onChangeText={(value) => handleInputChange("birthday", value)}
                  placeholder="Birthday"
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Mobile Number */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Mobile Number</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={formData.telnumber}
                  onChangeText={(value) =>
                    handleInputChange("telnumber", value)
                  }
                  placeholder="Mobile Number"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Address */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Address</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={formData.addressLine}
                  onChangeText={(value) =>
                    handleInputChange("addressLine", value)
                  }
                  placeholder="Address"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            {/* Street */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Stret</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={formData.street}
                  onChangeText={(value) => handleInputChange("street", value)}
                  placeholder="Street"
                  placeholderTextColor="#999"
                  // keyboardType="email-address"
                  autoCapitalize="none"
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
                  onChangeText={(value) => handleInputChange("password", value)}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  secureTextEntry={true}
                />
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={formData.confirmPassword}
                  onChangeText={(value) =>
                    handleInputChange("confirmPassword", value)
                  }
                  placeholder="Confirm Password"
                  placeholderTextColor="#999"
                  secureTextEntry={true}
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
                  onChangeText={(value) => handleInputChange("city", value)}
                  placeholder="City"
                  placeholderTextColor="#999"
                  // keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Province */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Province</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={formData.province}
                  onChangeText={(value) => handleInputChange("province", value)}
                  placeholder="Province"
                  placeholderTextColor="#999"
                  // keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* NIC Front Upload */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>NIC Front</Text>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => pickImage("nicFront")}
              >
                <Text style={styles.uploadButtonText}>Upload Front Side</Text>
              </TouchableOpacity>
              {nicFrontPreview && (
                <Image
                  source={{ uri: nicBackPreview! }}
                  style={styles.previewImage}
                  resizeMode="cover"
                />
              )}
            </View>

            {/* NIC Back Upload */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>NIC Back</Text>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => pickImage("nicBack")}
              >
                <Text style={styles.uploadButtonText}>Upload Back Side</Text>
              </TouchableOpacity>
              {nicBackPreview && (
                <Image
                  source={{ uri: nicBackPreview! }}
                  style={styles.previewImage}
                  resizeMode="cover"
                />
              )}
            </View>

            {/* Register Button */}
            <Link href="/authentication/identityverify">
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
              <TouchableOpacity activeOpacity={0.7}>
                <Link href="/authentication/loginseeker">
                  <Text style={styles.loginLink}>Sign In</Text>
                </Link>
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
    backgroundColor: "#ff8c42",
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
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 40,
    paddingHorizontal: 25,
    backgroundColor: "#ff8c42",
  },
  headerContent: {
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#ffffff",
    opacity: 0.9,
  },
  registrationCard: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    paddingTop: 30,
    minHeight: 700,
    shadowColor: "#000",
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
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
  },
  textInput: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 15,
    color: "#333",
    backgroundColor: "transparent",
  },
  registerButton: {
    backgroundColor: "#ff8c42",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    shadowColor: "#ff8c42",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  registerButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 20,
  },
  loginText: {
    fontSize: 14,
    color: "#666",
    marginRight: 5,
  },
  loginLink: {
    fontSize: 14,
    color: "#ff8c42",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  successContainer: {
    flex: 1,
    backgroundColor: "#ff8c42",
  },
  successContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  successCard: {
    backgroundColor: "#ffffff",
    borderRadius: 25,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 15,
    width: "100%",
    maxWidth: 350,
  },
  successIcon: {
    width: 80,
    height: 80,
    backgroundColor: "#4CAF50",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  checkMark: {
    fontSize: 40,
    color: "#ffffff",
    fontWeight: "bold",
  },
  successTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  successMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  uploadButton: {
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  previewImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginTop: 8,
  },
});
