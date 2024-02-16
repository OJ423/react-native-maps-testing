import { SafeAreaView, StyleSheet, Text, Pressable } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";

export default function Home() {
  const navigation = useNavigation();
  const [city, setCity] = useState(null)
  const [deviceLocation, setDeviceLocation] = useState(false)
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Enjoy your toilet break with Flush Finder.</Text>
      <Pressable style={styles.buttonStyle} onPress={() => {
          setCity('Manchester')
          .then(() => {
            navigation.navigate('Toilets Near You', {city});
          })
          setDeviceLocation(false)
      }}>
        <Text style={styles.buttonText}>Manchester</Text>
      </Pressable>
      <Pressable style={styles.buttonStyle} onPress={() => {
          setCity(null)
          setDeviceLocation(true)
          navigation.navigate('Toilets Near You', {deviceLocation});
      }}>
        <Text style={styles.buttonText}>Use Devices Location</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems:"center",
    flex: 1,
    gap:10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    textAlign:'center'
  },
  buttonStyle: {
    marginTop: 10,
    backgroundColor: 'tomato',
    borderRadius: 5,
    padding:10,
  }
})