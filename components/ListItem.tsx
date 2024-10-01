import {View, Text, TouchableOpacity,Image,StyleSheet,Alert} from 'react-native'
import {Coordinate} from '../types/coordinate'
import {actuatedNormalize, actuatedNormalizeVertical} from '../utilities/responsiveSizing'
import Colors from '../constants/Colors'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type ListItemPropType = {
  data: Coordinate,
  onRemoveItem: (id:string)=>void
}
const ListItem = ({data,onRemoveItem}:ListItemPropType)=>{

  const handlePress = ()=>{
    Alert.alert("Location", `Latitude ${data.latitude.toFixed(8)}\nLongitude: ${data.longitude.toFixed(8)}`)
  }
  

  const combinedCoords = `${data.latitude.toFixed(8)}, ${data.longitude.toFixed(8)}`;
  const limitedCoords =
    combinedCoords.length > 16 ? `${combinedCoords.substring(0, 16)}..` : combinedCoords;

  return (
      <View style={[styles.flex_row, styles.card_container]}>
       <TouchableOpacity onPress={handlePress}>
        <View  style={[styles.flex_row, styles.details]}>
        <Image source={require('../assets/cloud.png')} style={styles.cloud_icon}/>
        <Text style={styles.coords} >{limitedCoords}</Text>
        </View>
      </TouchableOpacity>
        <TouchableOpacity onPress={()=>onRemoveItem(data.id)}>
        <MaterialIcons name="delete-outline" color="red" style={styles.icon}/>
        </TouchableOpacity >
      </View>
  )
}

const styles = StyleSheet.create({
  card_container:{
    height: actuatedNormalizeVertical(60),
    paddingHorizontal: actuatedNormalize(15),
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor:Colors.gray
  },
  cloud_icon:{
      height:actuatedNormalizeVertical(40),
      width:actuatedNormalize(40),
  },
  flex_row:{
    flexDirection:'row',
    alignItems:'center'
  },
  details:{
    gap:actuatedNormalize(20)
  },
  coords:{
    fontSize: actuatedNormalize(16)
  },
  icon:{
    fontSize: 24,
    paddingHorizontal: actuatedNormalize(10)
  }
})

export default ListItem;