import axios from 'axios'
import {FETCH_BOOKED_USERS,
        SET_USER,
        SET_ERRORS,
        SET_DOCTOR_DETAILS,
        SET_LOADING,
        CLEAR_ERRORS,
        SET_CURRENT_WORKING_PLACE,
        CURRENT_BOOKINGS_NOW,
        SET_PATIENT
    } from './types'
export const setUser = (user) =>{
    return {
        type:SET_USER,
        payload:user
    }
}
export const setErrors = (error) =>{
    return {
        type:SET_ERRORS,
        payload:error
    }
}
export const clearErrors = () =>{
    return {
        type:CLEAR_ERRORS
    }
}
export const setCurrentWorkingPlace = (place) =>{
    return {
        type:SET_CURRENT_WORKING_PLACE,
        payload:place
    }
}

export const getDoctorDetails =(userData) => {
    return (dispatch) => {
        dispatch({
                type:SET_LOADING,
                payload:true
        })
        axios.post('/getDoctorDetails',userData)
            .then(res=>{
              console.log("got a responce");
              if(res.data==="no data"){
                  console.log("no data");
              }
              else if(res.data.data){
                // this.setState({
                //   docData:res.data.data
                // })
                dispatch({
                    type:SET_DOCTOR_DETAILS,
                    payload:res.data.data
                })
                dispatch({
                    type:SET_LOADING,
                    payload:false
                })
              }
            })
        }   
}

export const setCurrentBookingsNow = (item) =>{
    return {
        type:CURRENT_BOOKINGS_NOW,
        payload:item
    }
}
