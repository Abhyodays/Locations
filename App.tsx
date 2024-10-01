import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import Colors from './constants/Colors'
import Home from './screens/Home'


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.gray} barStyle="dark-content" />
      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  }
});
