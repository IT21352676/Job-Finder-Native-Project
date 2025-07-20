import { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  TextInput,
} from "react-native";

type Poster = {
  firstname?: string;
  lastname?: string;
  emailAddress?: string;
  // add other properties as needed
};

const JobItem = ({ job }: any) => {
  const [posterData, setPosterData] = useState<Poster[]>([]);

  useEffect(() => {
    const fetchPosterDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/mobile/secured/job-poster/get-details/${job.poster_id}`
        );
        const data = await res.json();
        setPosterData(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (job.poster_id) {
      fetchPosterDetails();
    }
  }, [job.poster_id]);

  return (
    <>
      <Text>
        Poster : {posterData[0]?.firstname} {posterData[0]?.lastname}
      </Text>
      <Text>Poster Email : {posterData[0]?.emailAddress}</Text>
    </>
  );
};

export default JobItem;
