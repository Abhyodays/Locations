import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Platform, Alert } from 'react-native'
import Colors from '../constants/Colors'
import { actuatedNormalize, actuatedNormalizeVertical } from '../utilities/responsiveSizing'
import { Coordinate } from '../types/coordinate'
import ListItem from '../components/ListItem'
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Location from 'expo-location';
import { useState } from "react"
import * as Crypto from 'expo-crypto';
import useLocation from '../hooks/useLocation'

const Home = () => {

  const { locations, removeLocation, addLocation } = useLocation();

  const askLocationPersmission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Location Persmission", "Permission to access location denied.")
      return false;
    }
    return true;
  }

  const handlePress = async () => {
    const permission = await askLocationPersmission();
    if (!permission) return;
    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords
      const newLocation = { id: Crypto.randomUUID(), latitude, longitude };
      addLocation(newLocation);
    } catch (error) {
      console.log('Failed to get location. Please try again.', error);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.header_text_container}>
        <Text style={styles.header_text}>Coordinates</Text>
      </View>
      {
        locations.length > 0 ?
          <FlatList
            data={locations}
            renderItem={({ item }) => <ListItem data={item} onRemoveItem={removeLocation} />}
            keyExtractor={(item) => item.id}
          />
          :
          <View style={styles.image_container}>
            <Image source={require('../assets/Logo.jpg')} style={styles.image} resizeMode="contain" />
          </View>
      }
      <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
        <View style={[styles.floating_button, styles.shadow]} >
          <Ionicons name="add" style={styles.icon} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: Colors.blue,
    height: actuatedNormalizeVertical(55)
  },
  header_text_container: {
    height: actuatedNormalizeVertical(35),
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    paddingHorizontal: actuatedNormalize(15)
  },
  header_text: {
    color: Colors.dark_gray,
    fontSize: actuatedNormalize(12)
  },
  image_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: actuatedNormalize(176),
    width: actuatedNormalizeVertical(218)
  },
  floating_button: {
    position: 'absolute',
    bottom: actuatedNormalizeVertical(80),
    right: actuatedNormalize(15),
    backgroundColor: Colors.blue,
    borderRadius: actuatedNormalize(Math.floor(68 / 2)),
  },
  icon: {
    fontSize: actuatedNormalize(48),
    padding: 10,
    color: Colors.white
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffet: { X: 0, Y: 0 }
      },
      android: {
        elevation: 8,
        shadowColor: Colors.black
      }
    })
  }

})
export default Home;