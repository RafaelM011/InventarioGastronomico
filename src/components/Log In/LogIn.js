import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectError } from "../../slices/userSlice";

export default function LogIn() {
    const username = useRef();
    const password = useRef();
    const dispatch = useDispatch();
    const error = useSelector(selectError);

    function checkLogInInfo() {
        const userInfo = {
            username: username.current.value,
            password: password.current.value
        }
        dispatch(fetchUser(userInfo));
    }

    return(
        <>
            <div className="col-span-1 z-20 shadow-[8px_8px_8px_0px_#bbb] flex flex-col items-center" onKeyUp={(e) => {if (e.key === 'Enter') document.getElementById('loginButton').click()}}>
                <div className="w-[225px] h-[300px] bg-[#000692] rounded-b-full shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] mx-auto"> 
                    <div className="h-[180px] w-[180px] relative top-[90px] left-[23px] rounded-full bg-[#EFEFEF]"></div>
                </div>
                <h1 className="text-[35px] text-center"> INVENTARIO GASTRONÓMICO </h1>
                <h1 className="text-[35px] text-center mt-6 ml-[-95px]"> USUARIO</h1>
                <div className="place-self-start w-10/12 h-[65px] bg-[#DCDCDC] rounded-r-full mt-3 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] flex place-content-center">
                    <input className="bg-transparent border-none outline-0 place-self-center w-11/12 h-2/5 text-center font-bold text-2xl" type="text" ref={username}/>
                </div>
                <h1 className="text-[35px] text-center mt-8 ml-[-95px]"> CONTRASEÑA </h1>
                <div className="place-self-start w-10/12 h-[65px] bg-[#DCDCDC] rounded-r-full mt-3 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] flex place-content-center">
                    <input className="bg-transparent border-none outline-0 place-self-center w-11/12 h-2/5 text-center font-bold text-2xl" type="password" ref={password}/>
                </div>
                <p className="text-xl text-red-400 mt-6"> {error} </p>
                <div className="place-self-start w-10/12 h-[65px] bg-[#000692] rounded-r-full mt-10 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] text-center">
                    <button id='loginButton' className="text-[35px] font-thin text-white top-1" onClick={checkLogInInfo}> LOGIN </button>
                </div>
                <Link to="/recoverpsw">
                    <h1 className="text-lg text-center text-blue-400 underline mt-2 ml-[-90px]"> Olvide mi contraseña </h1>
                </Link>
            </div>
        </>
    )
}