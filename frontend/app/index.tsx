import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { useFonts } from 'expo-font'

const Index = () => {
const handlePress = () => {
    router.push('/options')
}

const [loaded] = useFonts({
  Gotham: require('../assets/fonts/Gotham-Black.otf'),
});

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/Background.jpg')} style={styles.background} />
      <Image source={require('../assets/images/knust.png')} style={styles.knust}/>
      <Text style={styles.smart}>SMART</Text>
      <Text style={styles.timetable}>TIMETABLE</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Let's get started</Text>
      </TouchableOpacity>

    </View>
  )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        width: '100%',
        height: '100%',
    },
    smart:{
        color: "gold",
        textAlign: "left",
        fontSize: 65,
        marginLeft: '4%',
        fontWeight: 'bold',
        fontFamily: 'Gotham',
        position: 'absolute',
        top: 280
    },
    timetable:{
        color: "green",
        textAlign: "left",
        fontSize: 65,
        fontWeight: 'bold',
        marginTop: '6%',
        marginLeft: '5%',
        fontFamily: 'Gotham',
        position: 'absolute',
        top:  330,
    },
    button: {
        width: 160,
        height: 55,
        position: 'absolute',
        bottom: 80,
        left: 120,
        backgroundColor: 'green',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18, 
        color: '#fff',
    },
    knust:{
      height: 200,
      width: 230,
      position: 'absolute',
      marginLeft: '18.5%',
      marginTop: 10,


    }
})