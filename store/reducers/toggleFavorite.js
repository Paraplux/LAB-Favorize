import * as firebase from 'firebase'
import 'firebase/firestore'
import '../../main/database/config.js'



const initialState = {
    connectedUser: undefined,
    movieFavs: []
}

function toggleFavorite(state = initialState, action) {
    const firestore = firebase.firestore()
    let nextState

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var user = firebase.auth().currentUser;
            if(user != null){ 
                initialState.connectedUser = user.uid;
                firestore.collection('users').doc(initialState.connectedUser).get().then((response) => {
                    console.log(response.data().toggleFavorite)
                    initialState.movieFavs = response.data().toggleFavorite
                })
            }
        } else {
            // No user is signed in.
            console.log("nope")
        }
    })

    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const movieFavsIndex = state.movieFavs.findIndex(item => item.id === action.value.id)
            if (movieFavsIndex !== -1) {
                nextState = {
                    ...state,
                    movieFavs: state.movieFavs.filter( (item, index) => index !== movieFavsIndex)
                }
            }
            else {
                nextState = {
                    ...state,
                    movieFavs: [...state.movieFavs, action.value]
                }
            }
            firestore.collection('users').doc(initialState.connectedUser).set({
                toggleFavorite: nextState.movieFavs || state.movieFavs
            })
            return nextState || state
    default:
        return state
    }
}

export default toggleFavorite
