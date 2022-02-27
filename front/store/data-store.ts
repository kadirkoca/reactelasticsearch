import { createStore, combineReducers } from "redux"
import data from "../reducers/data-reducer"


const isDev = process.env.MODE === 'development' ? (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__() : {}
export default createStore(combineReducers({
    data,
}), isDev)
 