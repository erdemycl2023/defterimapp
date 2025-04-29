import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const EDefterListesiScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [defterler] = useState([
    {
      id: '1',
      name: '2024 Yılı Defteri',
      company: 'ABC Teknoloji Ltd.',
      status: 'Aktif',
      lastUpdate: '1 saat önce',
      color: '#009EF7'
    },
    {
      id: '2',
      name: '2023 Yılı Defteri',
      company: 'XYZ Holding A.Ş.',
      status: 'Arşivlenmiş',
      lastUpdate: '3 saat önce',
      color: '#7239EA'
    },
    {
      id: '3',
      name: '2024 Q1 Defteri',
      company: 'Tech Solutions',
      status: 'Aktif',
      lastUpdate: '5 saat önce',
      color: '#50CD89'
    },
    {
      id: '4',
      name: '2023 Yılı Defteri',
      company: 'Global Trade',
      status: 'Arşivlenmiş',
      lastUpdate: '1 gün önce',
      color: '#F1416C'
    },
    {
      id: '5',
      name: '2024 Yılı Defteri',
      company: 'Digital Systems',
      status: 'Aktif',
      lastUpdate: '2 gün önce',
      color: '#009EF7'
    },
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.listItem}
      onPress={() => navigation.navigate('EDefterDetay', { defter: item })}
    >
      <View style={styles.listItemHeader}>
        <View style={[styles.statusIndicator, { backgroundColor: item.color + '20' }]}>
          <MaterialIcons name="description" size={24} color={item.color} />
        </View>
        <View style={styles.listItemTitleContainer}>
          <Text style={styles.listItemTitle}>{item.name}</Text>
          <Text style={styles.listItemSubtitle}>{item.company}</Text>
        </View>
      </View>
      <View style={styles.listItemFooter}>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'Aktif' ? '#50CD89' + '20' : '#F1416C' + '20' }]}>
          <Text style={[styles.statusText, { color: item.status === 'Aktif' ? '#50CD89' : '#F1416C' }]}>
            {item.status}
          </Text>
        </View>
        <Text style={styles.lastUpdateText}>Son güncelleme: {item.lastUpdate}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#181C32" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>E-Defter Listesi</Text>
      </View>

      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#7E8299" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Defter ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={defterler}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EF',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181C32',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E6EF',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#181C32',
  },
  listContainer: {
    padding: 16,
  },
  listItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  listItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusIndicator: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  listItemTitleContainer: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181C32',
    marginBottom: 4,
  },
  listItemSubtitle: {
    fontSize: 14,
    color: '#7E8299',
  },
  listItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  lastUpdateText: {
    fontSize: 12,
    color: '#B5B5C3',
  },
});

export default EDefterListesiScreen; 