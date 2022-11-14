import React, { useState } from "react";
import { Link } from "react-router-dom";

import RegisterModal from "../RegisterModal/RegisterModal";

export default function Header() {
    const [registerModal, setRegisterModal] = useState(false);
    
    const toggleModal = () => {
        setRegisterModal(!registerModal)
    }

    return(
        <>
            <div className="row-start-1 place-self-center w-11/12 h-[80px] border-b-4 border-white text-3xl flex items-center place-content-evenly shadow-[2px_8px_10px_0px_#bbb]">
                <Link to='/contactos'>
                    <div className="underline ml-5">CONTACTOS</div>
                </Link>
                <Link to='/manual'>
                    <div className="underline ml-5">MANUAL</div>
                </Link>
                <Link to='/servicios'>
                    <div className="underline ml-5">SERVICIOS</div>
                </Link>
                <Link to='/precios'>
                    <div className="underline ml-5">PRECIOS</div>
                </Link>
                <div className="underline ml-5 bg-white rounded-full w-56 h-12 flex items-center place-content-center shadow-[0px_0px_10px_8px_#bbb] cursor-pointer" onClick={toggleModal} > 
                    <h1> REGISTRO </h1>
                </div>
                {registerModal ? <RegisterModal toggle={toggleModal}/> : null}
            </div>
        </>
    )
}
