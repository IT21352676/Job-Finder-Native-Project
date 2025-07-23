import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const JOB_DETAILS_FETCH =
  "http://localhost:8000/mobile/secured/job-poster/get-job/";

const PAYMENT_API = "http://localhost:8000/mobile/secured/payment";

const PaymentPage = () => {
  const { jobId } = useLocalSearchParams();
  const { seekerId } = useLocalSearchParams();

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [skrillEmail, setSkrillEmail] = useState("");
  const [selectedBankAccount, setSelectedBankAccount] = useState("");
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [newBankAccountName, setNewBankAccountName] = useState("");
  const [newBankAccountNumber, setNewBankAccountNumber] = useState("");
  const [newBankName, setNewBankName] = useState("");
  const [newRoutingNumber, setNewRoutingNumber] = useState("");

  // Sample bank accounts (in a real app, this would come from user's profile)
  const [bankAccounts, setBankAccounts] = useState([
    {
      id: "1",
      name: "Chase Checking",
      accountNumber: "****1234",
      bankName: "Chase Bank",
    },
    {
      id: "2",
      name: "Wells Fargo Savings",
      accountNumber: "****5678",
      bankName: "Wells Fargo",
    },
  ]);

  const handleAddBankAccount = () => {
    if (newBankAccountName && newBankAccountNumber && newBankName) {
      const newAccount = {
        id: Date.now().toString(),
        name: newBankAccountName,
        accountNumber: `****${newBankAccountNumber.slice(-4)}`,
        bankName: newBankName,
      };
      setBankAccounts([...bankAccounts, newAccount]);
      setSelectedBankAccount(newAccount.id);
      setShowAddBankModal(false);
      // Reset form
      setNewBankAccountName("");
      setNewBankAccountNumber("");
      setNewBankName("");
      setNewRoutingNumber("");
    }
  };

  interface JobParams {
    job_id: number;
    poster_id: number;
    title: string;
    description: string;
    gender: string;
    status: string;
    work_hours: string;
    posted_date: string;
    job_date: string;
    start_date: string;
    amount_of_seekers: number;
    hourly_title: string;
    location: string;
    requirements: string[];
  }

  const [jobsData, setJobData] = useState<JobParams>();

  const handlePayment = async (amount: number, job_id: any, seeker_id: any) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const user = JSON.parse(userJson!);
      const response = await fetch(PAYMENT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          poster_id: user.id,
          amount,
          job_id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to complete the payment");
      }

      alert("Payment completed");
      router.push({
        pathname: "/(tabs)/JobPoster/paymentsuccess",
        params: { amount: jobsData?.hourly_title },
      });
    } catch (error: any) {
      console.error("Error completing payment:", error);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(JOB_DETAILS_FETCH + `${jobId}`, {
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
          setJobData(jobData);
          console.log(jobData);

          // setTitle(jobData.title);
          // setDescription(jobData.description);
          // setGender(jobData.gender);
          // setWork_hours(String(jobData.work_hours));
          // set_Jobdate(jobData.job_date);
          // setStart_date(jobData.start_date);
          // setAmount_of_seekers(String(jobData.amount_of_seekers));
          // setHourly_rate(jobData.hourly_title);
          // setLocation(jobData.location);
          // setRequirements(jobData.requirements);
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
          <Text style={styles.headerTitle}>Payment</Text>
        </View>

        <View style={styles.orderSummary}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Job Posting Fee</Text>
            <Text style={styles.summaryValue}>{jobsData?.hourly_title}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service Fee</Text>
            {`$ ${((Number(jobsData?.hourly_title) || 0) * 0.1).toFixed(2)}`}
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Amount</Text>
            {`$ ${Number(jobsData?.hourly_title).toFixed(2)}`}
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          <View style={styles.paymentMethodContainer}>
            <TouchableOpacity
              style={styles.paymentMethodOption}
              onPress={() => setSelectedPaymentMethod("card")}
            >
              <View
                style={[
                  styles.radioButton,
                  selectedPaymentMethod === "card" && styles.radioSelected,
                ]}
              />
              <Text style={styles.paymentMethodLabel}>Credit/Debit Card</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.paymentMethodOption}
              onPress={() => setSelectedPaymentMethod("skrill")}
            >
              <View
                style={[
                  styles.radioButton,
                  selectedPaymentMethod === "skrill" && styles.radioSelected,
                ]}
              />
              <Text style={styles.paymentMethodLabel}>Skrill</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.paymentMethodOption}
              onPress={() => setSelectedPaymentMethod("bank")}
            >
              <View
                style={[
                  styles.radioButton,
                  selectedPaymentMethod === "bank" && styles.radioSelected,
                ]}
              />
              <Text style={styles.paymentMethodLabel}>Bank Account</Text>
            </TouchableOpacity>
          </View>

          {selectedPaymentMethod === "card" && (
            <View style={styles.cardDetailsContainer}>
              <Text style={styles.label}>Cardholder Name</Text>
              <TextInput
                style={styles.input}
                value={cardholderName}
                onChangeText={setCardholderName}
                placeholder="Enter cardholder name"
              />

              <Text style={styles.label}>Card Number</Text>
              <TextInput
                style={styles.input}
                value={cardNumber}
                onChangeText={setCardNumber}
                placeholder="1234 5678 9012 3456"
                keyboardType="numeric"
              />

              <View style={styles.cardRowContainer}>
                <View style={styles.cardRowItem}>
                  <Text style={styles.label}>Expiry Date</Text>
                  <TextInput
                    style={styles.input}
                    value={expiryDate}
                    onChangeText={setExpiryDate}
                    placeholder="MM/YY"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.cardRowItem}>
                  <Text style={styles.label}>CVV</Text>
                  <TextInput
                    style={styles.input}
                    value={cvv}
                    onChangeText={setCvv}
                    placeholder="123"
                    keyboardType="numeric"
                    secureTextEntry
                  />
                </View>
              </View>
            </View>
          )}

          {selectedPaymentMethod === "skrill" && (
            <View style={styles.skrillContainer}>
              <Text style={styles.label}>Skrill Email</Text>
              <TextInput
                style={styles.input}
                value={skrillEmail}
                onChangeText={setSkrillEmail}
                placeholder="Enter your Skrill email address"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <View style={styles.alternativePaymentContainer}>
                <Text style={styles.alternativePaymentText}>
                  You will be redirected to Skrill to complete your payment
                  securely.
                </Text>
              </View>
            </View>
          )}

          {selectedPaymentMethod === "bank" && (
            <View style={styles.bankAccountContainer}>
              <Text style={styles.label}>Select Bank Account</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedBankAccount}
                  onValueChange={setSelectedBankAccount}
                  style={styles.picker}
                >
                  <Picker.Item label="Select a bank account" value="" />
                  {bankAccounts.map((account) => (
                    <Picker.Item
                      key={account.id}
                      label={`${account.name} - ${account.accountNumber}`}
                      value={account.id}
                    />
                  ))}
                </Picker>
              </View>

              <TouchableOpacity
                style={styles.addBankButton}
                onPress={() => setShowAddBankModal(true)}
              >
                <Text style={styles.addBankButtonText}>
                  + Add New Bank Account
                </Text>
              </TouchableOpacity>

              {selectedBankAccount && (
                <View style={styles.alternativePaymentContainer}>
                  <Text style={styles.alternativePaymentText}>
                    Payment will be processed through your selected bank
                    account.
                  </Text>
                </View>
              )}
            </View>
          )}

          <TouchableOpacity
            style={styles.payButton}
            onPress={() =>
              handlePayment(
                Number(parseFloat(jobsData?.hourly_title || "0").toFixed(2)),
                jobId,
                seekerId
              )
            }
          >
            <Text style={styles.payButtonText}>{`$ ${Number(
              jobsData?.hourly_title
            ).toFixed(2)}`}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add Bank Account Modal */}
      <Modal
        visible={showAddBankModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddBankModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Bank Account</Text>

            <Text style={styles.label}>Account Name</Text>
            <TextInput
              style={styles.input}
              value={newBankAccountName}
              onChangeText={setNewBankAccountName}
              placeholder="e.g., My Checking Account"
            />

            <Text style={styles.label}>Account Number</Text>
            <TextInput
              style={styles.input}
              value={newBankAccountNumber}
              onChangeText={setNewBankAccountNumber}
              placeholder="Enter account number"
              keyboardType="numeric"
            />

            <Text style={styles.label}>Bank Name</Text>
            <TextInput
              style={styles.input}
              value={newBankName}
              onChangeText={setNewBankName}
              placeholder="Enter bank name"
            />

            <Text style={styles.label}>Routing Number</Text>
            <TextInput
              style={styles.input}
              value={newRoutingNumber}
              onChangeText={setNewRoutingNumber}
              placeholder="Enter routing number"
              keyboardType="numeric"
            />

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddBankModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddBankAccount}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  orderSummary: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#666",
  },
  summaryValue: {
    fontSize: 16,
    color: "#333",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF8C42",
  },
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  paymentMethodContainer: {
    marginBottom: 20,
  },
  paymentMethodOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
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
  paymentMethodLabel: {
    fontSize: 16,
    color: "#333",
  },
  cardDetailsContainer: {
    marginBottom: 20,
  },
  skrillContainer: {
    marginBottom: 20,
  },
  bankAccountContainer: {
    marginBottom: 20,
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
  cardRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardRowItem: {
    flex: 1,
    marginRight: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "white",
  },
  picker: {
    height: 50,
  },
  addBankButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderStyle: "dashed",
  },
  addBankButtonText: {
    color: "#FF8C42",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  alternativePaymentContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  alternativePaymentText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  payButton: {
    backgroundColor: "#FF8C42",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 20,
  },
  payButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: "#FF8C42",
    marginLeft: 10,
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PaymentPage;
