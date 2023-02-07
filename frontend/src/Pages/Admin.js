
import axios from "axios";
import React, { useEffect, useState } from "react";
import './Admin.css';
import { Link } from "react-router-dom";
import { TonalitySharp } from "@mui/icons-material";


const init2 = {
    saisonNumber:"",
    deathsNumber:"",
}


const init = {
    nom: "",
    prenom: "",
    section: "",
    classe: "",
    pseudo: "",
    mdp: "",
    elo: "",
    maison: "",
    nbPartiesJoue: "",
    nbPartiesGagne: "",
    idEcole: ""
}

const Admin = () => {
    const [data, setdata] = useState([]);
    const [state, setState] = useState(init);
    const [state2, setState2] = useState(init2);

    const { saisonNumber, deathsNumber } = state2;


    const { nom, prenom, section, classe, pseudo, mdp, elo, maison, nbPartiesJoue, nbPartiesGagne, idEcole } = state;

    const getEleves = async () => {
        const res = await axios.get("http://localhost:3001/eleves")
        if (res.status === 200) {
            setdata(res.data);
        }
    };

    useEffect(() => {
        getEleves();
    }, [])





    /*
    CRUD Methods
    */
    
    const getSaisons = async () => {
        const res = await axios.get("http://localhost:3001/saisons")
        if (res.status === 200) {
            setdata(res.data);
        }
    };
    

     
    const addSaison = async (e) => {
        await axios.post("http://localhost:3001/saisons", e);
        getSaisons();
    };

    const deleteSaison = async (id) => {
        await axios.delete(`http://localhost:3001/saisons/${id}`)
        getSaisons();
    };

    const updateSaison = async (id) => {
        await axios.patch(`http://localhost:3001/saisons/${id}`, state)
        getSaisons();
    }


    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({...state, [name]: value });
    }
    
    const handleSubmitAdd = (e) => {
        e.preventDefault();
        if(!saisonNumber || !deathsNumber) {
            console.error("Empty field", saisonNumber, deathsNumber)
        } else {
            addSaison(state);
        }
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        if(!saisonNumber || !deathsNumber) {
            console.error("Empty field", saisonNumber, deathsNumber)
        } else {
            updateSaison(state);
        }
    }

    /*
    useEffect(() => {
        getSaisons();
    }, [])
    */
    

    
    

    console.log("data=>", data);

    return (
        <div className="mainContent">
            <table className="table">
                <thead>
                    <tr>
                        <th className="th">Nom</th>
                        <th className="th">Prenom</th>
                        <th className="th">Section</th>
                        <th className="th">Classe</th>
                        <th className="th">Pseudo</th>
                        <th className="th">Elo</th>
                        <th className="th">Maison</th>
                        <th className="th">Parties Jouées</th>
                        <th className="th">Parties gagnées</th>
                        <th className="th">ID école</th>
                        <th className="th">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{item.prenom}</th>
                                <td>{item.nom}</td>
                                <td>{item.section}</td>
                                <td>{item.classe}</td>
                                <td>{item.pseudo}</td>
                                <td>{item.elo}</td>
                                <td>{item.maison}</td>
                                <td>{item.nbPartiesJoue}</td>
                                <td>{item.nbPartiesGagne}</td>
                                <td>{item.idEcole}</td>


                                <td>
                                    <button className="btn-delete" onClick={() => deleteSaison(item._id)}>Delete</button>
                                    <button className="btn-edit" onClick={() => updateSaison(item._id)}>Update</button>
                                </td>
                            </tr>
                           
                        )
                    })}
                </tbody>
            </table>
            <div>
                <form>
                    <label>Prénom</label>
                    <input placeholder="Prénom" id="prénom" name="prénom" onChange={handleInputChange} value={prenom}></input>

                    <label>Nom</label>
                    <input placeholder="Nom" id="nom" name="nom" onChange={handleInputChange} value={nom}></input>

                    <label>Section</label>
                    <input placeholder="Section" id="section" name="section" onChange={handleInputChange} value={section}></input>

                    <label>Classe</label>
                    <input placeholder="Classe" id="classe" name="classe" onChange={handleInputChange} value={classe}></input>

                    <label>Pseudo</label>
                    <input placeholder="Pseudo" id="pseudo" name="pseudo" onChange={handleInputChange} value={pseudo}></input>

                    <label>Elo</label>
                    <input placeholder="Elo" id="elo" name="elo" onChange={handleInputChange} value={elo}></input>

                    <label>Maison</label>
                    <input placeholder="Maison" id="maison" name="maison" onChange={handleInputChange} value={maison}></input>

                    <label>Parties Jouées</label>
                    <input placeholder="Parties Jouées" id="nbPartiesJoue" name="nbPartiesJoue" onChange={handleInputChange} value={nbPartiesJoue}></input>

                    <label>Parties Gagnéss</label>
                    <input placeholder="Parties Gagnées" id="nbPartiesGagne" name="nbPartiesGagne" onChange={handleInputChange} value={nbPartiesGagne}></input>

                    <label>ID école</label>
                    <input placeholder="Id école" id="idEcole" name="idEcole" onChange={handleInputChange} value={idEcole}></input>








                    <label>Season Number</label>
                    <input placeholder="Season Number" id="saisonNumber" name="saisonNumber" onChange={handleInputChange} value={saisonNumber}></input>

                    <label>Death Count</label>
                    <input placeholder="Death Count" name="deathsNumber" onChange={handleInputChange} value={deathsNumber}></input>

                    <input type="submit" value="Add" onClick={handleSubmitAdd}></input>
                </form>
            </div>
        </div>
    )
    
}

export default Admin

/**
 * <input type="submit" value="Edit" onClick={updateSaison(document.getElementById("ID").value)}></input>
 */