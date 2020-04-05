import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,FlatList,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Job from'./src/components/Job';
import { getTodoesApi, updateTodoApi, createTodoApi, deleteTodoApi } from './src/api/Todo.Api';
const App = ()=> {
    const [value, setValue] = useState('');
    const [jobs, setJobs] = useState([]);
    const resetJobs = async () => {
        try {
            const todoesData = await getTodoesApi();
            setJobs(todoesData);
        } catch (err) {
            console.log(err)
            alert("Reset Job: ", err.message);
        }
    }
    const updateJob = async (content, isChecked, todoId) => {
        try {
            const status = isChecked ? "success" : "in process";
            const res = await updateTodoApi(todoId, content, status);
            await resetJobs();
        } catch (err) {
            alert("Update Job: ", err.message);
        }
    }
   let handleAddJob = async() =>{
        if (value.length > 0) {
            try {
                let res=await createTodoApi(value, "in process");
                await resetJobs();
                setValue("");
            } catch (err) {
                alert("Create Todo: ", err.message)
            }
        }
    };
   
    let handleDelete=async(id)=>{
        try {
            await deleteTodoApi(id);
            await resetJobs();
        } catch (err) {
            alert("Delete Todo: ", err.message)
        }
    };
    useEffect(() => {
        resetJobs().then();
    }, [])
  return (
        <View style={styles.container}>
            <ImageBackground style={{ width: '100%',  alignItems: 'center',}} source={require('./assets/image/backgroundImage.jpg')}>
            <Text style={{color:"#fff",marginTop:"10%",fontSize: 25, fontWeight: 'bold',}}>Today</Text>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    onChangeText={(value) => setValue(value)}
                    placeholder={'Do anything!'}
                    placeholderTextColor="rgb(213,206,206)"
                    value={value}
                />
            <TouchableOpacity onPress={() => handleAddJob()} >
                <Icon name="plus" size={30} color="#900" style={{ marginRight: 5 }}/>
            </TouchableOpacity>
            </View>
            </ImageBackground>
          <View style={{flex:1, marginLeft: '3%',marginRight:'3%'}}>
            <FlatList
                data={jobs}
                keyExtractor={item => item._id}
                renderItem={({ item, index }) => {
                    return (
                        <Job
                            job={item}
                            setChangeJobs={(content, isChecked) => {
                                updateJob(content, isChecked, item._id)
                            }}
                            onDeleteJob={() => {
                                handleDelete(item._id)
                            }}
                        />)
                }}
            />
          </View>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
  },
    textInputContainer:{
        flexDirection:'row',
        alignItems: 'baseline',
        borderBottomWidth: 1,
        paddingRight: 10,
        paddingBottom: 5,
    },
    textInput:{
      height:20,
        flex:1,
        minHeight: '7%',
        marginTop: '5%',
        fontSize:25,
        color: '#fff',
        paddingLeft: 10
    },

});
export default App