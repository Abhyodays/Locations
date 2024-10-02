import {useState,useEffect} from 'react'
import {Coordinate} from '../types/coordinate'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location'
import * as Crypto from 'expo-crypto'
import { Alert } from 'react-native';

const useLocation = ()=>{
  const [locations, setLocations] = useState<Coordinate[]>([]);
  const key  = 'locations'

  useEffect(()=>{
    getAllLocations();
  },[])

  const getAllLocations = async():Promise<Coordinate[]>=>{
    try {
        const locations = await AsyncStorage.getItem(key);
        const allLocations =  locations != null ? JSON.parse(locations) : [];
        setLocations(allLocations);
        return allLocations;
      } catch (error) {
        console.log("Error in fetching locations from storage:",error);
        throw error
      }
  }

  const addLocationInStorage = async(location:Coordinate):Promise<void> =>{
  try{
    const locations = await getAllLocations();
    const updatedLocations = [location, ...locations];
    await AsyncStorage.setItem(key, JSON.stringify(updatedLocations));
    setLocations(updatedLocations);
  }catch(error){
    console.log("Error in adding location in storage:",error);
    throw error
  }
  }

  const removeLocation = async(id:string):Promise<void> =>{
    try{
      const locations = await getAllLocations();
      const updatedLocations = locations.filter(l => l.id!==id);
      await AsyncStorage.setItem(key, JSON.stringify(updatedLocations))
      setLocations(updatedLocations);
    }catch(error){
      console.log("Error in removing location from storage:", error)
    }
  }
  const askLocationPersmission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Location Persmission", "Permission to access location denied.")
      return false;
    }
    return true;
  }
  const addLocation = async()=>{
    try {
      const permission = await askLocationPersmission();
      if (!permission) return;
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords
      const newLocation = { id: Crypto.randomUUID(), latitude, longitude };
      addLocationInStorage(newLocation);
    } catch (error) {
      console.log('Failed to get location. Please try again.', error);
    }
  }
  return {locations, addLocation, removeLocation}
}
export default useLocation;