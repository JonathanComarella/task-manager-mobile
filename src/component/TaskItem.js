// TaskItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

const TaskItem = ({ task, onPressDelete, onPressEdit }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.taskContainer}>
        <Text style={styles.description}>{task.description}</Text>
        {/* <Text style={styles.status}>Status: {task.status}</Text> */}
        <Button title="Editar" style={[styles.button, styles.buttonEdit]} onPress={() => onPressEdit(task)} color="#4CAF50" />
        <Button title="Excluir" style={[styles.button, styles.buttonDelete]} onPress={() => onPressDelete(task.id)} color="red" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2', // Cor de fundo branco
    borderRadius: 10, // Bordas arredondadas
    margin: 10,
  },
  taskContainer: {
    padding: 15,
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a57d5', // Cor do texto branco
  },
  button: {
    padding: 50,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonEdit: {
    backgroundColor: 'blue',
  },
  buttonDelete: {
    backgroundColor: 'red',
  },
});

export default TaskItem;
