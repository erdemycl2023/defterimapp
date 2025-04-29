import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert, Modal, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_ENDPOINTS from '../config/api';

const StatCard = ({ title, value, change, icon, color }) => (
  <View style={styles.statCard}>
    <LinearGradient
      colors={[color, color + '80']}
      style={styles.statCardGradient}
    >
      <View style={styles.statCardContent}>
        <View style={styles.statCardHeader}>
          <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
            <MaterialIcons name={icon} size={24} color={color} />
          </View>
          <Text style={styles.statCardTitle}>{title}</Text>
        </View>
        <Text style={styles.statCardValue}>{value}</Text>
        <View style={styles.statCardFooter}>
          <MaterialIcons 
            name={change >= 0 ? 'arrow-upward' : 'arrow-downward'} 
            size={16} 
            color={change >= 0 ? '#2ecc71' : '#e74c3c'} 
          />
          <Text style={[styles.changeText, { color: change >= 0 ? '#2ecc71' : '#e74c3c' }]}>
            {Math.abs(change)}% {change >= 0 ? 'artış' : 'azalış'}
          </Text>
        </View>
      </View>
    </LinearGradient>
  </View>
);

const NotificationItem = ({ notification }) => (
  <View style={styles.notificationItem}>
    <View style={[styles.notificationIcon, { backgroundColor: notification.color + '20' }]}>
      <MaterialIcons name={notification.icon} size={20} color={notification.color} />
    </View>
    <View style={styles.notificationContent}>
      <Text style={styles.notificationTitle}>{notification.title}</Text>
      <Text style={styles.notificationMessage}>{notification.message}</Text>
      <Text style={styles.notificationTime}>{notification.time}</Text>
    </View>
  </View>
);

