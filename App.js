import React , {useState} from 'react';
import {StatusBar} from 'expo-status-bar'
import { StyleSheet, Text, View, TextInput, Button, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [cancel, setCancel] = useState(false);
  const [newTask, setnewTask] = useState('');
  const [appTasks, appTask] = useState([]);
  const taskInputHandler = (enteredText) => {
    setnewTask(enteredText);
  };
  const getStorageData = async () => {
    try {
      if ((await AsyncStorage.getItem('localData')) != undefined || (await AsyncStorage.getItem('localData')) != null) {
        appTask(JSON.parse(await AsyncStorage.getItem('localData')));
        setCancel(true);
      };
    }
    catch (error) {
        alert(error);
    };
  };
  if (!cancel) {
    getStorageData();
  };
  const addTaskHandler = async () =>{
    if(newTask.length){
      appTask(currentTask => [...currentTask, newTask]);
      await AsyncStorage.setItem('localData' ,JSON.stringify(appTasks));
      setnewTask('');
    };
  };
  const ClearAll = async () =>{
    appTask([]);
    await AsyncStorage.removeItem('localData');
  };
  return (
    <View style= {styles.container}>
      <StatusBar/>
      <View style = {styles.inputContainer}>
      <Text style={styles.heading}> To Do </Text>
      </View>
      <View style = {styles.inputContainer}>
        <TextInput
          placeholder = "To Do List"
          style = {styles.input}
          onChangeText = {taskInputHandler}
          value = {newTask}
        />
        <Button title = "+"
          onPress = {addTaskHandler}
        /> 
      </View>
      <View>
        {appTasks.length ? appTasks.map((task,index) => <Text key={index} >{task}</Text>) : <Text>To Do Yoxdur</Text>}
      </View>
      <View style={styles.button} >
      {appTasks.length ? <Button
      
      title = "Clear All"
          onPress = {ClearAll}
        />  :<Text></Text> }
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  button:{
    top:10,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  heading:{
    justifyContent:'center',
    flexDirection:'row'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input :{
    borderColor:"black", 
    borderWidth:1,
    padding :10,
    width:300
  },
  inputContainer :{
    flexDirection :'row', 
    justifyContent :'space-between', 
    alignContent:'center',
    
  }
});