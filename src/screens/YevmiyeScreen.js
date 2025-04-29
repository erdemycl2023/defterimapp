import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const YevmiyeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [yevmiyeler] = useState([
    {
      id: '1',
      date: '2024-03-15',
      description: 'Satış geliri',
      amount: '₺25,000',
      type: 'Gelir',
      status: 'Onaylandı',
      color: '#009EF7'
    },
    {
      id: '2',
      date: '2024-03-14',
      description: 'Kira ödemesi',
      amount: '₺5,000',
      type: 'Gider',
      status: 'Onaylandı',
      color: '#7239EA'
    },
    {
      id: '3',
      date: '2024-03-13',
      description: 'Maaş ödemesi',
      amount: '₺15,000',
      type: 'Gider',
      status: 'Beklemede',
      color: '#50CD89'
    },
    {
      id: '4',
      date: '2024-03-12',
      description: 'Hizmet geliri',
      amount: '₺8,000',
      type: 'Gelir',
      status: 'Onaylandı',
      color: '#F1416C'
    },
    {
      id: '5',
      date: '2024-03-11',
      description: 'Malzeme alımı',
      amount: '₺3,500',
      type: 'Gider',
      status: 'Onaylandı',
      color: '#009EF7'
    },
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.listItem}
      onPress={() => navigation.navigate('YevmiyeDetay', { yevmiye: item })}
    >
      <View style={styles.listItemHeader}>
        <View style={[styles.statusIndicator, { backgroundColor: item.color + '20' }]}>
          <MaterialIcons 
            name={item.type === 'Gelir' ? 'arrow-upward' : 'arrow-downward'} 
            size={24} 
            color={item.color} 
          />
        </View>
        <View style={styles.listItemTitleContainer}>
          <Text style={styles.listItemTitle}>{item.description}</Text>
          <Text style={styles.listItemSubtitle}>{item.date}</Text>
        </View>
      </View>
      <View style={styles.listItemFooter}>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'Onaylandı' ? '#50CD89' + '20' : '#F1416C' + '20' }]}>
          <Text style={[styles.statusText, { color: item.status === 'Onaylandı' ? '#50CD89' : '#F1416C' }]}>
            {item.status}
          </Text>
        </View>
        <Text style={[styles.amountText, { color: item.type === 'Gelir' ? '#50CD89' : '#F1416C' }]}>
          {item.amount}
        </Text>
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
        <Text style={styles.headerTitle}>Yevmiye</Text>
      </View>

      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#7E8299" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Yevmiye ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={yevmiyeler}
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
  amountText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default YevmiyeScreen; 