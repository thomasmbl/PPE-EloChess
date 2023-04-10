import React from "react";
import images1 from "../images/elo/index";
import "./AvatarElo.css"

function AvatarElo(props){
    
    if(props.score<200){
        return(
            <div>
                <img  className="img2" src={images1.pieuvre} alt="pieuvre" />
            </div>
        )
    }

    else if(props.score>=200 && props.score<500){
        return(
            <div>
                <img  className="img2" src={images1.nemo} alt="nemo" />
            </div>
        )
    }

    else if(props.score>=500 && props.score<800){
        return(
            <div>
                <img  className="img2" src={images1.turtle} alt="turtle" />
            </div>
        )
    }
    else if(props.score>=800){
        return(
            
            <img  className="img2" src={images1.shark} alt="shark" />
            
        )
    }
}

export default AvatarElo;