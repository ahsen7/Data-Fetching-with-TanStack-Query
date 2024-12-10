import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList, ActivityIndicator, Image } from 'react-native';

type Props = {};

const Index = (props: Props) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const numColumns = 2; 

  const fetchData = () => {
    setLoading(true);
    fetch('https://fakestoreapi.com/products?limit=15')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured Products</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          key={numColumns.toString()} // Force re-render when numColumns changes
          contentContainerStyle={styles.flatlistContent}
          numColumns={numColumns}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
              <Text style={styles.name} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noDataText}>No products available. Tap the button below to fetch data.</Text>
      )}
      <Button title="Fetch Data" onPress={fetchData} />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  flatlistContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 8,
    flex: 1,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: '500',
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginVertical: 16,
  },
});
