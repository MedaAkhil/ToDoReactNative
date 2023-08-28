import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class TaskManager extends Component {
  state = {
    task: '',
    time: '',
    tasks: [], // Array to store tasks and time
  };

  componentDidMount() {
    // Load stored tasks from AsyncStorage when the component mounts
    this.loadStoredTasks();
  }

  // Function to save tasks to AsyncStorage
  saveTasks = async () => {
    const { task, time, tasks } = this.state;

    // Create a new task object
    const newTask = { task, time };

    // Add the new task to the tasks array
    const updatedTasks = [...tasks, newTask];

    // Save the updated tasks array to AsyncStorage
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      this.setState({ tasks: updatedTasks, task: '', time: '' });
    } catch (error) {
      console.error('Error saving tasks: ', error);
    }
  };

  // Function to load tasks from AsyncStorage
  loadStoredTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks !== null) {
        this.setState({ tasks: JSON.parse(storedTasks) });
      }
    } catch (error) {
      console.error('Error loading tasks: ', error);
    }
  };

  // Function to delete a task from the tasks array
  deleteTask = (index) => {
    const { tasks } = this.state;

    // Remove the task at the specified index
    const updatedTasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];

    // Save the updated tasks array to AsyncStorage
    AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks))
      .then(() => {
        this.setState({ tasks: updatedTasks });
      })
      .catch((error) => {
        console.error('Error deleting task: ', error);
      });
  };
  
  render() {
    Tasks = () =>{
      return (
        <View style={styles.container}>
          
  
          <Text style={styles.header}>Tasks:</Text>
          <FlatList
            data={tasks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.taskItem}>
                <Text>{item.task}</Text>
                <Text>{item.time}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => this.deleteTask(index)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      );
    }
    AddTask = () => {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>Task Manager</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter task"
            value={task}
            onChangeText={(task) => this.setState({ task })}
          />
          <TextInput
            style={styles.input}
            placeholder="Time to complete (e.g., 30 mins)"
            value={time}
            onChangeText={(time) => this.setState({ time })}
          />
          <TouchableOpacity style={styles.button} onPress={this.saveTasks}>
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      )
    }
    const { task, time, tasks } = this.state;
    Tab = createMaterialBottomTabNavigator();
    return (
      
      <NavigationContainer>
      <Tab.Navigator
      initialRouteName="Tasks"
      activeColor="#e91e63"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="note" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AddTask"
        component={AddTask}
        options={{
          tabBarLabel: 'AddTask',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="pen" color={color} size={26} />
          ),
        }}
      />
      
    </Tab.Navigator>
    </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 3,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default TaskManager;
