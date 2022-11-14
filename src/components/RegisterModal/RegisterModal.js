import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { registerUser } from "../../slices/userSlice";
import ExitButton from "../../assets/exit_button.png";

export default function RegisterModal(props) {
    const {toggle} = props;
    const [isDisabled, setIsDisabled] = useState(true);
    const [newUser, setNewUser] = useState({});
    const dispatch = useDispatch();
    const userInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();
    const repPasswordInput = useRef();

    const checkInputs = () => {
        const currentInput = {
            username: userInput.current.value,
            email: emailInput.current.value,
            password: passwordInput.current.value,
            repPassword: repPasswordInput.current.value
        }
        
        const emailRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
        let emailTest = emailRegEx.test(currentInput.email);
        let passwordTest = passwordRegEx.test(currentInput.password);
        let repPasswordTest = currentInput.password === currentInput.repPassword;

        if (emailTest && passwordTest && repPasswordTest){
            setIsDisabled(false)        
            setNewUser(currentInput)                
        }
        else {setIsDisabled(true)}
    }

    const registerNewUser = () => {
        dispatch(registerUser(newUser));
    }

    return(
        <>
            {/* OVERLAY */}
            <div className="w-screen h-screen bg-gray-400 absolute z-[1000] top-0 left-0 right-0 bottom-0 opacity-80"></div>   
            {/* MODAL */}
            <div className="w-[500px] h-[600px] bg-white absolute z-[1001] top-[20%] left-[35%] rounded-3xl shadow-[0px_0px_15px_10px] shadow-[#000692]">
                <div className="absolute right-[-30px] top-[-25px] rounded-full w-[60px] h-[60px] bg-white shadow-[4px_-4px_15px_8px] shadow-[#000692]">
                    <img className="w-full h-full cursor-pointer" src={ExitButton} alt="exit button" onClick={toggle}/>
                </div>
                
                <h1 className="text-center text-3xl font-bold mt-10"> REGISTRO </h1>
                
                <h2 className="text-center text-xl font-semibold mt-4"> USUARIO </h2>
                <div className="w-10/12 h-[40px] bg-[#DCDCDC] rounded-full mt-3 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] flex place-content-center m-auto">
                    <input ref={userInput} className="h-full w-full rounded-full bg-transparent border-none outline-0 place-self-center  text-center font-thin text-xl focus:bg-gradient-to-r from-[#000692] via-transparent to-[#000692] focus:font-semibold" type="text"/>
                </div>
                <h2 className="text-center text-xl font-semibold mt-4"> E-MAIL </h2>
                <div className="w-10/12 h-[40px] bg-[#DCDCDC] rounded-full mt-3 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] flex place-content-center m-auto">
                    <input ref={emailInput} className="h-full w-full rounded-full bg-transparent border-none outline-0 place-self-center  text-center font-thin text-xl focus:bg-gradient-to-r from-[#000692] via-transparent to-[#000692] focus:font-semibold" type="text"/>
                </div>
                <h2 className="text-center text-xl font-semibold mt-4"> CONTRASEÑA </h2>
                <div className="w-10/12 h-[40px] bg-[#DCDCDC] rounded-full mt-3 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] flex place-content-center m-auto">
                    <input ref={passwordInput} className="h-full w-full rounded-full bg-transparent border-none outline-0 place-self-center  text-center font-thin text-xl focus:bg-gradient-to-r from-[#000692] via-transparent to-[#000692] focus:font-semibold" type="password"/>
                </div>
                <h2 className="text-center text-xl font-semibold mt-4"> REPITA CONTRASEÑA </h2>
                <div className="w-10/12 h-[40px] bg-[#DCDCDC] rounded-full mt-3 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] flex place-content-center m-auto">
                    <input ref={repPasswordInput} className="h-full w-full rounded-full bg-transparent border-none outline-0 place-self-center  text-center font-thin text-xl focus:bg-gradient-to-r from-[#000692] via-transparent to-[#000692] focus:font-semibold" type="password"/>
                </div>
                <div className="mx-auto mt-10 w-10/12 h-[50px] bg-[#000692] rounded-full shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] text-center" onMouseEnter={checkInputs}>
                    <button className="text-[35px] font-thin text-white mt-1" disabled={isDisabled} onClick={registerNewUser}> REGISTRAR </button>
                </div>
            </div>
        </>
    )
}   