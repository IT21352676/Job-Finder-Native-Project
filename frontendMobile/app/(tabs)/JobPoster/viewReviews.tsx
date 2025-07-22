import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

const ViewReviews = () => {
  const [userData, setUserData] = useState<User>({} as User);
  const [reviews, setReviews] = useState([] as any);
  const [loading, setLoading] = useState(true);

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

  const fetchReviews = async () => {
    const user_id = userData.id;
    try {
      const res = await fetch(
        `http://localhost:8000/mobile/secured/get-job-reviews-by-user/${user_id}`
      );
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };
  console.log(reviews);
  useEffect(() => {
    if (userData.id) {
      fetchReviews();
    }
  }, [userData.id]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Reviews</Text>

      {reviews.map((item: any) => (
        <View style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewerName}>
              Review id : {item?.review_id}
            </Text>
            <Text style={styles.reviewerName}>Job id :{item?.job_id}</Text>
            <View style={styles.ratingContainer}>
              <Feather name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
          <Text style={styles.reviewText}>Review : {item.review}</Text>
          <Text>By user id : {item.user_id}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    padding: 20,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFD700",
    marginLeft: 4,
  },
  reviewText: {
    fontSize: 14,
    color: "#555",
    marginTop: 8,
    marginBottom: 6,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
  },
  noReviewsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 50,
  },
});

export default ViewReviews;
