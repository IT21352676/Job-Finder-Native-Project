import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Alert,
} from 'react-native';

const WalletApp = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [amount, setAmount] = useState('');
  const [activeNav, setActiveNav] = useState('Wallet');

  const goBack = () => {
    Alert.alert('Navigation', 'Going back to previous screen');
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const addCoins = () => {
    if (amount && parseFloat(amount) > 0) {
      Alert.alert('Success', `Adding ${amount} coins to your wallet`);
      setAmount('');
      closeModal();
    } else {
      Alert.alert('Error', 'Please enter a valid amount');
    }
  };

  const withdraw = () => {
    Alert.alert('Withdraw', 'Opening withdrawal form');
    closeModal();
  };

  const setActiveNavItem = (navItem: React.SetStateAction<string>) => {
    setActiveNav(navItem);
  };

  type NavItemProps = {
  icon: string;
  text: string;
  isActive: boolean;
  onPress: () => void;
};

  const NavItem: React.FC<NavItemProps> = ({ icon, text, isActive, onPress }) => (
    <TouchableOpacity
      style={styles.navItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.navIcon, isActive && styles.activeNavIcon]}>
        {icon}
      </Text>
      <Text style={[styles.navText, isActive && styles.activeNavText]}>
        {text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF8C42" />

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
          <Text style={styles.balanceAmount}>Rs. 138,200.00</Text>
          <Text style={styles.balancePoints}>⭐ 58</Text>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <NavItem
          icon="🏠"
          text="Home"
          isActive={activeNav === 'Home'}
          onPress={() => setActiveNavItem('Home')}
        />
        <NavItem
          icon="💼"
          text="Jobs"
          isActive={activeNav === 'Jobs'}
          onPress={() => setActiveNavItem('Jobs')}
        />
        <NavItem
          icon="💳"
          text="Wallet"
          isActive={activeNav === 'Wallet'}
          onPress={() => setActiveNavItem('Wallet')}
        />
        <NavItem
          icon="👤"
          text="Profile"
          isActive={activeNav === 'Profile'}
          onPress={() => setActiveNavItem('Profile')}
        />
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalClose} onPress={closeModal}>
              <Text style={styles.modalCloseText}>×</Text>
            </TouchableOpacity>

            <View style={styles.amountInputContainer}>
              <TextInput
                style={styles.amountInput}
                placeholder="00.00"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
              <View style={styles.amountUnderline} />
            </View>

            <TouchableOpacity onPress={addCoins} activeOpacity={0.8} style={styles.button}>
              <Text style={styles.buttonText}>Add Coins</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={withdraw} activeOpacity={0.8} style={[styles.button, styles.withdraw]}>
              <Text style={styles.buttonText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8C42',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  backBtn: {
    marginRight: 15,
    padding: 5,
  },
  backBtnText: {
    color: 'white',
    fontSize: 20,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFF',
  },
  walletCard: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 5,
  },
  balanceDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  balanceContainer: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#FFE0C2',
    alignItems: 'center',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  balancePoints: {
    fontSize: 14,
    color: '#555',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    backgroundColor: '#FFF',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 20,
    color: '#999',
  },
  activeNavIcon: {
    color: '#FF8C42',
  },
  navText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#999',
  },
  activeNavText: {
    color: '#FF8C42',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    width: '90%',
    maxWidth: 350,
    position: 'relative',
  },
  modalClose: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  modalCloseText: {
    fontSize: 24,
    color: '#666',
  },
  amountInputContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  amountInput: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    width: '100%',
    marginBottom: 10,
  },
  amountUnderline: {
    height: 2,
    backgroundColor: '#E0E0E0',
    width: '80%',
  },
  button: {
    backgroundColor: '#FF8C42',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  withdraw: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WalletApp;
