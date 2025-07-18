import { Link } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = "http://localhost:8000/mobile/secured/bank/create";
const CreateBankAccount = () => {
  const [holderFirstName, setHolderFirstName] = useState("");
  const [bankName, setBankName] = useState("");
  const [branch, setBranch] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleCreate = async () => {
    // Handle create account logic
    if (!holderFirstName || !bankName || !branch || !accountNumber) {
      alert("All fields are required");
      return;
    }

    if (!userData.id) {
      alert("User does not found!");
    }

    console.log(holderFirstName, bankName, accountNumber, branch, userData.id);
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          seeker_id: userData.id,
          bank: bankName,
          holder: holderFirstName,
          bankACC: accountNumber,
          branch: branch,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Bank account creation failed", data.error);
        alert(`Bank account creation failed, ${data.error}`);
        return;
      }

      Alert.alert("Bank account creation success");
      alert(`Bank account creation success`);
    } catch (error: any) {
      console.error("Login error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
      alert(error);
    }
  };

  interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
  }
  const [userData, setUserData] = useState<User>({} as User);

  const fetchStoredData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");

      if (token && userJson) {
        const user = JSON.parse(userJson);
        console.log("Auto-login user:", user.firstname);
        console.log("Token:", token);

        setUserData(user);
      } else {
        console.log("Auth data not found");
      }
    } catch (error) {
      console.error("Error retrieving login data:", error);
    }
  }, []);

  useEffect(() => {
    fetchStoredData();
  }, [fetchStoredData]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Bank Account</Text>

        <View style={styles.iconContainer}>
          <View style={styles.bankIcon}>
            <Text style={styles.bankIconText}>🏛️</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Holder Name*</Text>
            <TextInput
              style={styles.input}
              value={holderFirstName}
              onChangeText={setHolderFirstName}
              placeholder="Enter holder name"
              placeholderTextColor="#999"
            />
          </View>

          {/* <View style={styles.inputContainer}>
            <Text style={styles.label}>Holder Last Name*</Text>
            <TextInput
              style={styles.input}
              value={holderLastName}
              onChangeText={setHolderLastName}
              placeholder="Enter last name"
              placeholderTextColor="#999"
            />
          </View> */}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Bank Name*</Text>
            <TextInput
              style={styles.input}
              value={bankName}
              onChangeText={setBankName}
              placeholder="Enter bank name"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Branch*</Text>
            <TextInput
              style={styles.input}
              value={branch}
              onChangeText={setBranch}
              placeholder="Enter branch"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Account Number*</Text>
            <TextInput
              style={styles.input}
              value={accountNumber}
              onChangeText={setAccountNumber}
              placeholder="Enter account number"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
            <Link href="/(tabs)/JobSeeker/showbankaccounts">
              <Text style={styles.createButtonText}>Create</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF8C42",
    textAlign: "center",
    marginBottom: 30,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  bankIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFE4D6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FF8C42",
    borderStyle: "dashed",
  },
  bankIconText: {
    fontSize: 30,
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#FAFAFA",
  },
  createButton: {
    backgroundColor: "#FF8C42",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CreateBankAccount;
