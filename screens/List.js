// List.js
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { collection, getDocs, firestore } from '../firebase/Config'; // Varmista, että getDocs ja firestore on tuotu oikein

const List = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesCollection = collection(firestore, 'messages'); // Varmista, että kokoelman nimi on oikea
        const querySnapshot = await getDocs(messagesCollection);
        const data = querySnapshot.docs.map(doc => doc.data());
        setMessages(data);
        console.log('Lista haettu onnistuneesti:', data); // Lisätty console.log-viesti
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    fetchMessages();
  }, []);

  return (
    <View style={styles.container}>
      {messages.map((msg, index) => (
        <Text key={index} style={styles.messageText}>{msg.text}</Text>
      ))}
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  messageText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  }
});

export default List;
