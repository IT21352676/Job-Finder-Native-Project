import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
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

interface Review {
  review_id: number;
  job_id: number;
  user_id: number;
  rating: number;
  review: string;
  created_at?: string;
}

const ViewReviews = () => {
  const [userData, setUserData] = useState<User>({} as User);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStoredData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");

      if (token && userJson) {
        const user = JSON.parse(userJson);
        console.log("Auto-login user:", user.firstname);
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

  const fetchReviews = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    const user_id = userData.id;
    try {
      const res = await fetch(
        `http://localhost:8000/mobile/secured/get-job-reviews-by-user/${user_id}`
      );
      const data = await res.json();
      console.log(data);
      setReviews(data || []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setReviews([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (userData.id) {
      fetchReviews();
    }
  }, [userData.id]);

  const onRefresh = () => {
    if (userData.id) {
      fetchReviews(true);
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <View style={styles.starsContainer}>
        {/* Full stars */}
        {Array.from({ length: fullStars }, (_, i) => (
          <Feather key={`full-${i}`} name="star" size={14} color="#FFD700" />
        ))}
        {/* Half star */}
        {hasHalfStar && (
          <Feather
            name="star"
            size={14}
            color="#FFD700"
            style={{ opacity: 0.5 }}
          />
        )}
        {/* Empty stars */}
        {Array.from({ length: emptyStars }, (_, i) => (
          <Feather key={`empty-${i}`} name="star" size={14} color="#E0E0E0" />
        ))}
      </View>
    );
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const renderReviewItem = ({ item }: { item: Review }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewInfo}>
          <Text style={styles.jobIdText}>Job #{item.job_id}</Text>
          <Text style={styles.reviewIdText}>Review #{item.review_id}</Text>
        </View>
        <View style={styles.ratingContainer}>
          {renderStars(item.rating)}
          <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
        </View>
      </View>

      <Text style={styles.reviewText}>
        {item.review || "No review text provided"}
      </Text>

      <View style={styles.reviewFooter}>
        <Text style={styles.reviewByText}>
          Reviewed by User #{item.user_id}
        </Text>
        {item.created_at && (
          <Text style={styles.timestamp}>
            {new Date(item.created_at).toLocaleDateString()}
          </Text>
        )}
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Feather name="message-circle" size={64} color="#E0E0E0" />
      <Text style={styles.emptyStateTitle}>No Reviews Yet</Text>
      <Text style={styles.emptyStateText}>
        You haven't received any reviews from job seekers yet.
      </Text>
      <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
        <Feather name="refresh-cw" size={16} color="#FF8C42" />
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.pageTitle}>My Reviews</Text>
      {reviews.length > 0 && (
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>{reviews.length}</Text>
            <Text style={styles.summaryLabel}>Total Reviews</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <View style={styles.averageRatingContainer}>
              <Text style={styles.summaryNumber}>
                {calculateAverageRating()}
              </Text>
              <Feather
                name="star"
                size={16}
                color="#FFD700"
                style={{ marginLeft: 4 }}
              />
            </View>
            <Text style={styles.summaryLabel}>Average Rating</Text>
          </View>
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF8C42" />
          <Text style={styles.loadingText}>Loading reviews...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={reviews}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.review_id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#FF8C42"]}
            tintColor="#FF8C42"
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  listContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  summaryContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryDivider: {
    width: 1,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 20,
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF8C42",
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  averageRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: "#FF8C42",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  reviewInfo: {
    flex: 1,
  },
  jobIdText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  reviewIdText: {
    fontSize: 12,
    color: "#666",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8F0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  starsContainer: {
    flexDirection: "row",
    marginRight: 6,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF8C42",
  },
  reviewText: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
    marginBottom: 12,
    fontStyle: "italic",
  },
  reviewFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingTop: 12,
  },
  reviewByText: {
    fontSize: 13,
    color: "#666",
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
  },
  emptyStateContainer: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1A1A1A",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8F0",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#FF8C42",
  },
  refreshButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF8C42",
    marginLeft: 8,
  },
});

export default ViewReviews;
