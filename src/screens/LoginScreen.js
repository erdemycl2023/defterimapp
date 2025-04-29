import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_ENDPOINTS from '../config/api';

const LoginScreen = ({ navigation }) => {
  const [musteriHizmetNo, setMusteriHizmetNo] = useState('MHN_');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    loadSavedCredentials();
  }, []);

  const loadSavedCredentials = async () => {
    try {
      const savedCredentials = await AsyncStorage.getItem('savedCredentials');
      if (savedCredentials) {
        const { musteriHizmetNo: savedMusteriNo, email: savedEmail, password: savedPassword } = JSON.parse(savedCredentials);
        setMusteriHizmetNo(savedMusteriNo);
        setEmail(savedEmail);
        setPassword(savedPassword);
        setRememberMe(true);
      }
    } catch (error) {
      console.error('Error loading saved credentials:', error);
    }
  };

  const handleLogin = async () => {
    if (musteriHizmetNo === 'MHN_' || email === '' || password === '') {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(API_ENDPOINTS.LOGIN, {
        musteriNo: musteriHizmetNo.replace('_', ''),
        eposta: email,
        sifre: password
      });

      if (response.data.sessionToken) {
        // Session token'ı AsyncStorage'a kaydet
        await AsyncStorage.setItem('userData', JSON.stringify(response.data));
        
        // Eğer "Beni Hatırla" seçiliyse bilgileri kaydet
        if (rememberMe) {
          await AsyncStorage.setItem('savedCredentials', JSON.stringify({
            musteriHizmetNo,
            email,
            password
          }));
        } else {
          // Eğer seçili değilse kaydedilmiş bilgileri temizle
          await AsyncStorage.removeItem('savedCredentials');
        }

        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        });
      } else {
        Alert.alert('Hata', response.data.message || 'Giriş başarısız');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Hata', 'Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#f5f8fa']}
        style={styles.gradient}
      >
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.welcomeText}>Hoş Geldiniz</Text>
            <Text style={styles.subtitleText}>Hesabınıza giriş yapın</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Müşteri Hizmet No</Text>
              <TextInput
                style={styles.input}
                placeholder="MHN_"
                keyboardType="numeric"
                value={musteriHizmetNo}
                onChangeText={text => {
                  if (text.startsWith('MHN_')) {
                    setMusteriHizmetNo(text);
                  } else if (text === '') {
                    setMusteriHizmetNo('MHN_');
                  }
                }}
                maxLength={16}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>E-posta</Text>
              <TextInput
                style={styles.input}
                placeholder="E-posta adresinizi giriniz"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Şifre</Text>
              <TextInput
                style={styles.input}
                placeholder="Şifrenizi giriniz"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.rememberMeContainer}>
              <TouchableOpacity 
                style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
                onPress={() => setRememberMe(!rememberMe)}
              >
                {rememberMe && <View style={styles.checkboxInner} />}
              </TouchableOpacity>
              <Text style={styles.rememberMeText}>Beni Hatırla</Text>
            </View>

            <TouchableOpacity
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.loginButtonText}>Giriş Yap</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#181C32',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#7E8299',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#181C32',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E4E6EF',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#E4E6EF',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    borderColor: '#009EF7',
    backgroundColor: '#009EF7',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  rememberMeText: {
    flex: 1,
    color: '#181C32',
  },
  loginButton: {
    backgroundColor: '#009EF7',
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonDisabled: {
    backgroundColor: '#A1A5B7',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginScreen;