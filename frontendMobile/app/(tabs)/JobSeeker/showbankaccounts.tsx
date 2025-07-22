import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

const FETCH_BANK_ACCOUNTS =
  "http://localhost:8000/mobile/secured/bank/details/";

interface BankAccount {
  wallet_id: number;
  seeker_id: number;
  bank: string;
  holder: string;
  bankACC: string;
  branch: string;
  fundingSource: string;
  earnings: number;
}

const BankAccountsScreen = () => {
  // Sample bank accounts data - replace with your actual data management
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);

  const handleAddNewAccount = () => {
    // Navigate to CreateBankAccount screen
    console.log("Navigate to Create Bank Account");
  };

  const handleEditAccount = (accountId: number) => {
    console.log("Edit account:", accountId);
  };

  const handleDeleteAccount = (accountId: number) => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete this bank account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setBankAccounts(
              bankAccounts.filter((account) => account.wallet_id !== accountId)
            );
          },
        },
      ]
    );
  };

  useEffect(() => {
    const fetchBankDetails = async () => {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const user = JSON.parse(userJson!);
      const response = await fetch(FETCH_BANK_ACCOUNTS + `${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        alert("Something went wrong");
      }

      const data = await response.json();

      setBankAccounts(data.data);
    };

    fetchBankDetails();
  }, []);

  const BankAccountCard = ({ account }: { account: BankAccount }) => (
    <View style={styles.accountCard}>
      <View style={styles.cardHeader}>
        <View style={styles.bankIconSmall}>
          <Text style={styles.bankIconSmallText}>🏛️</Text>
        </View>
        <View style={styles.accountInfo}>
          <Text style={styles.accountHolder}>{account.holder}</Text>
          <Text style={styles.bankName}>{account.bank}</Text>
          <Text style={styles.branchName}>{account.branch}</Text>
        </View>
      </View>

      <View style={styles.accountDetails}>
        <Text style={styles.accountLabel}>Account Number</Text>
        <Text style={styles.accountNumber}>{account.bankACC}</Text>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEditAccount(account.wallet_id)}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteAccount(account.wallet_id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Bank Accounts</Text>
            <Text style={styles.subtitle}>Manage your bank accounts</Text>
          </View>
          <Link href="/(tabs)/JobPoster/homepage" asChild>
            <TouchableOpacity style={styles.homeButton}>
              <Feather name="home" size={24} color="white" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <ScrollView
        style={styles.accountsList}
        showsVerticalScrollIndicator={false}
      >
        {bankAccounts.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>🏛️</Text>
            </View>
            <Text style={styles.emptyTitle}>No Bank Accounts</Text>
            <Text style={styles.emptySubtitle}>
              You haven't added any bank accounts yet. Tap the button below to
              add your first account.
            </Text>
          </View>
        ) : (
          bankAccounts.map((account) => (
            <BankAccountCard key={account.wallet_id} account={account} />
          ))
        )}
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonIcon}>+</Text>
          <Link href="/(tabs)/JobSeeker/createbankaccount">
            <Text style={styles.addButtonText}>Add New Bank Account</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#FF8C42",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
  homeButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginLeft: 12,
  },
  accountsList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  accountCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  bankIconSmall: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFE4D6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#FF8C42",
  },
  bankIconSmallText: {
    fontSize: 20,
  },
  accountInfo: {
    flex: 1,
  },
  accountHolder: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  bankName: {
    fontSize: 16,
    color: "#FF8C42",
    fontWeight: "600",
    marginBottom: 2,
  },
  branchName: {
    fontSize: 14,
    color: "#666",
  },
  accountDetails: {
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 15,
    marginBottom: 15,
  },
  accountLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  accountNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    letterSpacing: 2,
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    flex: 1,
    backgroundColor: "#E8F4FD",
    borderRadius: 8,
    paddingVertical: 10,
    marginRight: 10,
    alignItems: "center",
  },
  editButtonText: {
    color: "#2196F3",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#FFEBEE",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#F44336",
    fontSize: 16,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFE4D6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#FF8C42",
    borderStyle: "dashed",
  },
  emptyIconText: {
    fontSize: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  addButton: {
    backgroundColor: "#FF8C42",
    borderRadius: 15,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF8C42",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  addButtonIcon: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginRight: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BankAccountsScreen;
