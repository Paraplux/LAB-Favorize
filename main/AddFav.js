import 'react-native-gesture-handler'
import React, { Component } from 'react'

//* External import
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, Image } from 'react-native'

//* Personal component
import TopBar from './components/TopBar'
import CategoryTile from './components/CategoryTile'


export default class AddFav extends Component {

    constructor(props) {
        super(props)

        this.navigation = this.props.navigation
        this.route = this.props.route
    }

    render() {

        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <TopBar options={{ navigation: this.navigation, route: this.route }} />
                <ScrollView>
                    <View style={{ width: '90%', marginLeft: '5%', marginBottom: '10%', backgroundColor: '#FFFFFF', borderRadius: 20, }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={styles.avatar} source={{ uri: 'https://i.pravatar.cc/150?img=56' }} />
                        </View>
                        <Text style={styles.title}>Ajouter quoi ?</Text>
                        <Image style={styles.polygons} source={require('./resources/theme/polygons.png')} />
                    </View>
                    <TouchableOpacity onPress={() => this.navigation.navigate('SearchScreen')}>
                        <CategoryTile name="Un film" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.navigation.navigate('SearchScreen')}>
                        <CategoryTile name="Une chanson" />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFEFEF',
        paddingTop: 30,
        height: '100%'
    },
    boldFont: {
        fontWeight: 'bold',
        fontSize: 24
    },
    lightFont: {
        color: '#FFFFFF'
    },
    darkFont: {
        color: '#000000'
    },
    title: {
        marginVertical: '10%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 32
    },
    avatar: {
        marginTop: '5%',
        width: 100,
        height: 100,
        resizeMode: 'contain',
        borderRadius: 100
    },
    polygons: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
})
