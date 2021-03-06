import React, { useState,useEffect } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Button, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
const checkStatus = (status) => {
    if (status === "success") return true;
    else if (status === "in process") return false;
}
const Job = ({job,setChangeJobs,onDeleteJob}) => {
    const [content, onChangeText] = useState(job.content);
    const [isChecked, useIsChecked] = useState(false);
    useEffect(()=>{
        onChangeText(job.content);
    },[]);
    useEffect(() => {
        const jobChecked = checkStatus(job.status);
        useIsChecked(jobChecked);
    })
    return (<View style={styles.jobWrapper}>
        <TouchableOpacity onPress={() =>{setChangeJobs(content , !isChecked)}}>
            <Icon
                name={isChecked ? "check" : "square"}
                size={30}
                color="#900"
                style={{ marginLeft: 15, marginBottom: 10 }}
            />
        </TouchableOpacity>
        <TextInput
            style={[isChecked ? styles.job2 : styles.job1, styles.job]}
            value={content}
            onChangeText={text => onChangeText(text)}
            onSubmitEditing={() => setChangeJobs(content, isChecked)}
        />
        <TouchableOpacity style={styles.trash} onPress={()=>onDeleteJob()}>
            <Icon
                name="trash"
                size={30}
                color="#900"
            />
        </TouchableOpacity>
    </View>

    )
}
const styles = StyleSheet.create({
    job: {
        flex: 1,
        paddingLeft: 10,
        fontSize: 20,
        marginBottom: 10,
    },
    job2: {
        textDecorationLine: "line-through",
    },
    job1: {
        textDecorationLine: "none"
    },
    jobWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#fff",
        marginTop: '5%',
        width: "100%",
        minHeight: 60,
        borderColor: "#D8D8D8",
        borderRadius: 1,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    trash: {
        marginLeft: 'auto',
        marginRight: 5,
        marginBottom: 10,
    },
    modal: {
        backgroundColor: '#fff',
        minHeight: 100,
    }
})
export default Job;