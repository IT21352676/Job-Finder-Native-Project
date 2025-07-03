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

const HomeDashboard = () => {
  const [activeNav, setActiveNav] = useState('Home');

  const navigate = (section: string) => {
    Alert.alert('Navigation', `Navigating to ${section.charAt(0).toUpperCase() + section.slice(1)} section`);
    console.log(`Navigate to: ${section}`);
  };

  const handleNavPress = (navItem: React.SetStateAction<string>) => {
    setActiveNav(navItem);
    console.log(`Active section: ${navItem}`);
  };

  const menuItems = [
    { id: 'jobs', icon: '💼', text: 'JOBS' },
    { id: 'customers', icon: '👥', text: 'CUSTOMERS' },
    { id: 'products', icon: '📦', text: 'PRODUCTS' },
    { id: 'wallet', icon: '💳', text: 'MY WALLET' },
    { id: 'chat', icon: '💬', text: 'CHAT WITH US' },
    { id: 'profile', icon: '👤', text: 'MY PROFILE' },
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
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Hello Ramel</Text>
            <Text style={styles.userName}>Good Afternoon</Text>
          </View>
          <View style={styles.notificationIcons}>
            <TouchableOpacity style={styles.notificationIcon}>
              <Text style={styles.notificationEmoji}>🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationIcon}>
              <Text style={styles.notificationEmoji}>📧</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationIcon}>
              <Text style={styles.notificationEmoji}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>Rs. 25,000</Text>
        </View>

        {/* Menu Grid */}
        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => navigate(item.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuText}>{item.text}</Text>
            </TouchableOpacity>
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  userName: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
  notificationIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  notificationIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationEmoji: {
    fontSize: 16,
  },
  balanceCard: {
    backgroundColor: '#4CAF50',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  balanceLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  menuGrid: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    backgroundColor: '#FF8C42',
    borderRadius: 15,
    padding: 20,
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#FF8C42',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  menuIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  menuText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    lineHeight: 12,
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

export default HomeDashboard;