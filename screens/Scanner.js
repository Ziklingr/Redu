import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { collection, addDoc, firestore } from '../firebase/Config';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [fileSaved, setFileSaved] = useState(false);
  const navigation = useNavigation();

  const navigateBackToHome = () => {
    setTimeout(() => {
      navigation.navigate('Redu Logistiikka roskat'); // Varmista, että 'Redu Logistiikka roskat' vastaa etusivusi nimeä
    }, 2000);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const fetchDataFromUrl = async (url) => {
    try {
      const response = await axios.get(url);
      const startIndex = response.data.indexOf('<p>');
      const endIndex = response.data.indexOf('</p>');
      if (startIndex !== -1 && endIndex !== -1) {
        const text = response.data.substring(startIndex + 3, endIndex).trim();
        const docRef = await addDoc(collection(firestore, 'messages'), {
          text: text,
        });
        console.log('Teksti tallennettu onnistuneesti:', docRef.id);
        setFileSaved(true);
      } else {
        console.log('Tekstiä ei löytynyt');
      }
    } catch (error) {
      console.error('Virhe tiedoston haussa:', error);
    }
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    if (!fileSaved) {
      setScanned(true);
      try {
        await fetchDataFromUrl(data);
        navigateBackToHome(); // Lisää tämä rivi funktiosi loppuun
      } catch (error) {
        console.error('Virhe tiedoston haussa:', error);
      }
    }
  };

  if (fileSaved) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Tiedosto tallentunut onnistuneesti</Text>
      </View>
    );
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
});
