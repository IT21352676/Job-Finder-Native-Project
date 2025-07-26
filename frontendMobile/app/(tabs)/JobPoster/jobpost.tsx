import { Link, router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:8000/mobile/secured/job-poster/post";

const PostJobScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [work_hours, setWork_hours] = useState("");
  const [job_date, set_Jobdate] = useState("");
  const [start_date, setStart_date] = useState("");
  const [amount_of_seekers, setAmount_of_seekers] = useState("");
  const [hourly_title, setHourly_rate] = useState("");
  const [location, setLocation] = useState("");
  const [requirements, setRequirements] = useState("");

  // const handleGenderSelect = (selectedGender: React.SetStateAction<string>) => {
  //   setGender(selectedGender);
  // };

  interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
  }

  const [userData, setUserData] = useState<User>();

  const fetchStoredData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");

      if (token && userJson) {
        const user = JSON.parse(userJson);
        console.log("Auto-login user:", user.firstname);
        console.log("Token:", token);

        setUserData(user);
      }
    } catch (error) {
      console.error("Error retrieving login data:", error);
    }
  }, []);

  useEffect(() => {
    fetchStoredData();
  }, [fetchStoredData]);

  const handleJobPOst = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          poster_id: userData?.id,
          title,
          description,
          gender,
          work_hours,
          job_date,
          start_date,
          amount_of_seekers,
          hourly_title,
          location,
          requirements,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to post jobs");
      }

      const data = await response.json();
      Alert.alert("Job post Successful");
      alert(`Job post Successful`);
      router.push({ pathname: "/JobPoster/viewjobs" });
    } catch (error: any) {
      console.error("Job post error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
      alert(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Post the Jobs</Text>
            <Link href="/(tabs)/JobPoster/homepage" asChild>
              <TouchableOpacity style={styles.homeButton}>
                <Feather name="home" size={24} color="white" />
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter Job Title"
          />

          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter Location"
          />

          <Text style={styles.label}>Working Hours</Text>
          <TextInput
            style={styles.input}
            value={work_hours}
            onChangeText={setWork_hours}
            placeholder="Enter Work Hours"
          />

          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={styles.radioContainer}
              onPress={() => setGender("Male")}
            >
              <View
                style={[
                  styles.radioButton,
                  gender === "Male" && styles.radioSelected,
                ]}
              />
              <Text style={styles.radioLabel}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioContainer}
              onPress={() => setGender("Female")}
            >
              <View
                style={[
                  styles.radioButton,
                  gender === "Female" && styles.radioSelected,
                ]}
              />
              <Text style={styles.radioLabel}>Female</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioContainer}
              onPress={() => setGender("Any")}
            >
              <View
                style={[
                  styles.radioButton,
                  gender === "Any" && styles.radioSelected,
                ]}
              />
              <Text style={styles.radioLabel}>Any</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter Job Description"
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Job Date</Text>
          <TextInput
            style={[styles.input]}
            value={job_date}
            onChangeText={set_Jobdate}
            placeholder="Enter Job Date"
          />

          <Text style={styles.label}>Start Date</Text>
          <TextInput
            style={styles.input}
            value={start_date}
            onChangeText={setStart_date}
            placeholder="Enter Start Date"
          />

          <Text style={styles.label}>Amount of Employees</Text>
          <TextInput
            style={styles.input}
            value={amount_of_seekers}
            onChangeText={setAmount_of_seekers}
            placeholder="Enter Amount of Employees"
          />

          <Text style={styles.label}>Enter Amount</Text>
          <TextInput
            style={styles.input}
            value={hourly_title}
            onChangeText={setHourly_rate}
            placeholder="Enter Amount"
          />

          <Text style={styles.label}>Requirements</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={requirements}
            onChangeText={setRequirements}
            placeholder="Enter Requirements"
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.postButton}>
            <Text style={styles.postButtonText} onPress={handleJobPOst}>
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    backgroundColor: "#FF8C42",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    flex: 1,
  },
  homeButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginLeft: 12,
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: "white",
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  genderContainer: {
    marginBottom: 16,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    marginRight: 12,
    backgroundColor: "white",
  },
  radioSelected: {
    backgroundColor: "#FF8C42",
    borderColor: "#FF8C42",
  },
  radioLabel: {
    fontSize: 16,
    color: "#333",
  },
  postButton: {
    backgroundColor: "#FF8C42",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 20,
  },
  postButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default PostJobScreen;
