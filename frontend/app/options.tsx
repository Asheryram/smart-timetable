import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, ImageBackground, View } from 'react-native';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

const options = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Classrooms will generate timetables for the individual rooms.\n\n Programmes will generate timetables for the individual programmes.';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index += 1;
      if (index === fullText.length) {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const touchPress = () => {
    router.push('/timetable');

  };

  const fullPress = () =>{
    router.push('/programmes');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/images/Background.jpg')} style={styles.background} />
      <AntDesign name="arrowleft" size={34} color="black" style={styles.backIcon} onPress={() => router.back()} />

      <View style={styles.view}>
        <Text style={styles.typingText}>{displayedText}</Text>
      </View>

      <View style={styles.buttonBackground}>
        <TouchableOpacity style={styles.button} onPress={touchPress}>
          <Text style={styles.buttonText}>Classrooms</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={fullPress}>
          <Text style={styles.buttonText}>Programmes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default options;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  button: {
    width: 150,
    height: 100,
    marginHorizontal: 10,
    backgroundColor: 'green',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
  },
  buttonBackground: {
    position: 'absolute',
    bottom: 150,
    display: 'flex',
    flexDirection: 'row',
  },
  view: {
    position: 'absolute',
    top: 80,
    height: 290,
    width: 400,
    borderColor: 'green',
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    justifyContent: 'center',
    alignContent: 'center'
  },
  backIcon: {
    position: 'absolute',
    top: 30,
    left: 10,
  },
  typingText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});
