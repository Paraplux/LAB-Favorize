import 'react-native-gesture-handler'
import React, { Component } from 'react'

//* External component
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Icon } from 'react-native-elements'


export default class ResultsTile extends Component {

    constructor(props) {
        super(props)
        this.route = this.props.options.route
        this.navigation = this.props.options.navigation

        this.item = props.options.item
        this.item.year = new Date(this.item.release_date).getFullYear()
    }

    render() {
        return (
            <View style={styles.tile}>
                <View style={styles.tileThumbContainer}>
                    <Image style={styles.tileThumb} source={{uri: `https://image.tmdb.org/t/p/w342/${this.item.poster_path}`}}/>
                </View>
                <View style={styles.tileInfoContainer}>
                    <Text style={styles.tileTitle}>{this.item.title}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={styles.mutedContent}>{this.item.year}</Text>
                    </View>
                    <Text style={styles.tileContent}>{this.item.overview.substring(0, 150)} ...</Text>
                </View>
                <TouchableOpacity style={styles.tileArrow} onPress={() => this.navigation.navigate('MovieScreen', {data: this.item.id})}>
                    <Icon color="#000000" name="arrow-right" type="font-awesome"/>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    tile: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        position: 'relative',
        width: '95%',
        marginVertical: 20,
        marginLeft: '2.5%',
        height: 270,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
    },
    tileThumbContainer: {
        width: '50%',
        height: '100%',
    },
    tileInfoContainer: {
        width: '50%',
        height: '100%',
        paddingHorizontal: '2%',
    },
    tileThumb: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 20,
    },
    tileTitle: {
        width: '100%',
        marginTop: '10%',
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        fontSize: 20
    },
    mutedContent: {
        color: '#909090',
        paddingHorizontal: 10,
        fontSize: 12
    },
    tileContent: {
        marginTop: '10%',
        color: '#000000',
        textAlign: 'justify',
        fontSize: 13
    },
    tileArrow: {
        position: 'absolute',
        right: 20,
        bottom: 10,
        fontWeight: 'bold',
        color: '#000000',
    }
})