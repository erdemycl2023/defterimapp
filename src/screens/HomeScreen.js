


import React from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";

const HomeScreen = () => {
  //return <Text style={styles.text}> HomeScreen  erdem {"\n"} login ekranı yapacağım22</Text>;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Ana Sayfa</Text>
      <TouchableOpacity style={{ marginBottom: 10 }}>
        <Text>Kullanıcı Listesi</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginBottom: 10 }}>
        <Text>Kebir Listesi</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Ayarlar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
