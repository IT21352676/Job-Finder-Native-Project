import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Button,
  Image,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

const EditProfileScreen = ({ navigation }: any) => {
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

  const [userDetails, setUserDetails] = useState<any>({} as any);

  const fetchUserDetails = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/mobile/secured/job-seeker/get-details/${userData?.id}`
      );
      const data = await res.json();
      setUserDetails(data);
    } catch (err) {
      console.error("Failed to fetch user details:", err);
      setUserDetails({} as any);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userData]);

  useEffect(() => {
    if (userDetails && userDetails[0]) {
      setFirstName(userDetails[0].firstname);
      setLastName(userDetails[0].lastname);
      setEmail(userDetails[0].email);
      setNIC(userDetails[0].nic);
      setBirthday(userDetails[0].birthday);
      setGender(userDetails[0].gender);
      setTelNumber(userDetails[0].telnumber);
      setAddressLine(userDetails[0].addressLine);
      setCity(userDetails[0].city);
      setProvince(userDetails[0].province);
      setPassword(userDetails[0].password);
      setStatus(userDetails[0].status);
      setActiveStatus(userDetails[0].activeStatus);
      setSkills(userDetails[0].skills);
    }
  }, [userDetails]);

  const [firstname, setFirstName] = useState(userDetails[0]?.firstname);
  const [lastname, setLastName] = useState(userDetails[0]?.lastname);
  const [email, setEmail] = useState(userDetails[0]?.email);
  const [nic, setNIC] = useState(userDetails[0]?.nic);
  const [birthday, setBirthday] = useState(userDetails[0]?.birthday);
  const [gender, setGender] = useState(userDetails[0]?.gender);
  const [telnumber, setTelNumber] = useState(userDetails[0]?.telNumber);
  const [addressLine, setAddressLine] = useState(userDetails[0]?.addressLine);
  const [city, setCity] = useState(userDetails[0]?.city);
  const [province, setProvince] = useState(userDetails[0]?.province);
  const [password, setPassword] = useState(userDetails[0]?.password);
  const [status, setStatus] = useState(userDetails[0]?.status);
  const [activeStatus, setActiveStatus] = useState(
    userDetails[0]?.activeStatus
  );
  const [skills, setSkills] = useState(userDetails[0]?.skills);

  const updatePersonalInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8000/mobile/secured/job-seeker/edit-personal-info",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            nic,
            birthday,
            gender,
            telnumber,
            addressLine,
            city,
            province,
            password,
            status,
            activeStatus,
            skills,
            seeker_id: userData?.id,
          }),
        }
      );

      if (!response.ok) {
        alert("Something went wrong");
      }

      const data = await response.json();
      alert("Profile updated!");
      console.log(data);
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]); // image with uri, type, fileName
    } else {
      return null;
    }
  };
  const uploadProfilePicture = async () => {
    if (!image?.uri || !userData?.id) {
      console.warn("No image or user ID found");
      return;
    }

    const formData = new FormData();
    const token = await AsyncStorage.getItem("token");

    console.log(image);

    formData.append("seeker_id", userData?.id as any);
    formData.append("profile_picture", image.file as any);
    formData.append("name", image.fileName as any);

    try {
      const response = await fetch(
        "http://localhost:8000/mobile/secured/job-seeker/upload-profile-picture",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF8C42" barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Link href="/(tabs)/JobSeeker/profile">
              <Feather name="arrow-left" size={22} color="white" />
            </Link>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={{ width: 24 }} /> {/* spacer */}
        </View>

        <View>
          {image && (
            <Image
              source={{ uri: image.uri }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <Button title="Pick Image" onPress={pickImage} />
          <Button title="Upload Image" onPress={uploadProfilePicture} />
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstname}
            onChangeText={setFirstName}
            placeholder="Enter your first name"
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastname}
            onChangeText={setLastName}
            placeholder="Enter your last name"
          />

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />

          <Text style={styles.label}>NIC</Text>
          <TextInput
            style={styles.input}
            value={nic}
            onChangeText={setNIC}
            placeholder="Enter your nic"
          />

          <Text style={styles.label}>Birthday</Text>
          <TextInput
            style={styles.input}
            value={birthday}
            onChangeText={setBirthday}
            placeholder="Enter your birthday"
          />

          <Text style={styles.label}>Gender</Text>
          <TextInput
            style={styles.input}
            value={gender}
            onChangeText={setGender}
            placeholder="Enter your gender"
          />

          <Text style={styles.label}>Tel Number</Text>
          <TextInput
            style={styles.input}
            value={telnumber}
            onChangeText={setTelNumber}
            placeholder="Enter your tel number"
          />

          <Text style={styles.label}>Address Line</Text>
          <TextInput
            style={styles.input}
            value={addressLine}
            onChangeText={setAddressLine}
            placeholder="Enter your address line"
          />

          <Text style={styles.label}>Set City</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
            placeholder="Enter your city"
          />

          <Text style={styles.label}>Set Province</Text>
          <TextInput
            style={styles.input}
            value={province}
            onChangeText={setProvince}
            placeholder="Enter your province"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
          />
          <Text style={styles.label}>Status</Text>
          <TextInput
            style={styles.input}
            value={status}
            onChangeText={setStatus}
            placeholder="Enter your status"
          />
          <Text style={styles.label}>Active Status</Text>
          <TextInput
            style={styles.input}
            value={activeStatus}
            onChangeText={setActiveStatus}
            placeholder="Enter your active status"
          />

          <Text style={styles.label}>Skills</Text>
          <TextInput
            style={styles.input}
            value={skills}
            onChangeText={setSkills}
            placeholder="Enter your skills set"
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelButton}>
            <Link href="/(tabs)/JobSeeker/profile">
              <Text style={styles.cancelText}>Cancel</Text>
            </Link>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => updatePersonalInfo()}
          >
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  content: { padding: 20 },
  header: {
    backgroundColor: "#FF8C42",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  headerTitle: { fontSize: 18, color: "white", fontWeight: "bold" },
  form: { marginBottom: 30 },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    paddingVertical: 12,
    marginRight: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 14,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#FF8C42",
    paddingVertical: 12,
    marginLeft: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default EditProfileScreen;
