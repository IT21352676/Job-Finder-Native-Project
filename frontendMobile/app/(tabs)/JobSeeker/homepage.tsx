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

const HomeDashboard = () => {
  const [activeNav, setActiveNav] = useState('Home');

  const navigate = (section: string) => {
    Alert.alert('Navigation', `Navigating to ${section.toUpperCase()} section`);
  };

  const handleNavPress = (navItem: string) => {
    setActiveNav(navItem);
  };

  const menuItems = [
    { id: 'jobs', icon: 'briefcase', text: 'JOBS' },
    { id: 'customers', icon: 'users', text: 'CUSTOMERS' },
    { id: 'products', icon: 'package', text: 'PRODUCTS' },
    { id: 'wallet', icon: 'credit-card', text: 'MY WALLET' },
    { id: 'chat', icon: 'message-circle', text: 'CHAT WITH US' },
    { id: 'profile', icon: 'user', text: 'MY PROFILE' },
  ];

  const navItems = [
    { id: 'Home', icon: 'home', text: 'Home' },
    { id: 'Jobs', icon: 'briefcase', text: 'Jobs' },
    { id: 'Wallet', icon: 'credit-card', text: 'Wallet' },
    { id: 'Profile', icon: 'user', text: 'Profile' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF8C42" barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Hello Ramel</Text>
            <Text style={styles.userName}>Good Afternoon</Text>
          </View>
          <View style={styles.notificationIcons}>
            <TouchableOpacity style={styles.notificationIcon}>
              <Feather name="bell" size={18} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationIcon}>
              <Feather name="mail" size={18} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationIcon}>
              <Feather name="settings" size={18} color="white" />
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
              <Feather name={item.icon as any} size={26} color="white" />
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
            <Feather
              name={item.icon as any}
              size={22}
              color={activeNav === item.id ? '#FF8C42' : '#999'}
              style={styles.navIcon}
            />
            <Text
              style={[
                styles.navText,
                activeNav === item.id && styles.navTextActive,
              ]}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default HomeDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingBottom: 90,
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
    elevation: 6,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  userName: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  notificationIcons: {
    flexDirection: 'row',
  },
  notificationIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    elevation: 2,
  },
  balanceCard: {
    backgroundColor: '#4CAF50',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 10,
  },
  balanceLabel: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 6,
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  menuGrid: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    backgroundColor: '#FF8C42',
    borderRadius: 18,
    padding: 22,
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  menuText: {
    fontSize: 11,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 12,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navIcon: {
    marginBottom: 6,
  },
  navText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#999',
  },
  navTextActive: {
    color: '#FF8C42',
  },
});
