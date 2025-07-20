import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useLocalSearchParams } from "expo-router";
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

interface Job {
  job_id: number;
  poster_id: number;
  title: string;
  description: string;
  gender: string;
  status: string;
  work_hours: number;
  posted_date: string;
  job_date: string;
  start_date: string;
  amount_of_seekers: number;
  hourly_title: string;
  location: string;
  requirements: string[];
}

const FETCH_API_URL =
  "http://localhost:8000/mobile/secured/job-poster/get-job/";
const UPDATE_API_URL = "http://localhost:8000/mobile/secured/job-poster/edit/";

const EditJobScreen = () => {
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

  const { jobId } = useLocalSearchParams();
  // const [job, setJob] = useState<Partial<Omit<Job, "job_id">>>({});

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
  const handleEdit = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(UPDATE_API_URL + `${jobId}`, {
        method: "PUT",
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
        throw new Error("Failed to update jobs");
      }

      const data = await response.json();
      if (data.message == "Job updated successfully") {
        Alert.alert("Job update Successful");
        alert(`Job update Successful`);
      }
    } catch (error: any) {
      console.error("Error updating jobs:", error);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(FETCH_API_URL + `${jobId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch job");
        }

        const data = await response.json();

        if (data && data.data) {
          const jobData = data.data?.[0];
          console.log(jobData);

          setTitle(jobData.title);
          setDescription(jobData.description);
          setGender(jobData.gender);
          setWork_hours(String(jobData.work_hours));
          set_Jobdate(jobData.job_date);
          setStart_date(jobData.start_date);
          setAmount_of_seekers(String(jobData.amount_of_seekers));
          setHourly_rate(jobData.hourly_title);
          setLocation(jobData.location);
          setRequirements(jobData.requirements);
        }
      } catch (error: any) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJob();
  }, [jobId]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Edit Job</Text>
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

          {/* <Text style={styles.label}>Gender</Text>
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
          </View> */}

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

          <Text style={styles.label}>Hourly Title</Text>
          <TextInput
            style={styles.input}
            value={hourly_title}
            onChangeText={setHourly_rate}
            placeholder="Enter Hourly Title"
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

          <TouchableOpacity style={styles.postButton} onPress={handleEdit}>
            <Text style={styles.postButtonText}>Save Changes</Text>
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
export default EditJobScreen;
