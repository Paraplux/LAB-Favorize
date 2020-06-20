import 'react-native-gesture-handler'
import React, { Component } from 'react'

//* External component
import { StyleSheet, Text, View} from 'react-native'


export default class BigButton extends Component {

    render() {
        return (
            <View style={styles.tile}>
                <Text style={styles.tileTitle}>{this.props.name}</Text>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    tile: {
        width: '85%',
        marginVertical: 20,
        marginLeft: '7.5%',
        padding: 20,
        backgroundColor: '#FFFFFF',
        color: "#303030",
        borderRadius: 100
    },
    tileTitle: {
        fontWeight: 'bold',
        color: '#303030',
        fontSize: 22,
        textAlign: "center"
    },
})