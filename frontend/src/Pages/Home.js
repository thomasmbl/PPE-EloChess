import React, { useState, useEffect } from "react";
import "./Home.css";
import AvatarElo from "../outils/AvatarELo";
import RandomAvatar from "../outils/RandomAvatar";
import Coupe from '../images/coupe.png';
import SearchIcon from '@mui/icons-material/Search';



function Home() {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch("http://localhost:3001/eleves")
            .then((response) => response.json())
            .then((data) => {
                const sortedStudents = [...data].sort((a, b) => b.elo - a.elo);
                setStudents(sortedStudents);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredStudents = students.filter(student => {
        return student.pseudo.toLowerCase().includes(searchTerm.toLowerCase())
    });


    

    return(
        <div>
            <div className="title-classement">
                <img className='Coupe' src={Coupe} alt="Coupe" />
                <div className="test">
                    <p> Classement des joueurs </p>
                </div>
            </div>

            <div className="container">
                
                <div className="parametres">
                    <input type="text" placeholder="Rechercher un joueur" onChange={handleSearch}></input>
                    <SearchIcon/>
                </div>

                <div className="classement">
                    <table className="table2">
                        <thead>
                            <tr>
                                <th scope="col">Rang</th>
                                <th scope="col">Avatar</th>
                                <th scope="col">Pseudo</th>
                                <th scope="col">Ratio</th>
                                <th scope="col">Elo</th>
                                <th scope="col">Avatar ELO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student, index) => {
                                const rank = students.indexOf(student) + 1;
                                const ratio = (parseInt(student.nbPartiesGagne) / parseInt(student.nbPartiesJoue) * 100).toFixed(2);
                                return (
                                <tr key={index} > 
                                    <th scope="row">{rank}</th>
                                    <td><RandomAvatar number={rank}/></td>
                                    <td>{student.pseudo}</td>
                                    <td>{ratio} %</td>
                                    <td>{student.elo}</td>
                                    <td><AvatarElo score={student.elo}/></td>
                                </tr>
                                )
                            }).slice(0)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Home;
//onClick={() => handleClick(student._id)}
/*
<Classement />
<MyComponent/>
*/

/**
 * 
 * 
 * import "../App.css";
 * 
 * 
 * 
 * <tr>
                                <th className="rang" scope="row">1</th>
                                <td><img src={defaultavatar}></img></td>
                                <td>SuperCavalier</td>
                                <td>up</td>
                                <td>etoile</td>
                                <td><img src={nemoavatar}></img></td>
                            </tr>
                            <tr>
                                <th className="rang" scope="row">2</th>
                                <td><img src={defaultavatar}></img></td>
                                <td>TourFou</td>
                                <td>up</td>
                                <td>etoile</td>
                                <td><img src={nemoavatar}></img></td>
                            </tr>
 * 
 * 
 */

/* 
<button className="btn"> Ma maison</button>
<button className="btn"> Mon école</button>
<button className="btn"> Mon académie </button>
*/