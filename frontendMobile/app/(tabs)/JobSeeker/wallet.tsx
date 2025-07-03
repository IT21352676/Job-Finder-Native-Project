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

const WalletScreen = () => {
  const [activeNav, setActiveNav] = useState('Wallet');

  const goBack = () => {
    Alert.alert('Navigation', 'Going back to previous screen');
    console.log('Go back pressed');
  };

  const withdraw = () => {
    Alert.alert('Withdraw', 'Withdraw functionality would be implemented here');
    console.log('Withdraw pressed');
  };

  const handleNavPress = (navItem: React.SetStateAction<string>) => {
    setActiveNav(navItem);
    console.log(`Active section: ${navItem}`);
  };

  const transactionData = [
    {
      id: 1,
      date: '2024/06/28',
      amount: '8500.00',
      points: '+30 Points',
      totalAmount: '10000.00'
    },
    {
      id: 2,
      date: '2024/06/26',
      amount: '9000.00',
      points: '+35 Points',
      totalAmount: '9500.00'
    },
    {
      id: 3,
      date: '2024/06/10',
      amount: '500.00',
      points: '+15 Points',
      totalAmount: '1000.00'
    },
    {
      id: 4,
      date: '2024/05/28',
      amount: '2400.00',
      points: '+2 Points',
      totalAmount: '2500.00'
    },
  ];

  const navItems = [
    { id: 'Home', icon: '🏠', text: 'Home' },
    { id: 'Jobs', icon: '💼', text: 'Jobs' },
    { id: 'Wallet', icon: '💳', text: 'Wallet' },
    { id: 'Profile', icon: '👤', text: 'Profile' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF8C42" barStyle="light-content" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={goBack}>
            <Text style={styles.backBtnText}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>My Wallet</Text>
            <Text style={styles.headerSubtitle}>Your Finances in Control</Text>
          </View>
        </View>

        {/* Wallet Card */}
        <View style={styles.walletCard}>
          <Text style={styles.balanceDate}>Balance on 2024/06/28</Text>
          
          <View style={styles.balanceContainer}>
            <View style={styles.balanceOverlay} />
            <Text style={styles.balanceAmount}>Rs. 138,200.00</Text>
            <Text style={styles.balancePoints}>⭐ 58</Text>
          </View>

          <TouchableOpacity style={styles.withdrawBtn} onPress={withdraw}>
            <Text style={styles.withdrawBtnText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        {/* Transaction History */}
        <View style={styles.transactionHistory}>
          <Text style={styles.historyTitle}>Transaction History</Text>
          
          {transactionData.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionInfo}>
                <View style={styles.transactionIcon}>
                  <Text style={styles.pointsIcon}>⭐</Text>
                </View>
                <View>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                  <Text style={styles.transactionAmount}>{transaction.amount}</Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={styles.transactionStatus}>{transaction.points}</Text>
                <Text style={styles.transactionAmount}>{transaction.totalAmount}</Text>
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
            <Text style={styles.navIcon}>{item.icon}</Text>
            <Text style={[
              styles.navText,
              activeNav === item.id && styles.navTextActive
            ]}>
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 90, // Space for bottom nav
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  backBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  backBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  walletCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  balanceDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
  },
  balanceContainer: {
    backgroundColor: '#FF8C42',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  balanceOverlay: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 60,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 30,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  balancePoints: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  withdrawBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  withdrawBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionHistory: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  transactionIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsIcon: {
    color: '#FF8C42',
    fontSize: 14,
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionStatus: {
    fontSize: 12,
    color: '#4CAF50',
    marginBottom: 2,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#999',
  },
  navTextActive: {
    color: '#FF8C42',
  },
});

export default WalletScreen;