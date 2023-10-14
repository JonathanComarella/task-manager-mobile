import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, Button, StyleSheet } from 'react-native';
import TaskItem from '../component/TaskItem';
import TopBar from '../component/TopBar';

const Tasks = () => {
  const [tasks, setTasks] = useState([]); // Lista de tarefas
  const [isModalVisible, setModalVisible] = useState(false); // Estado do modal
  const [selectedTask, setSelectedTask] = useState(null); // Tarefa selecionada para edição
  const [newTaskDescription, setNewTaskDescription] = useState(''); // Descrição da nova tarefa
  const [modalVisible, setModalEditVisible] = useState(false);
  const [editedTask, setEditedTask] = useState({});
  const [newDescription, setNewDescription] = useState('');

  // Função para buscar tarefas da API externa
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://192.168.0.102:8080/tasks"); 
      const data = await response.json();
      setTasks(data); // Atualiza o estado com os dados da API
    } catch (error) {
      console.error('Erro ao buscar tarefas da API:', error); 
    }
  };

  useEffect(() => {
    // Chama a função para buscar tarefas quando o componente é montado
    fetchTasks();
  }, []); // O segundo argumento vazio [] garante que o useEffect será executado apenas uma vez, após a montagem do componente

  const addTask = async () => {
    try {
      const response = await fetch("http://192.168.0.102:8080/tasks", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: newTaskDescription,
          // Outros campos da tarefa, como deadline, prioridade e status, podem ser adicionados aqui
        }),
      });
      const data = await response.json();
      setTasks([...tasks, data]); // Adiciona a nova tarefa ao estado
      setModalVisible(false); // Fecha o modal
      setNewTaskDescription(''); // Limpa a descrição da nova tarefa
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  const editTask = async (task) => {
    console.log(task);
    setEditedTask(task);
    setNewDescription(task.description); // Preenche o campo de descrição com a descrição atual da tarefa
    setModalEditVisible(true); // Abre o modal de edição
  };

  const saveEditedTask = async () => {
    try {
        // Implemente a lógica para enviar a requisição PUT para a API
        const response = await fetch(`http://192.168.0.102:8080/tasks/${editedTask.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            description: newDescription,
            // Outros campos da tarefa que você deseja atualizar
          }),
        });
  
        if (response.ok) {
          // Se a atualização for bem-sucedida, atualize o estado local para refletir as tarefas atualizadas
          const updatedTasks = tasks.map((task) => {
            if (task.id === editedTask.id) {
              return {
                ...task,
                description: newDescription,
                // Atualize outros campos da tarefa conforme necessário
              };
            }
            return task;
          });
  
          setTasks(updatedTasks);
          setModalEditVisible(false);
        } else {
          console.error('Erro ao salvar a tarefa editada');
        }
      } catch (error) {
        console.error('Erro ao salvar a tarefa editada:', error);
      }
      setModalEditVisible(false);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://192.168.0.102:8080/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Adicione outros cabeçalhos se necessário (por exemplo, token de autenticação)
        },
      });
  
      if (response.ok) {
        console.log('Tarefa deletada com sucesso!');
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        // Atualize a lista de tarefas após a remoção bem-sucedida
        // Você pode chamar uma função para buscar e atualizar as tarefas novamente
      } else {
        console.error('Falha ao deletar tarefa');
        // Trate o erro conforme necessário
      }
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      // Trate o erro conforme necessário
    }
    console.log(`Excluir tarefa com ID: ${taskId}`);
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <TaskItem task={item} onPressDelete={handleDeleteTask} onPressEdit={editTask} />}
      />

      {/* Modal para adicionar tarefas */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Descrição da Tarefa"
            value={newTaskDescription}
            onChangeText={(text) => setNewTaskDescription(text)}
          />
          <Button style={styles.buttonAddNewTask} title="Adicionar Tarefa" onPress={addTask} />
          <Button title="Fechar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalEditVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#6b1fc2' }}>
          <TextInput
            style={{ height: 40, borderColor: 'white', borderWidth: 2, marginBottom: 20, width: '80%', 
            backgroundColor: '#f2f2f2', 
            borderRadius: 10, // Bordas arredondadas
            margin: 10, }}
            onChangeText={(text) => setNewDescription(text)}
            value={newDescription}
            placeholder="Nova descrição da tarefa"
          />
          <Button title="Salvar" onPress={saveEditedTask} style={styles.buttonCancelarNewTask} />
          <Button title="Cancelar" onPress={() => setModalEditVisible(false)} color="red" />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#6b1fc2', // Fundo roxo claro
  },
  addButton: {
    backgroundColor: '#6a57d5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6b1fc2',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
    borderColor: 'white',
    backgroundColor: '#f2f2f2',
  },
  buttonCancelarNewTask: {
    padding: 20,
    backgroundColor: 'white',
  },
});

export default Tasks;
