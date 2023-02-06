import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { registerUser, selectError } from "../../slices/userSlice";
import ExitButton from "../../assets/exit_button.png";

export default function RegisterModal(props) {
    const {toggle} = props;
    const [isDisabled, setIsDisabled] = useState(true);
    const [newUser, setNewUser] = useState({});
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repPasswordError, setRepPasswordError] = useState('');
    const dispatch = useDispatch();
    const userInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();
    const repPasswordInput = useRef();
    const fetchError = useSelector(selectError);
    const errorRegEx = /username/;


    const checkInputs = () => {
        const currentInput = {
            username: userInput.current.value,
            email: emailInput.current.value,
            password: passwordInput.current.value,
            repPassword: repPasswordInput.current.value
        }

        const emailTest = checkEmail();
        const passwordTest = checkPassword();
        const repPasswordTest = checkRepPassword();

        if (emailTest && passwordTest && repPasswordTest){
            setIsDisabled(false)        
            setNewUser(currentInput)                
        }
        else {setIsDisabled(true)}
    }

    const checkEmail = () => {
        const emailRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        let emailTest = emailRegEx.test(emailInput.current.value);
        
        if( emailInput.current.value !== ''){
            if (!emailTest) setEmailError('This email is invalid')
            else setEmailError('')
    
            return emailTest;
        }
    }

    const checkPassword = () => {
        const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
        let passwordTest = passwordRegEx.test(passwordInput.current.value);
        
        if(passwordInput.current.value !== ''){
            if (!passwordTest) setPasswordError('This password is invalid')
            else setPasswordError('')
    
            return passwordTest;
        }
    }

    const checkRepPassword = () => {
        const verification = passwordInput.current.value === repPasswordInput.current.value; 
        if(repPasswordInput.current.value !== ''){
            if (verification) setRepPasswordError('')
            else setRepPasswordError('Password doesn\'t match')
            
            return verification;
        }
    }

    const registerNewUser = () => {
        dispatch(registerUser(newUser));
    }

    return(
        <>
            {/* OVERLAY */}
            <div className="w-screen h-screen bg-gray-400 absolute z-[1000] top-0 left-0 right-0 bottom-0 opacity-80"></div>   
            {/* MODAL */}
            <div className="w-[500px] h-fit pb-8 bg-white absolute z-[1001] top-[20%] left-[35%] rounded-3xl shadow-[0px_0px_15px_10px] shadow-[#000692]">
                <div className="absolute right-[-30px] top-[-25px] rounded-full w-[60px] h-[60px] bg-white shadow-[4px_-4px_15px_8px] shadow-[#000692]">
                    <img className="w-full h-full cursor-pointer" src={ExitButton} alt="exit button" onClick={toggle}/>
                </div>
                
                <h1 className="text-center text-3xl font-bold mt-10"> REGISTRO </h1>
                
                <h2 className="text-center text-xl font-semibold mt-4"> USUARIO </h2>
                <div className="w-10/12 h-[40px] bg-[#DCDCDC] rounded-2xl mt-3 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] flex place-content-center m-auto">
                    <input ref={userInput} className="h-full w-full rounded-2xl bg-transparent border-none outline-0 place-self-center  text-center font-thin text-xl focus:bg-gradient-to-r from-[#000692] via-transparent to-[#000692] focus:font-semibold" type="text"/>
                </div>
                { errorRegEx.test(fetchError) ? <p className="text-base text-red-400 mt-2 mb-[-16px] text-center"> {fetchError} </p> :  null }
                <h2 className="text-center text-xl font-semibold mt-4"> E-MAIL </h2>
                <div className="w-10/12 h-[40px] bg-[#DCDCDC] rounded-2xl mt-3 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] flex place-content-center m-auto">
                    <input ref={emailInput} onBlur={checkEmail} className="h-full w-full rounded-2xl bg-transparent border-none outline-0 place-self-center  text-center font-thin text-xl focus:bg-gradient-to-r from-[#000692] via-transparent to-[#000692] focus:font-semibold" type="text"/>
                </div>
                { emailError !== '' ? <p className="text-base text-red-400 mt-2 mb-[-16px] text-center"> {emailError} </p> :  null }
                { !errorRegEx.test(fetchError) ? <p className="text-base text-red-400 mt-2 text-center"> {fetchError} </p> :  null }
                <h2 className="text-center text-xl font-semibold mt-4"> CONTRASEÑA </h2>
                <div className="w-10/12 h-[40px] bg-[#DCDCDC] rounded-2xl mt-3 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] flex place-content-center m-auto">
                    <input ref={passwordInput} onBlur={checkPassword} className="h-full w-full rounded-2xl bg-transparent border-none outline-0 place-self-center  text-center font-thin text-xl focus:bg-gradient-to-r from-[#000692] via-transparent to-[#000692] focus:font-semibold" type="password"/>
                </div>
                { passwordError !== '' ? <p className="text-base text-red-400 mt-2 mb-[-16px] text-center"> {passwordError} </p> :  null }
                <h2 className="text-center text-xl font-semibold mt-4"> REPITA CONTRASEÑA </h2>
                <div className="w-10/12 h-[40px] bg-[#DCDCDC] rounded-2xl mt-3 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] flex place-content-center m-auto">
                    <input ref={repPasswordInput} onBlur={checkRepPassword} className="h-full w-full rounded-2xl bg-transparent border-none outline-0 place-self-center  text-center font-thin text-xl focus:bg-gradient-to-r from-[#000692] via-transparent to-[#000692] focus:font-semibold" type="password"/>
                </div>
                { repPasswordError !== '' ? <p className="text-base text-red-400 mt-2 mb-[-16px] text-center"> {repPasswordError} </p> :  null }
                <div className="mx-auto mt-10 w-10/12 h-[50px] bg-[#000692] rounded-full shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] text-center" onMouseEnter={checkInputs}>
                    <button className="text-[35px] font-thin text-white mt-1" disabled={isDisabled} onClick={registerNewUser}> REGISTRAR </button>
                </div>
            </div>
        </>
    )
}   