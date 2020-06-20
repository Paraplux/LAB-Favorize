import 'react-native-gesture-handler'
import React, { Component } from 'react'

//* External component
import { StyleSheet, Text, View } from 'react-native'


export default class Toast extends Component {

    constructor(props) {
        super(props)

        console.log(this.props)
    }

    render() {
        return (
            <View style={styles.toast}>
                Je suis un toast
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
});
