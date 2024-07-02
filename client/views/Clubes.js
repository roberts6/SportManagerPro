import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useGetClubesQuery } from '../../server/FireBaseDB.js'; 

const Clubes = () => {
  const { data, error, isLoading } = useGetClubesQuery();

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  if (error) {
    return <Text style={styles.error}>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data ? Object.values(data) : []} 
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.clave}</Text>
            {/* Puedo renderizar otras propiedades del club acá */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  item: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 18,
  },
});

export default Clubes;
