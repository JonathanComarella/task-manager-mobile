// TopBar.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TopBar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MINHAS TAREFAS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60, // Defina a altura da barra superior conforme necessário
    backgroundColor: 'white', // Cor de fundo roxa
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Sombra para Android (opcional)
  },
  title: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a57d5',
  },
});

export default TopBar;
