import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";

interface CountdownProps {
  applicationId: number;
  jobId: number;
  onComplete?: () => void;
  style?: any;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const JobCountdown: React.FC<CountdownProps> = ({
  applicationId,
  jobId,
  onComplete,
  style,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const JOB_COMPLETE_API_URL =
    "http://localhost:8000/mobile/secured/application/job-complete";

  // Fetch job completion data
  const fetchJobData = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setError("Authentication token not found");
        return;
      }

      const response = await fetch(JOB_COMPLETE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          application_id: applicationId,
          job_id: jobId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch job data");
      }

      const data = await response.json();

      if (data && data.length > 0) {
        const jobDate = new Date(data[0].job_date);
        startCountdown(jobDate);
      } else {
        setError("No job data found");
      }
    } catch (error: any) {
      console.error("Error fetching job data:", error);
      setError("Failed to load countdown data");
    } finally {
      setIsLoading(false);
    }
  };

  // Start countdown timer
  const startCountdown = (targetDate: Date) => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        // Countdown completed
        setIsCompleted(true);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });

        if (onComplete) {
          onComplete();
        }

        Alert.alert("Job Completed!", "The job deadline has been reached.", [
          { text: "OK" },
        ]);
      }
    };

    // Update immediately
    updateCountdown();

    // Set interval to update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    fetchJobData();
  }, [applicationId, jobId]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    if (!isLoading && !error) {
      // The cleanup function will be returned from startCountdown
      // We'll handle the interval cleanup in the component unmount
    }

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [isLoading, error]);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer, style]}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer, style]}>
        <Feather name="alert-circle" size={16} color="#F44336" />
        <Text style={styles.errorText}>Error</Text>
      </View>
    );
  }

  if (isCompleted) {
    return (
      <View style={[styles.container, styles.completedContainer, style]}>
        <Feather name="check-circle" size={16} color="#4CAF50" />
        <Text style={styles.completedText}>Completed</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <Feather name="clock" size={14} color="#FF8C42" />
      </View>
      <View style={styles.timeContainer}>
        {timeRemaining.days > 0 && (
          <View style={styles.timeUnit}>
            <Text style={styles.timeValue}>{timeRemaining.days}</Text>
            <Text style={styles.timeLabel}>d</Text>
          </View>
        )}
        <View style={styles.timeUnit}>
          <Text style={styles.timeValue}>
            {timeRemaining.hours.toString().padStart(2, "0")}
          </Text>
          <Text style={styles.timeLabel}>h</Text>
        </View>
        <View style={styles.timeUnit}>
          <Text style={styles.timeValue}>
            {timeRemaining.minutes.toString().padStart(2, "0")}
          </Text>
          <Text style={styles.timeLabel}>m</Text>
        </View>
        <View style={styles.timeUnit}>
          <Text style={styles.timeValue}>
            {timeRemaining.seconds.toString().padStart(2, "0")}
          </Text>
          <Text style={styles.timeLabel}>s</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(255, 140, 66, 0.2)",
  },
  loadingContainer: {
    justifyContent: "center",
  },
  errorContainer: {
    backgroundColor: "rgba(244, 67, 54, 0.1)",
    borderColor: "rgba(244, 67, 54, 0.3)",
  },
  completedContainer: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    borderColor: "rgba(76, 175, 80, 0.3)",
  },
  iconContainer: {
    marginRight: 8,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeUnit: {
    alignItems: "center",
    marginRight: 8,
  },
  timeValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF8C42",
    lineHeight: 16,
  },
  timeLabel: {
    fontSize: 10,
    color: "#666",
    fontWeight: "500",
    marginTop: -2,
  },
  loadingText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  errorText: {
    fontSize: 12,
    color: "#F44336",
    fontWeight: "500",
    marginLeft: 4,
  },
  completedText: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "600",
    marginLeft: 4,
  },
});

export default JobCountdown;
