import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
const Job =(props)=>(
        <View style={styles.jobWrapper}>
            <TouchableOpacity onPress={()=>props.setChecked()}>
                <Icon
                    name={props.checked ? "check" : "square"}
                    size={30}
                    color="#900"
                    style={{ marginLeft: 15 }}
                />
            </TouchableOpacity>
            <View>
                {props.checked && <View style={styles.verticalLine}></View>}
                <Text style={styles.job}>{props.text}</Text>
            </View>
            <TouchableOpacity style={styles.trash} onPress={()=>props.setDelete()}>
                <Icon
                name="trash"
                size={30}
                color="#900"
                style={{ marginRight: 5 }}
                />
            </TouchableOpacity>

        </View>

)
const styles = StyleSheet.create({
    job:{
        paddingBottom: 20,
        flex:1,
        paddingLeft: 10,
        marginTop: 6,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    jobWrapper:{
        flexDirection:'row',
        marginTop:'5%',
        width:'100%',
        alignItems: 'stretch',
        borderColor: '#FFFFFF',
        borderBottomWidth: 1.5,
        minHeight: 40,
    },
    verticalLine: {
        borderBottomColor: 'white',
        borderBottomWidth: 3,
        marginLeft: 10,
        width: '100%',
        position: 'absolute',
        marginTop: 17,
    },
    trash:{
        marginLeft: 'auto',
        marginRight:5
    }
})
export default Job;