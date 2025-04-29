import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const MizanScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mizanlar] = useState([
    {
      id: '1',
      account: '100 Kasa',
      debit: '₺50,000',
      credit: '₺0',
      balance: '₺50,000',
      type: 'Aktif',
      color: '#009EF7'
    },
    {
      id: '2',
      account: '102 Banka',
      debit: '₺75,000',
      credit: '₺0',
      balance: '₺75,000',
      type: 'Aktif',
      color: '#7239EA'
    },
    {
      id: '3',
      account: '120 Alıcılar',
      debit: '₺0',
      credit: '₺30,000',
      balance: '₺-30,000',
      type: 'Pasif',
      color: '#50CD89'
    },
    {
      id: '4',
      account: '153 Ticari Mallar',
      debit: '₺45,000',
      credit: '₺0',
      balance: '₺45,000',
      type: 'Aktif',
      color: '#F1416C'
    },
    {
      id: '5',
      account: '300 Satıcılar',
      debit: '₺0',
      credit: '₺25,000',
      balance: '₺-25,000',
      type: 'Pasif',
      color: '#009EF7'
    },
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.listItem}
      onPress={() => navigation.navigate('MizanDetay', { mizan: item })}
    >
      <View style={styles.listItemHeader}>
        <View style={[styles.statusIndicator, { backgroundColor: item.color + '20' }]}>
          <MaterialIcons 
            name={item.type === 'Aktif' ? 'account-balance' : 'account-balance-wallet'} 
            size={24} 
            color={item.color} 
          />
        </View>
        <View style={styles.listItemTitleContainer}>
          <Text style={styles.listItemTitle}>{item.account}</Text>
          <Text style={styles.listItemSubtitle}>{item.type}</Text>
        </View>
      </View>
      <View style={styles.listItemFooter}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Bakiye:</Text>
          <Text style={[styles.balanceAmount, { color: parseFloat(item.balance) >= 0 ? '#50CD89' : '#F1416C' }]}>
            {item.balance}
          </Text>
        </View>
        <View style={styles.debitCreditContainer}>
          <Text style={styles.debitText}>Borç: {item.debit}</Text>
          <Text style={styles.creditText}>Alacak: {item.credit}</Text>
        </View>
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
        <Text style={styles.headerTitle}>Mizan</Text>
      </View>

      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#7E8299" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Hesap ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={mizanlar}
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
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#7E8299',
    marginRight: 8,
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  debitCreditContainer: {
    alignItems: 'flex-end',
  },
  debitText: {
    fontSize: 12,
    color: '#50CD89',
    marginBottom: 4,
  },
  creditText: {
    fontSize: 12,
    color: '#F1416C',
  },
});

export default MizanScreen; 