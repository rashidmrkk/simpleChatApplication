import axios from 'axios'
import {
    AUTHENTICATE,
    UN_AUTHENTICATE,
    LOADING_TRUE,
    LOADING_FALSE,
    SET_LOGIN_USER,
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
    SET_NEW_AVILABLE_TOCKEN,
    NEW_TOCKEN_ERROR,
    FETCH_ALL_BOOKINGS,
    CLEAR_DOCTORS,
    SET_MEMBER,
    CLEAR_MEMBER
} from './userTypes'

export const setPlace = (place) =>{
    return {
        type:SET_PLACE,
        payload:place
    }
}

export const fetchUserRequest = () =>{
    console.log("fetchUserRequest called");
    
    return {
        type:FETCH_USER_REQUEST
    }
}
export const fetchUserSuccess = (users) => {

    return {
        type:FETCH_USER_SUCCESS ,
        payload:users
    }
}
export const fetchHospitalsSuccess = (hospitals) => {
    return {
        type:FETCH_HOSPITALS_SUCCESS ,
        payload:hospitals
    }
}
export const setHospital = (selectedHospital) =>{
    console.log("set hospital called ="+selectedHospital )
    return {
        type:SET_A_HOSPITAL,
        payload:selectedHospital,
    }
}
export const setLoginUser = (user) =>{
    return {
        type:SET_LOGIN_USER,
        payload:user
    }
}
export const fetchHospitalsFailure = (error) => {
    return {
        type : FETCH_HOSPITALS_FAILURE , 
        payload : {email:error}
    }
}
export const fetchUserFailure = (error) => {
    return {
        type : FETCH_USER_FAILURE , 
        payload : error
    }
}
export const newTockenError = (error) => {
    return {
        type : NEW_TOCKEN_ERROR , 
        payload : error
    }
}
export const setMember = (member) => {
    return {
        type : SET_MEMBER,
        payload : member
    }
}
export const clearMember = () => {
    return {
        type : CLEAR_MEMBER 
    }
}
export const clearDoctors = () => {
    return {
        type : CLEAR_DOCTORS 
    }
}


export const setDoc=(currentDoctor) =>{
    console.log("got it again"+currentDoctor)
    return {
        type : SET_A_DOCTOR ,
        payload1 : currentDoctor,
    }
}

export const fetchDoctorsSuccess = (doctors) => {
    return {
        type:FETCH_DOCTORS_SUCCESS ,
        payload:doctors
    }
}
export const fetchDoctorsFailure = (error) => {
    return {
        type : FETCH_DOCTORS_FAILURE , 
        payload : error
    }
}


/*************************************************************************************** */

// fetching new available tocken
export const fetchNewTocken =(milliseconds,time_id) => {
    const data ={
        milliseconds : milliseconds,
        time_id : time_id
    }
    console.log("milliseconds recied in fetch = " + data.milliseconds)
    console.log("time_id recied in fetch = " + data.time_id)
    return (dispatch) => {
        axios.post('/getNewTocken',data)
            .then(response => {
                if(response.data.tockenError){
                    console.log("error : " + response.data.tockenError)
                    const error = {
                        tockenError : response.data.tockenError
                    }
                    dispatch(newTockenError(error))
                }
                else {
                    console.log(response.data.newTocken)
                    const tocken = response.data.newTocken
                    dispatch({
                        type:SET_NEW_AVILABLE_TOCKEN,
                        payload:tocken
                    })
                }
                
            })
            .catch(error => {
                const errorMsg = error.message
                console.log(errorMsg)
            })
    }
}





/*****************************************************************************************/

//FETCH HOSPITALS BASED ON PLACE

export const fetchHospitalsByPlace =(place) => {
    console.log("pppp=place="+place)
    return (dispatch) => {
        console.log("hii")
        dispatch(fetchUserRequest)
        console.log("pppp=place="+place)
        axios.post('/getHospitals',place)
            .then(response => {
                if(response.data.error){
                    console.log("error : " + response.data.error)
                    dispatch(fetchHospitalsFailure(response.data.error))
                }
                else {
                    console.log(response.data)
                    const hospitals = response.data
                    console.log(hospitals)
                    dispatch(fetchHospitalsSuccess(hospitals))
                }
                
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchHospitalsFailure(errorMsg))
            })
    }
}

/*********************************************************************************************/

//FETCH DOCTORS BASED ON HOSPITAL 

export const fetchDoctorsByHospital =(hospital,history) => {
    console.log("hospital reg id = "+hospital)
    return (dispatch) => {
        dispatch(fetchUserRequest)
        axios.post('/getDoctors',hospital)
            .then(response => {
                if(response.data.error){
                    console.log("error : " + response.data.error)
                    dispatch(fetchDoctorsFailure(response.data.error))
                }
                else {
                    console.log(response.data)
                    const doctors = response.data
                    console.log(doctors)
                    dispatch(fetchDoctorsSuccess(doctors))
                    history.push('doctorsInHospital')
                }
                
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchDoctorsFailure(errorMsg))
            })
    }
}

/*****************************************************************************************/



