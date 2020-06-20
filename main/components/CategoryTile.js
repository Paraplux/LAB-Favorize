import 'react-native-gesture-handler'
import React, { Component } from 'react'

//* External component
import { StyleSheet, Text, View} from 'react-native'
import { Icon } from 'react-native-elements'


export default class CategoryTile extends Component {

    render() {
        return (
            <View style={styles.tile}>
                <Text style={styles.tileTitle}>{this.props.name}</Text>
                <View style={styles.tileArrow} >
                    <Icon color="#303030" name="arrow-right" type="font-awesome"/>
                </View>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    tile: {
        position: 'relative',
        width: '90%',
        marginVertical: 20,
        marginLeft: '5%',
        padding: 25,
        backgroundColor: '#FFFFFF',
        color: "#303030",
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems:"center",
        borderRadius: 20
    },
    tileTitle: {
        fontWeight: 'bold',
        color: '#303030',
        fontSize: 24
    },
})