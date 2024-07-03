import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useGetClubesQuery } from '../../server/servicesFireBase/services.js'; 

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
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Escudo_del_Club_Ferro_Carril_Oeste.svg' }} style = {styles.image} onError={(error) => console.log('Image Load Error:', error.nativeEvent.error)}/>
            <Text style={styles.itemText}>{item.nombre}</Text>
            <Text style={styles.itemText}>{item.direccion}</Text>
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
  image: {
    width: 200,
    height: 200,
    marginBottom: 15
  }
});

export default Clubes;
