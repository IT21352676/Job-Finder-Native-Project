import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('seeker'); // 'seeker' or 'poster'

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    const userType = loginType === 'seeker' ? 'Job Seeker' : 'Job Poster';
    Alert.alert('Login Successful', `Welcome ${userType}!\n\nThis would navigate to the main app.`);
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'This would open the forgot password screen or send reset email.'
    );
  };

  const handleSignUp = () => {
    if (loginType === 'seeker') {
      Alert.alert('Navigate', 'This would open Job Seeker Registration screen');
    } else {
      Alert.alert('Navigate', 'This would open Job Poster Registration screen');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#ff8c42" />
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.mainScrollView}
          contentContainerStyle={styles.mainScrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header with Background Image */}
          <ImageBackground
            source={{ uri: 'https://img.freepik.com/free-photo/job-hiring-vacancy-team-interview-career-recruiting_53876-121268.jpg?semt=ais_items_boosted&w=740' }}
            style={styles.header}
            resizeMode="cover"
          >
            {/* Orange overlay to maintain the orange theme */}
            <View style={styles.overlay} />
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>JOBS</Text>
            </View>
          </ImageBackground>

          {/* Login Form */}
          <View style={styles.loginCard}>
            {/* Login Type Toggle */}
            <View style={styles.toggleContainer}>
              <TouchableOpacity 
                style={[styles.toggleButton, loginType === 'seeker' && styles.toggleButtonActive]}
                onPress={() => setLoginType('seeker')}
                activeOpacity={0.7}
              >
                <Text style={[styles.toggleButtonText, loginType === 'seeker' && styles.toggleButtonTextActive]}>
                  Seeker
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.toggleButton, loginType === 'poster' && styles.toggleButtonActive]}
                onPress={() => setLoginType('poster')}
                activeOpacity={0.7}
              >
                <Text style={[styles.toggleButtonText, loginType === 'poster' && styles.toggleButtonTextActive]}>
                  Poster
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Title */}
            <Text style={styles.loginTitle}>
              {loginType === 'seeker' ? 'Login as a Job Seeker' : 'Login as a Job Poster'}
            </Text>
            <Text style={styles.loginSubtitle}>
              Hello, Welcome to the Jobs
            </Text>

            {/* Username Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>User Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Enter your username"
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  secureTextEntry={true}
                />
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity 
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 140, 66, 0.7)',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  mainScrollView: {
    flex: 1,
  },
  mainScrollContent: {
    flexGrow: 1,
  },
  header: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 140, 66, 0.7)',
  },
  logoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'rgba(255, 140, 66, 1)',
    letterSpacing: 3,
    textAlign: 'center',
  },
  loginCard: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 35,
    paddingTop: 25,
    minHeight: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    padding: 4,
    marginBottom: 30,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#ff8c42',
    shadowColor: '#ff8c42',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
  },
  toggleButtonTextActive: {
    color: '#ffffff',
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 15,
    color: '#888',
    marginBottom: 40,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e8e8e8',
    borderRadius: 15,
    backgroundColor: '#fafafa',
    minHeight: 55,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 15,
    color: '#333',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 35,
    marginTop: 5,
  },
  forgotPasswordText: {
    fontSize: 13,
    color: '#ff8c42',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#ff8c42',
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    shadowColor: '#ff8c42',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signUpText: {
    fontSize: 14,
    color: '#888',
  },
  signUpLink: {
    fontSize: 14,
    color: '#ff8c42',
    fontWeight: '600',
  },
});