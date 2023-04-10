import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import defaultavatar from "../images/avatars/defaultavatar.png";
import darkblue from "../images/avatars/darkblue.png";
import jaune from "../images/avatars/jaune.png";
import marron from "../images/avatars/marron.png";
import orange from "../images/avatars/orange.png";
import rose from "../images/avatars/rose.png";
import rouge from "../images/avatars/rouge.png";
import turquoise from "../images/avatars/turquoise.png";
import vert from "../images/avatars/vert.png";
import violet from "../images/avatars/violet.png";


function RandomAvatar({ number }) {
    const [randomAvatar, setRandomAvatar] = useState("");

    useEffect(() => {
        const avatars = [
            darkblue,
            defaultavatar,
            jaune,
            marron,
            orange,
            rose,
            rouge,
            turquoise,
            vert,
            violet,
        ];

        // Utiliser le nombre donné en paramètre pour accéder à l'image correspondante dans le tableau
        const avatarIndex = number % avatars.length;
        const randomAvatar = avatars[avatarIndex];
        setRandomAvatar(randomAvatar);
    }, [number]); // Mettre à jour lorsque le nombre donné en paramètre change

    return (
        <div>
            {randomAvatar && (
                <img src={randomAvatar} alt="random" style={{ width: '25%', height: '25%' }} />
            )}
        </div>
    );
}

export default RandomAvatar;