import React, { useEffect } from "react";

import Header from "../../components/Header/Header";
// import InfoBox from "../../components/InformationBox/InformationBox";
import LogIn from "../../components/Log In/LogIn";

function Home() {
    useEffect( () => {
        sessionStorage.clear();
    }, [])
    
    return(
        <>  
            <div className="grid grid-cols-[3fr,7fr] h-screen w-screen">
                <LogIn/>
                <div className="col-start-2 bg-[#F4F4F4] grid grid-rows-[2fr,10fr]">
                    <Header/>
                    {/* <InfoBox/> */}
                </div>
            </div>
        </>
    )
} 

export default Home;