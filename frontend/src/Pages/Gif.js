import React from "react";
import Dead from '../images/dead.gif';
import Alive from '../images/alive.gif';
import './Gif.css';


function Gif(props){
    if(props.text==='Alive'){
        return(
            <div>
                <h1 className="txt1">Alive</h1>
                <img src={Alive} className="img1"></img>
            </div>
        
        )
    }
    else if(props.text==='Presumed dead'){
        return(
            <div>
                <h1 className="txt2">Presumed Dead</h1>
                <img src={Dead} className="img2"></img>
            </div>
        
        )
    }
    else if(props.text==='Deceased'){
        return(
            <div>
                <h1 className="txt2">Deceased</h1>
                <img src={Dead} className="img2"></img>
            </div>
        
        )
    }
}

export default Gif;

/*


 if(text=='Alive'){
        return(
        <img src={Alive}></img>
        )
    }
    else if(text=='Presumed Dead'){
        return(
        <img src={Dead}></img>
        )
    }


*/