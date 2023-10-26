// Home.js
import React, { useState } from 'react';
import { View, Button, StyleSheet, ImageBackground, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, firestore } from '../firebase/Config'; // Varmista, että addDoc, collection ja firestore on tuotu oikein
import List from './List'; // Tuo List-komponentti

export default function Home() {
  const navigation = useNavigation();
  const [newMessage, setNewMessage] = useState("");

  const save = async () => {
    const docRef = await addDoc(collection(firestore, 'messages'), {
      text: newMessage,
    })
    setNewMessage("");
    console.log('Viesti tallennettu onnistuneesti:', docRef.id);
  }


  return (
    <ImageBackground
      source={require('./redu.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <TextInput placeholder='Kirjoita viestisi' value={newMessage} onChangeText={text => setNewMessage(text)} />
        <Button title="Lähetä" onPress={save} />
        <Button title="Skanneri" onPress={() => navigation.navigate('Scanner')} />
        <Button title="Skannatut" onPress={() => navigation.navigate('List')} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  listContainer: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  }
});