export const fetchDoctorsByNameOrId =(nameOrId) => {
    console.log(nameOrId.nameOrId);
    
    return (dispatch) => {
        dispatch(fetchUserRequest)
        axios.post('/getDoctorsByNameOrId',nameOrId)
            .then(response => {
                if(response.data.error){
                    console.log("error : " + response.data.error)
                    dispatch(fetchDoctorsFailure(response.data.error))
                }
                else {
                    console.log(response.data)
                    const doctors = response.data
                    console.log(doctors)
                    dispatch(fetchDoctorsSuccess(doctors))
                }
                
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchDoctorsFailure(errorMsg))
            })
    }
}



/*****************************************************************************************/



export const fetchDoctorsBySpecialisation =(specialisation) => {
    
    return (dispatch) => {
        dispatch(fetchUserRequest)
        axios.post('/getDoctorsBySpecialisation',specialisation)
            .then(response => {
                if(response.data.error){
                    console.log("error : " + response.data.error)
                    dispatch(fetchDoctorsFailure(response.data.error))
                }
                else {
                    console.log(response.data)
                    const doctors = response.data
                    console.log(doctors)
                    dispatch(fetchDoctorsSuccess(doctors))
                }
                
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchDoctorsFailure(errorMsg))
            })
    }
}



/******************************************************************************************* */
//LOGIN

export const loginUser =(userData,history) => {
    return (dispatch) => {
        dispatch(fetchUserRequest)
        axios.post('/login',userData)
            .then(response => {
                if(response.data.errors){
                    console.log("error : " + response.data.errors)
                    dispatch(fetchUserFailure(response.data.errors))
                }
                else {
                    console.log(response.data)
                    dispatch(setLoginUser(response.data))
                    
                    if(response.data.user_type==="user"){
                        history.push('/');
                    }
                    else if(response.data.user_type==="doctor"){
                        history.push('/doctorHome');
                        
                        
                    }
                    else if(response.data.user_type==="hospital"){
                        history.push('/hospitalHome');
                    }
                    
                }
                
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchUserFailure(errorMsg))
            })
    }
}

/*****************************************************************************************/

//user Registration

export const userRegistration =(userData,history) => {
    console.log("caaaaalleeeed");
    return (dispatch) => {
        dispatch(fetchUserRequest)
        axios.post('/signup',userData)
            .then(response => {
                if(response.data.errors){
                    console.log("error : " + response.data.errors)
                    dispatch(fetchUserFailure(response.data.errors))
                }
                else {
                    console.log(response.data)
                    dispatch(setLoginUser(response.data))
                    history.push('/');
                }
                
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchUserFailure(errorMsg))
            })
    }
}



/******************************************************************************************************************************/
//doctor registration
export const doctorRegistration =(userData,history) => {
    return (dispatch) => {
        dispatch(fetchUserRequest)
        axios.post('/signupDoctor',userData)
            .then(response => {
                if(response.data.errors){
                    console.log("error : " + response.data.errors)
                    dispatch(fetchUserFailure(response.data.errors))
                }
                else {
                    console.log(response.data)
                    dispatch(setLoginUser(response.data))
                    history.push('/doctorHome');
                }
                
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchUserFailure(errorMsg))
            })
    }
}

/***************************************************************************************************** */
//hospital registration 
export const hospitalRegistration =(userData,history) => {
    return (dispatch) => {
        dispatch(fetchUserRequest)
        axios.post('/hospitalSignup',userData)
            .then(response => {
                if(response.data.errors){
                    console.log("error : " + response.data.errors)
                    dispatch(fetchUserFailure(response.data.errors))
                }
                else {
                    console.log(response.data)
                    dispatch(setLoginUser(response.data))
                    history.push('/hospitalHome');
                }
                
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchUserFailure(errorMsg))
            })
    }
}

// export const updateUserData =(userData,history) => {
//     return (dispatch) => {
//         dispatch(fetchUserRequest)
//         axios.post('/updateUserData',userData)
//             .then(response => {
//                 if(response.data.errors){
//                     console.log("error : " + response.data.errors)
//                     dispatch(fetchUserFailure(response.data.errors))
//                 }
//                 else {
//                     console.log(response.data)
//                     dispatch(setLoginUser(response.data))
//                     history.push('/');
//                 }
                
//             })
//             .catch(error => {
//                 const errorMsg = error.message
//                 dispatch(fetchUserFailure(errorMsg))
//             })
//     }
// }


//*****************************************************************************/
 //GET BOOKED DETAILS

export const getBookings = (reg_id,history) =>{
     const data ={
         reg_id :reg_id
     }
     return (dispatch) =>{
        dispatch({
            type : LOADING_TRUE
        })
        axios.post('/getBookingDetails',data)
            .then(response => {
                if(response.data.error){
                    console.log("error");
                }
                else{
                    const bookings = response.data
                    dispatch({
                        type :FETCH_ALL_BOOKINGS,
                        payload : bookings
                    })

                }
            })
            .catch(error => {
                const errorMsg = error.message
               dispatch(fetchUserFailure(errorMsg))
            })
     }
 }

/****************************************************************************************** */





