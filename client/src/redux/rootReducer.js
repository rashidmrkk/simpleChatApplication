import {combineReducers} from 'redux'
import userReducer from './user/userReducer'
import doctorReducer from './doctor/reducers'

const rootReducer = combineReducers({
    user:userReducer,
    doctor:doctorReducer
})
export default rootReducer