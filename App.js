import React, { useState } from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,ScrollView,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Job from'./Job';
const App = ()=> {
    const [value, setValue] = useState('');
    const [jobs, setJobs] = useState([]);
   let handleAddJob = () =>{
        if (value.length > 0) {
            setJobs([...jobs, { text: value, key: Date.now(), checked: false }]);
            setValue('');
        }
    };
    let handleChecked=(id)=>{
        setJobs(
            jobs.map((job)=>{
                if(job.key==id) job.checked=!job.checked;
                return job;
            })
        )
    }
    let handleDelete=(id)=>{
        setJobs(
            jobs.filter((job)=>{
                if(job.key!==id) return true;
            })
        )
    }
  return (
        <View style={styles.container}>
            <ImageBackground style={{ width: '100%', height: 'auto',  alignItems: 'center',}} source={require('./assets/image/backgroundImage.jpg')}>
            <Text style={{color:"#fff",marginTop:"10%",fontSize: 25, fontWeight: 'bold',}}>Today</Text>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    onChangeText={(value) => setValue(value)}
                    placeholder={'Do anything!'}
                    placeholderTextColor="#D8D8D"
                    value={value}
                />
            <TouchableOpacity onPress={() => handleAddJob()} >
                <Icon name="plus" size={30} color="#900" style={{ marginRight: 5 }}/>
            </TouchableOpacity>
            </View>
            </ImageBackground>
          <ScrollView style={{backgroundColor:"#fff", marginLeft: '3%',marginRight:'3%'}}>
              {
                  jobs.map((job)=>(
                      <Job
                          text={job.text}
                          key={job.key}
                          checked={job.checked}
                          setChecked={() => handleChecked(job.key)}
                          setDelete={()=>handleDelete(job.key)}
                      />
                  ))

              }
          </ScrollView>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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