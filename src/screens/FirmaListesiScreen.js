import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_ENDPOINTS from '../config/api';

const FirmaListesiScreen = ({ navigation }) => {
  const [firmalar, setFirmalar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFirmalar();
  }, []);

  const fetchFirmalar = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        setError('Oturum bilgisi bulunamadı');
        return;
      }

      const { sessionToken } = JSON.parse(userData);
      const response = await axios.post(API_ENDPOINTS.FIRMA_LIST, {
        sessionToken: sessionToken
      });

      if (response.data.cevapKodu === 0) {
        setFirmalar(response.data.veri);
      } else {
        setError(response.data.cevapMesaji || 'Firma listesi alınamadı');
      }
    } catch (error) {
      console.error('Firma listesi hatası:', error);
      setError('Firma listesi alınırken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const renderFirmaItem = ({ item }) => (
    <TouchableOpacity style={styles.firmaItem}>
      <View style={styles.firmaInfo}>
        <Text style={styles.firmaAdi}>{item.adSoyadUnvan}</Text>
        <Text style={styles.firmaVkn}>VKN/TCKN: {item.tcknVkn}</Text>
        <Text style={styles.firmaTarih}>Eklenme: {item.eklemeTarihiFormatted}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#666" />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#009EF7" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={48} color="#F1416C" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchFirmalar}>
            <Text style={styles.retryButtonText}>Tekrar Dene</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Firma Listesi</Text>
      </View>

      <FlatList
        data={firmalar}
        renderItem={renderFirmaItem}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EF',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181C32',
  },
  listContainer: {
    padding: 16,
  },
  firmaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  firmaInfo: {
    flex: 1,
  },
  firmaAdi: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181C32',
    marginBottom: 4,
  },
  firmaVkn: {
    fontSize: 14,
    color: '#7E8299',
    marginBottom: 4,
  },
  firmaTarih: {
    fontSize: 12,
    color: '#B5B5C3',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#F1416C',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#009EF7',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FirmaListesiScreen; 