import 'react-native-gesture-handler'
import React, { Component } from 'react'

//* External component
import { StyleSheet, TextInput, View, StatusBar, TouchableOpacity, Text, ActivityIndicator, FlatList, Item, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import axios from 'axios'

//* Personal component
import TopBar from './components/TopBar'
import ResultsTile from './components/ResultsTile'


export default class SearchScreen extends Component {


    constructor(props) {
        super(props)

        this.navigation = props.navigation
        this.route = props.route

        this.state = {
            report: null
        }
        this.searchMovie(this.route.params.data)
    }

    searchMovie (query) {
        axios
        .get(`
        https://api.themoviedb.org/3/search/movie?api_key=040dff99eeba55116f8145fd1862aa4d&language=fr-FR&query=${query}&page=1&include_adult=false`)
        .then((response) => {
            this.setState({report: response.data.results})
        })
    }

    renderItem = ({item}) => {
        return (
            <ResultsTile key={item.id} options={{item: item, navigation: this.navigation, route: this.route}} />
        )
    }

    render() {
        if (this.state.report === null) {
            return (
                <View style={styles.container}>
                    <StatusBar barStyle="dark-content" />
                    <TopBar options={{navigation: this.navigation, route: this.route}}/>
                    <ActivityIndicator size="large" color="#303030"/>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <StatusBar barStyle="dark-content" />
                    <TopBar options={{navigation: this.navigation, route: this.route}}/>
                    <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10}}>
                        <Text style={{fontSize : 20}}>Vos résultats pour : </Text>
                        <Text style={{fontSize : 20, fontWeight: 'bold', fontStyle: 'italic'}}>{this.route.params.data}</Text>
                    </View>
                    <FlatList
                        data={this.state.report}
                        renderItem={this.renderItem}
                        keyExtractor={({id}) => id.toString()}
                    />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFEFEF',
        paddingTop: 30,
        height: '100%'
    },
    poster: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
})
