import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS, 
    FETCH_USER_FAILURE,
    FETCH_DOCTORS_SUCCESS,
    FETCH_HOSPITALS_SUCCESS,
    FETCH_DOCTORS_FAILURE,
    FETCH_HOSPITALS_FAILURE,
    SET_PLACE,
    SET_A_DOCTOR,
    SET_A_HOSPITAL,
    SET_LOGIN_USER,
    NEW_TOCKEN_ERROR,
    SET_NEW_AVILABLE_TOCKEN,
    LOADING_TRUE,
    LOADING_FALSE,
    FETCH_ALL_BOOKINGS,
    CLEAR_DOCTORS,
    SET_MEMBER,
    CLEAR_MEMBER
} from './userTypes'

const initialState = {
    place:'',
    hospitals:[],
    loading : false,
    loginUser:{},
    doctors:[],
    errors:{},
    currentDoctor:{},
    currentHospital:{},
    bookings:[],
    availableTocken:0,
    member:null
    
}
const reducer = (state=initialState,action) => {
    switch(action.type){
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading:true
            }
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                availableTocken : 0,
                users:action.payload
            }
        
        case SET_PLACE:
            return {
                ...state,
                hospitals:[],
                place:action.payload
            }
        case SET_LOGIN_USER:
            return {
                ...state,
                loading : false,
                loginUser:action.payload,
            }
        case SET_A_HOSPITAL:
            return {
                ...state,
                errors:{},
                availableTocken : 0,
                currentHospital:action.payload,
                
            }
        case SET_A_DOCTOR:
            return {
                ...state,
                errors:{},
                currentDoctor:action.payload1
            }
        case CLEAR_DOCTORS:
            return {
                ...state,
                doctors:[]
            }
        case FETCH_USER_FAILURE:
            return { 
                ...state,
                loading:false,
                hospitals:[],
                users:[],
                errors:action.payload
            }
        case FETCH_DOCTORS_SUCCESS:
            return {
                ...state,
                errors:{},
                availableTocken : 0,
                loading:false,
                doctors:action.payload
            }
        case FETCH_HOSPITALS_SUCCESS:
            return {
                ...state,
                availableTocken : 0,
                loading:false,
                errors:{},
                hospitals:action.payload
            }
        case FETCH_HOSPITALS_FAILURE:
            return { 
                ...state,
                loading:false,
                hospitals:[],
                errors:action.payload
            }
        case FETCH_DOCTORS_FAILURE:
            return { 
                ...state,
                loading:false,
                doctors:[],
                errors:action.payload
            }
        case SET_NEW_AVILABLE_TOCKEN:
            return { 
                ...state,
                availableTocken:action.payload
            }
        case NEW_TOCKEN_ERROR:
            return { 
                ...state,
                errors:action.payload
            }
        case LOADING_TRUE:
            return { 
                ...state,
                loading:true
            }
        case LOADING_FALSE:
            return { 
                ...state,
                loading:false
            }
        case FETCH_ALL_BOOKINGS:
            return {
                ...state,
                availableTocken : 0,
                bookings:action.payload
            }
        case SET_MEMBER:
            return {
                ...state,
                member:action.payload
            }
        case CLEAR_MEMBER:
            return {
                ...state,
                member:null
            }
        default:return state
    }
}
export default reducer