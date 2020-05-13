import {
    SET_USER,
    FETCH_BOOKED_USERS,
    SET_ERRORS,
    SET_LOADING,
    SET_DOCTOR_DETAILS,
    CLEAR_ERRORS,
    SET_CURRENT_WORKING_PLACE,
    CURRENT_BOOKINGS_NOW,
    SET_PATIENT
} from './types'

const initialState = {
    choosedBookedUser:{},
    docErrors:{},
    currentUser:{},
    loading:false,
    doctorDetails:{},
    currentWorkingPlace:{},
    currentBookingNow:{},
    
}

const reducer = (state=initialState,action) => {
    switch(action.type){
        case SET_ERRORS:
            return {
                ...state,
                docErrors:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                docErrors:{}
            }
            
        case SET_LOADING:
            return {
                ...state,
                loading:action.payload
            }
        case SET_DOCTOR_DETAILS:
            return {
                ...state,
                doctorDetails:action.payload
            }
        case SET_CURRENT_WORKING_PLACE:
            return {
                ...state,
                currentWorkingPlace:action.payload
            }
        case CURRENT_BOOKINGS_NOW:
            return {
                ...state,
                currentBookingNow:action.payload
            }
        case SET_USER:
            return {
                ...state,
                choosedBookedUser:action.payload
            }
            
        
        default:return state
    }
}
export default reducer