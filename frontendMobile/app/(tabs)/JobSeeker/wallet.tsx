import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  StatusBar,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const transactionData = [
  {
    id: 1,
    date: '2024/06/28',
    amount: 'Rs. 8,500.00',
    points: '+30 Points',
    totalAmount: 'Rs. 10,000.00',
  },
  {
    id: 2,
    date: '2024/06/26',
    amount: 'Rs. 9,000.00',
    points: '+35 Points',
    totalAmount: 'Rs. 9,500.00',
  },
  {
    id: 3,
    date: '2024/06/10',
    amount: 'Rs. 500.00',
    points: '+15 Points',
    totalAmount: 'Rs. 1,000.00',
  },
  {
    id: 4,
    date: '2024/05/28',
    amount: 'Rs. 2,400.00',
    points: '+2 Points',
    totalAmount: 'Rs. 2,500.00',
  },
];

const navItems = [
  { id: 'Home', icon: 'home', text: 'Home' },
  { id: 'Jobs', icon: 'briefcase', text: 'Jobs' },
  { id: 'Wallet', icon: 'credit-card', text: 'Wallet' },
  { id: 'Profile', icon: 'user', text: 'Profile' },
];

const WalletScreen: React.FC = () => {
  const [activeNav, setActiveNav] = useState<string>('Wallet');

  const goBack = () => {
    Alert.alert('Navigation', 'Going back to previous screen');
  };

  const withdraw = () => {
    Alert.alert('Withdraw', 'Withdraw functionality initiated');
  };

  const handleNavPress = (navItem: string) => {
    setActiveNav(navItem);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF8C42" barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={goBack}>
            <Feather name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>My Wallet</Text>
            <Text style={styles.headerSubtitle}>Your Finances in Control</Text>
          </View>
        </View>

        {/* Wallet Card + Withdraw */}
        <View style={styles.walletCard}>
          <Text style={styles.balanceDate}>Balance on 2024/06/28</Text>

          <View style={styles.balanceContainer}>
            <View style={styles.balanceOverlay} />
            <Text style={styles.balanceAmount}>Rs. 138,200.00</Text>
            <Text style={styles.balancePoints}>⭐ 58</Text>
          </View>

          <TouchableOpacity style={styles.withdrawBtn} onPress={withdraw}>
            <Text style={styles.withdrawBtnText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionHistory}>
          <Text style={styles.historyTitle}>Recent Transactions</Text>

          {transactionData.map((t) => (
            <View key={t.id} style={styles.transactionItem}>
              <View style={styles.transactionInfo}>
                <View style={styles.transactionIcon}>
                  <Text style={styles.pointsIcon}>⭐</Text>
                </View>
                <View>
                  <Text style={styles.transactionDate}>{t.date}</Text>
                  <Text style={styles.transactionAmount}>{t.amount}</Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={styles.transactionStatus}>{t.points}</Text>
                <Text style={styles.transactionAmount}>{t.totalAmount}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.navItem}
            onPress={() => handleNavPress(item.id)}
            activeOpacity={0.7}
          >
            <Feather
              name={item.icon as any}
              size={20}
              color={activeNav === item.id ? '#FF8C42' : '#999'}
            />
            <Text style={[styles.navText, activeNav === item.id && styles.navTextActive]}>
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    backgroundColor: '#FF8C42',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  headerContent: { flex: 1 },
  headerTitle: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  headerSubtitle: { color: 'rgba(255,255,255,0.9)', fontSize: 14 },

  walletCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 6,
  },
  balanceDate: { fontSize: 12, color: '#666', marginBottom: 10 },
  balanceContainer: {
    backgroundColor: '#FF8C42',
    padding: 20,
    borderRadius: 15,
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceOverlay: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 60,
    height: 120,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 30,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  balancePoints: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  withdrawBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  withdrawBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },

  transactionHistory: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 6,
  },
  historyTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15 },

  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  transactionInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  transactionIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff3e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  pointsIcon: { fontSize: 14, color: '#FF8C42' },
  transactionDate: { fontSize: 12, color: '#666' },
  transactionAmount: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  transactionRight: { alignItems: 'flex-end' },
  transactionStatus: { fontSize: 12, color: '#4CAF50' },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    elevation: 6,
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 10, color: '#999' },
  navTextActive: { color: '#FF8C42' },
});