const NavigationCard = ({ title, icon, color, onPress, subtitle }) => (
  <TouchableOpacity 
    style={styles.navigationCard}
    onPress={onPress}
  >
    <LinearGradient
      colors={[color, color + '80']}
      style={styles.navigationCardGradient}
    >
      <View style={styles.navigationCardContent}>
        <View style={[styles.navigationIconContainer, { backgroundColor: color + '20' }]}>
          <MaterialIcons name={icon} size={24} color={color} />
        </View>
        <Text style={styles.navigationCardTitle}>{title}</Text>
        {subtitle && <Text style={styles.navigationCardSubtitle}>{subtitle}</Text>}
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const DashboardScreen = ({ navigation }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    {
      id: '1',
      icon: 'message',
      color: '#009EF7',
      title: 'Yeni Defter',
      message: 'A firması için yeni defter oluşturuldu',
      time: '5 dakika önce'
    },
    {
      id: '2',
      icon: 'warning',
      color: '#F1416C',
      title: 'Dikkat',
      message: 'B firması defteri için son gönderim tarihi yaklaşıyor',
      time: '1 saat önce'
    },
    {
      id: '3',
      icon: 'check-circle',
      color: '#50CD89',
      title: 'Başarılı',
      message: 'C firması defteri başarıyla gönderildi',
      time: '2 saat önce'
    },
    {
      id: '4',
      icon: 'info',
      color: '#7239EA',
      title: 'Bilgi',
      message: 'Sistem güncellemesi yapıldı',
      time: '3 saat önce'
    },
    {
      id: '5',
      icon: 'error',
      color: '#F1416C',
      title: 'Hata',
      message: 'D firması defteri gönderilirken bir hata oluştu',
      time: '4 saat önce'
    },
    {
      id: '6',
      icon: 'message',
      color: '#009EF7',
      title: 'Yeni Defter',
      message: 'E firması için yeni defter oluşturuldu',
      time: '5 saat önce'
    },
    {
      id: '7',
      icon: 'warning',
      color: '#F1416C',
      title: 'Dikkat',
      message: 'F firması defteri için son gönderim tarihi yaklaşıyor',
      time: '6 saat önce'
    },
    {
      id: '8',
      icon: 'check-circle',
      color: '#50CD89',
      title: 'Başarılı',
      message: 'G firması defteri başarıyla gönderildi',
      time: '7 saat önce'
    },
    {
      id: '9',
      icon: 'info',
      color: '#7239EA',
      title: 'Bilgi',
      message: 'Yeni özellikler eklendi',
      time: '8 saat önce'
    },
    {
      id: '10',
      icon: 'error',
      color: '#F1416C',
      title: 'Hata',
      message: 'H firması defteri gönderilirken bir hata oluştu',
      time: '9 saat önce'
    }
  ]);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    validateSession();
  }, []);

  const validateSession = async () => {
    try {
      const storedData = await AsyncStorage.getItem('userData');
      if (!storedData) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
        return;
      }

      const { sessionToken, eposta } = JSON.parse(storedData);
      const response = await axios.post(API_ENDPOINTS.VALIDATE, {
        sessionToken,
        eposta
      });

      if (response.data.error === null) {
        // Yeni userData'yı AsyncStorage'a kaydet
        const newUserData = { ...JSON.parse(storedData), ...response.data };
        await AsyncStorage.setItem('userData', JSON.stringify(newUserData));
        setUserData(newUserData);
      } else {
        Alert.alert('Hata', 'Oturum geçersiz. Lütfen tekrar giriş yapın.');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    } catch (error) {
      console.error('Validate error:', error);
      Alert.alert('Hata', 'Oturum doğrulanırken bir hata oluştu.');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Çıkış Yap',
      'Çıkış yapmak istediğinize emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Çıkış Yap',
          style: 'destructive',
          onPress: async () => {
            try {
              const userData = await AsyncStorage.getItem('userData');
              if (userData) {
                const { sessionToken } = JSON.parse(userData);
                // Logout API çağrısı
                await axios.post(API_ENDPOINTS.LOGOUT, {
                  sessionToken
                });
              }
              // Local storage'ı temizle
              await AsyncStorage.removeItem('userData');
              // Login ekranına yönlendir
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              console.error('Error during logout:', error);
              Alert.alert('Hata', 'Çıkış yapılırken bir hata oluştu.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MaterialIcons name="home" size={28} color="#181C32" />
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={() => setShowNotifications(true)}
            >
              <MaterialIcons name="notifications" size={24} color="#181C32" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <MaterialIcons name="logout" size={24} color="#181C32" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Geçici olarak userData'yı gösteren bölüm */}
        {userData && (
          <View style={styles.userDataContainer}>
            <Text style={styles.userDataTitle}>User Data (Geçici)</Text>
            <Text style={styles.userDataText}>
              {JSON.stringify(userData, null, 2)}
            </Text>
          </View>
        )}

        <View style={styles.navigationContainer}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Firma Listesi</Text>
              <Text style={styles.cardSubtitle}>{userData?.firmaSayisi || 0} Firma</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>Firma listesini görüntülemek için tıklayın</Text>
            </View>
            <TouchableOpacity 
              style={styles.cardAction}
              onPress={() => navigation.navigate('FirmaListesi')}
            >
              <Text style={styles.cardActionText}>Firma Listesine Git</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>E-Defter Listesi</Text>
              <Text style={styles.cardSubtitle}>{userData?.defterSayisi || 0} Defter</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>E-Defter listesini görüntülemek için tıklayın</Text>
            </View>
            <TouchableOpacity 
              style={[styles.cardAction, { backgroundColor: '#7239EA' }]}
              onPress={() => navigation.navigate('EDefterListesi')}
            >
              <Text style={styles.cardActionText}>E-Defter Listesine Git</Text>
            </TouchableOpacity>
          </View>
          <NavigationCard
            title="Yevmiye"
            icon="receipt"
            color="#50CD89"
            onPress={() => navigation.navigate('Yevmiye')}
          />
          <NavigationCard
            title="Mizan"
            icon="account-balance"
            color="#F1416C"
            onPress={() => navigation.navigate('Mizan')}
          />
        </View>

      </ScrollView>

      <Modal
        visible={showNotifications}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowNotifications(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Bildirimler</Text>
              <TouchableOpacity 
                onPress={() => setShowNotifications(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color="#181C32" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={notifications}
              renderItem={({ item }) => <NotificationItem notification={item} />}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EF',
  },
  headerLeft: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#181C32',
  },
  notificationButton: {
    padding: 8,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logoutButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
  },
  statCardGradient: {
    flex: 1,
    padding: 16,
  },
  statCardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  statCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statCardTitle: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
  },
  statCardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    marginLeft: 4,
    fontSize: 12,
  },
  section: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181C32',
    marginBottom: 16,
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    color: '#181C32',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#7E8299',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EF',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181C32',
  },
  closeButton: {
    padding: 8,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EF',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181C32',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#7E8299',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#B5B5C3',
  },
  navigationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
  navigationCard: {
    flex: 1,
    minWidth: '45%',
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
  },
  navigationCardGradient: {
    flex: 1,
    padding: 16,
  },
  navigationCardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  navigationCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
  navigationCardSubtitle: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.8,
    marginTop: 4,
  },
  userDataContainer: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userDataTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  userDataText: {
    fontSize: 12,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  cardContent: {
    marginBottom: 10,
  },
  cardText: {
    fontSize: 12,
    color: '#666',
  },
  cardAction: {
    backgroundColor: '#009EF7',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cardActionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default DashboardScreen; 