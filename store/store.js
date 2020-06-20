import { createStore } from 'redux';
import toggleFavorite from './reducers/toggleFavorite'

export default createStore(toggleFavorite)
