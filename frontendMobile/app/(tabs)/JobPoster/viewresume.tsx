import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const API = "http://localhost:8000/mobile/secured/application/view-seeker/";

interface Experience {
  id: number;
  position: string;
  company: string;
  duration: string;
  description: string;
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  year: string;
  grade?: string;
}

interface Skill {
  id: number;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

const CVPage = () => {
  const { applicantId } = useLocalSearchParams();

  const [experiences] = useState<Experience[]>([
    {
      id: 1,
      position: "Senior Housekeeper",
      company: "Grand Hotel Resort",
      duration: "2022 - Present",
      description:
        "Managed housekeeping operations for 200+ rooms, supervised team of 15 staff members, maintained high cleanliness standards.",
    },
    {
      id: 2,
      position: "Front Desk Associate",
      company: "City Center Hotel",
      duration: "2020 - 2022",
      description:
        "Provided excellent customer service, handled check-in/out procedures, managed reservations and guest inquiries.",
    },
    {
      id: 3,
      position: "Room Attendant",
      company: "Boutique Inn",
      duration: "2019 - 2020",
      description:
        "Maintained guest rooms to hotel standards, restocked amenities, responded to guest requests promptly.",
    },
  ]);

  const [education] = useState<Education[]>([
    {
      id: 1,
      degree: "Certificate in Hotel Management",
      institution: "Hospitality Institute",
      year: "2019",
      grade: "A",
    },
    {
      id: 2,
      degree: "High School Diploma",
      institution: "Central High School",
      year: "2017",
    },
  ]);

  const handleBackPress = () => {
    router.back();
  };

  const handleEditCV = () => {
    Alert.alert("Edit CV", "Navigate to CV editing screen");
  };

  const handleDownloadCV = () => {
    Alert.alert(
      "Download CV",
      "CV download functionality would be implemented here"
    );
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "#4CAF50";
      case "Advanced":
        return "#2196F3";
      case "Intermediate":
        return "#FF9800";
      case "Beginner":
        return "#9E9E9E";
      default:
        return "#9E9E9E";
    }
  };

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [skills, setSkill] = useState<string[]>();

  useEffect(() => {
    const fetchApplicantData = async () => {
      const response = await fetch(API + `${applicantId}`, {
        method: "GET",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      if (!data && data.data.length == 0) {
        alert("No data available");
      }

      console.log(applicantId, data.data[0]);
      setPersonalInfo({
        name: `${data.data[0].firstname} ${data.data[0].lastname}`,
        email: data.data[0].email,
        phone: data.data[0].telnumber,
        address: data.data[0].addressLine,
      });

      setSkill(data.data[0].skills);
    };

    fetchApplicantData();
  }, []);

  const ExperienceCard: React.FC<{ experience: Experience }> = ({
    experience,
  }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{experience.position}</Text>
        <Text style={styles.cardSubtitle}>{experience.company}</Text>
      </View>
      <Text style={styles.duration}>{experience.duration}</Text>
      <Text style={styles.description}>{experience.description}</Text>
    </View>
  );

  const EducationCard: React.FC<{ education: Education }> = ({ education }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{education.degree}</Text>
        <Text style={styles.cardSubtitle}>{education.institution}</Text>
      </View>
      <View style={styles.educationFooter}>
        <Text style={styles.duration}>{education.year}</Text>
        {education.grade && (
          <Text style={styles.grade}>Grade: {education.grade}</Text>
        )}
      </View>
    </View>
  );

  const SkillItem: React.FC<{ skill: Skill }> = ({ skill }) => (
    <View style={styles.skillItem}>
      <View style={styles.skillHeader}>
        <Text style={styles.skillName}>{skill.name}</Text>
        <View
          style={[
            styles.skillLevel,
            { backgroundColor: getSkillLevelColor(skill.level) },
          ]}
        >
          <Text style={styles.skillLevelText}>{skill.level}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity style={styles.backButton}>
            <Link href="/(tabs)/JobPoster/viewapplicant">
              <Icon name="arrow-back" size={24} color="white" />
            </Link>
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>My CV</Text>
            <Text style={styles.headerSubtitle}>Professional Profile</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Personal Information */}
        <View style={styles.personalInfoCard}>
          <View style={styles.profileHeader}>
            <View style={styles.profileImageContainer}>
              <Icon name="person" size={40} color="#666" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{personalInfo.name}</Text>
            </View>
          </View>

          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Icon name="email" size={16} color="#666" />
              <Text style={styles.contactText}>{personalInfo.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Icon name="phone" size={16} color="#666" />
              <Text style={styles.contactText}>{personalInfo.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <Icon name="location-on" size={16} color="#666" />
              <Text style={styles.contactText}>{personalInfo.address}</Text>
            </View>
          </View>
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Work Experience</Text>
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Education</Text>
          {education.map((edu) => (
            <EducationCard key={edu.id} education={edu} />
          ))}
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Skills</Text>
          <Text style={styles.contactText}>{skills ?? "No skills added"}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={handleDownloadCV}
          >
            <Icon name="download" size={20} color="white" />
            <Text style={styles.downloadButtonText}>Download PDF</Text>
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
  headerContainer: {
    backgroundColor: "#FF8C42",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginRight: 12,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    marginTop: 4,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginLeft: 12,
  },
  scrollContainer: {
    padding: 16,
    flexGrow: 1,
  },
  personalInfoCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  profileTitle: {
    fontSize: 16,
    color: "#666",
  },
  contactInfo: {
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  summarySection: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  duration: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  educationFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  grade: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "600",
  },
  skillsContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  skillItem: {
    marginBottom: 12,
  },
  skillHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skillName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  skillLevel: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  skillLevelText: {
    fontSize: 12,
    color: "white",
    fontWeight: "500",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 12,
  },
  editButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF8C42",
    elevation: 2,
  },
  editButtonText: {
    color: "#FF8C42",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  downloadButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF8C42",
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
  },
  downloadButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default CVPage;
