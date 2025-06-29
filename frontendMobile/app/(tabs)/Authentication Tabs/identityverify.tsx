// IdentityVerification.tsx
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';

const { width } = Dimensions.get('window');

type CardType = 'FRONT' | 'BACK';

interface IdentityVerificationProps {
  navigation?: any; // Replace with your navigation type
}

const IdentityVerification: React.FC<IdentityVerificationProps> = ({ navigation }) => {
  const [selectedCard, setSelectedCard] = useState<CardType>('FRONT');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentCardType, setCurrentCardType] = useState<CardType>('FRONT');

  const handleCardSelect = (cardType: CardType): void => {
    setSelectedCard(cardType);
    setCurrentCardType(cardType);
    setShowUploadModal(true);
  };



  const handleChooseFromGallery = (): void => {
    setShowUploadModal(false);
    Alert.alert('Gallery', `Opening gallery to select ${currentCardType} side`);
    // Add your gallery logic here
  };

  const handleFinish = (): void => {
    // Navigate to next screen or handle finish logic
    console.log('Proceeding with selected card:', selectedCard);
    // navigation.navigate('NextScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Icon Container */}
        <View style={styles.iconContainer}>
          <View style={styles.faceIcon}>
            <View style={styles.faceHair} />
          </View>
          <View style={styles.scanFrame}>
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />
          </View>
        </View>

        {/* Text Content */}
        <Text style={styles.subtitle}>
          Your mobile number and Email verification is successful
        </Text>
        <Text style={styles.title}>Identity Verification</Text>
        <Text style={styles.description}>
          As the final step please upload your identity document
        </Text>

        {/* Card Options */}
        <View style={styles.cardOptions}>
          <TouchableOpacity
            style={[
              styles.cardOption,
              selectedCard === 'FRONT' && styles.selectedCard,
            ]}
            onPress={() => handleCardSelect('FRONT')}
          >
            <View style={styles.cardIcon} />
            <Text style={styles.cardText}>FRONT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.cardOption,
              selectedCard === 'BACK' && styles.selectedCard,
            ]}
            onPress={() => handleCardSelect('BACK')}
          >
            <View style={styles.cardIcon} />
            <Text style={styles.cardText}>BACK</Text>
          </TouchableOpacity>
        </View>

        {/* Finish Button */}
        <Link href="/(tabs)/Authentication Tabs/askverificationtype">
            <TouchableOpacity style={styles.finishButton}>
            <Text style={styles.finishButtonText}>Finish</Text>
            </TouchableOpacity>
        </Link>
      </View>

      {/* Upload Modal */}
      <Modal
        visible={showUploadModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowUploadModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Upload {currentCardType} Side</Text>
            <Text style={styles.modalSubtitle}>
              Choose how you want to upload your document
            </Text>

            <TouchableOpacity
              style={styles.uploadOption}
              onPress={handleChooseFromGallery}
            >
              <View style={styles.uploadIcon}>
                <Text style={styles.uploadIconText}>🖼️</Text>
              </View>
              <Text style={styles.uploadOptionText}>Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowUploadModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
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
    backgroundColor: '#ff8c42',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#ff8c42',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  faceIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
  faceHair: {
    width: 24,
    height: 16,
    backgroundColor: '#333',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  scanFrame: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
  },
  cornerTopLeft: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 15,
    height: 15,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'white',
  },
  cornerTopRight: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 15,
    height: 15,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: 'white',
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: 15,
    height: 15,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'white',
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 15,
    height: 15,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: 'white',
  },
  subtitle: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
  },
  title: {
    color: '#333',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
  },
  cardOptions: {
    flexDirection: 'row',
    width: '100%',
    gap: 15,
    marginBottom: 30,
  },
  cardOption: {
    flex: 1,
    padding: 20,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  selectedCard: {
    borderColor: '#ff8c42',
    backgroundColor: '#FFF5F3',
  },
  cardIcon: {
    width: 30,
    height: 20,
    backgroundColor: '#ddd',
    borderRadius: 3,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  finishButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#ff8c42',
    borderRadius: 10,
    alignItems: 'center',
  },
  finishButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  uploadOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 15,
  },
  uploadIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#ff8c42',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  uploadIconText: {
    fontSize: 18,
  },
  uploadOptionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  cancelButton: {
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default IdentityVerification;