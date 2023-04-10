
import axios from "axios";
import React, { useEffect, useState } from "react";
import './Admin.css';
import StudentList from "../outils/StudentList";
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';




const init = {
    nom: "",
    prenom: "",
    section: "-",
    classe: "-",
    pseudo: "",
    elo: "400",
    maison: "-",
    nbPartiesJoue: "0",
    nbPartiesGagne: "0",
    idEcole: "-",
}

const joueur1 = {
    pseudo : "",
    elo : "",
    newElo : "",
}
const joueur2 = {
    pseudo : "",
    elo : "",
    newElo : "",
}

const Admin = () => {
    const [data, setdata] = useState([]);
    const [state, setState] = useState(init);

    const { nom, prenom, section, classe, pseudo, elo, maison, nbPartiesJoue, nbPartiesGagne, idEcole } = state;
   

    useEffect(() => {
        getEleves();
    }, [])


    const getEleves = async () => {
        const res = await axios.get("http://localhost:3001/eleves")
        if (res.status === 200) {
            setdata(res.data);
        }
    };

    const addEleve = async (e) => {
        await axios.post("http://localhost:3001/eleves", e);
        
        getEleves();
    };

    const deleteEleve = async (id) => {
        await axios.delete(`http://localhost:3001/eleves/${id}`)
        getEleves();
    };

    const updateEleve = async (id) => {
        console.error(nom);
        await axios.patch(`http://localhost:3001/eleves/${id}`, state)
        getEleves();
    };


    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({...state, [name]: value });
    }

    
    
    const handleSubmitAdd = (e) => {
        e.preventDefault();
        if(!nom || !prenom || !section || !classe || !pseudo || !elo || !maison || !nbPartiesJoue || !nbPartiesGagne || !idEcole) {
            console.error("Empty field")
        } else {
            addEleve(state);
        }
    }

    const handleClick = (eleve) => {
        document.getElementById("nom").value = eleve.nom;
        document.getElementById("prenom").value = eleve.prenom;
        document.getElementById("section").value = eleve.section;
        document.getElementById("classe").value = eleve.classe;
        document.getElementById("pseudo").value = eleve.pseudo;
        document.getElementById("elo").value = eleve.elo;
        document.getElementById("maison").value = eleve.maison;
        document.getElementById("nbPartiesJoue").value = eleve.nbPartiesJoue;
        document.getElementById("nbPartiesGagne").value = eleve.nbPartiesGagne;
        document.getElementById("idEcole").value = eleve.idEcole;
        setState({
            nom : eleve.nom,
            prenom : eleve.prenom,
            section : eleve.section,
            classe : eleve.classe,
            pseudo : eleve.pseudo,
            elo : eleve.elo,
            maison : eleve.maison,
            nbPartiesJoue : eleve.nbPartiesJoue,
            nbPartiesGagne : eleve.nbPartiesGagne,
            idEcole : eleve.idEcole,
        })
      }

      const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    } ;
    const filteredData = data.filter((item) => {
        const searchRegex = new RegExp(searchTerm, 'gi');
        return (
          searchRegex.test(item.prenom) ||
          searchRegex.test(item.nom) ||
          searchRegex.test(item.section) ||
          searchRegex.test(item.classe) ||
          searchRegex.test(item.pseudo) ||
          searchRegex.test(item.maison) ||
          searchRegex.test(item.idEcole)
        );
      });

    return (
        <div className="mainContent">
            <div className="container">
                <div className="container2">
                    <form>
                        <div>
                            <label>Nom</label>
                            <input placeholder="Nom" id="nom" name="nom" onChange={handleInputChange} value={nom}></input>

                            <label>Prénom</label>
                            <input placeholder="Prénom" id="prenom" name="prenom" onChange={handleInputChange} value={prenom}></input>

                            <label>Pseudo</label>
                            <input placeholder="Pseudo" id="pseudo" name="pseudo" onChange={handleInputChange} value={pseudo}></input>
                        </div>
                        <div>
                            <label>Elo</label>
                            <input placeholder="Elo" id="elo" name="elo" onChange={handleInputChange} value={elo}></input>
                            
                            <label>Parties Jouées</label>
                            <input placeholder="Parties Jouées" id="nbPartiesJoue" name="nbPartiesJoue" onChange={handleInputChange} value={nbPartiesJoue}></input>
                            
                            <label>Parties Gagnées</label>
                            <input placeholder="Parties Gagnées" id="nbPartiesGagne" name="nbPartiesGagne" onChange={handleInputChange} value={nbPartiesGagne}></input>
                        </div>
                        <div>
                            <label>Classe</label>
                            <input placeholder="Classe" id="classe" name="classe" onChange={handleInputChange} value={classe}></input>

                            <label>Section</label>
                            <input placeholder="Section" id="section" name="section" onChange={handleInputChange} value={section}></input>

                            <label>Maison</label>
                            <input placeholder="Maison" id="maison" name="maison" onChange={handleInputChange} value={maison}></input>
                            
                            <label>ID école</label>
                            <input placeholder="Id école" id="idEcole" name="idEcole" onChange={handleInputChange} value={idEcole}></input>
                        </div>
                        <div className="submitAdd">
                            <input type="submit" value="Add" onClick={handleSubmitAdd}></input>
                        </div>
                    </form>
                </div>
                <div className="outils">
                    <div className="parametres">
                        <input type="text" placeholder="Rechercher un élève" value={searchTerm} onChange={handleChange} />
                        <SearchIcon/>
                    </div>
                    <div>
                        <RefreshIcon onClick={getEleves} className="refresh"/>
                    </div>
                </div>
                
                <table className="table td">
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
                        {filteredData.map((item, index) => {
                            return (
                                <tr key={index}  onClick={() => handleClick(item)}>
                                    <th scope="row">{item.nom}</th>
                                    <td>{item.prenom}</td>
                                    <td>{item.section}</td>
                                    <td>{item.classe}</td>
                                    <td>{item.pseudo}</td>
                                    <td>{item.elo}</td>
                                    <td>{item.maison}</td>
                                    <td>{item.nbPartiesJoue}</td>
                                    <td>{item.nbPartiesGagne}</td>
                                    <td>{item.idEcole}</td>


                                    <td>
                                        <button className="btn-delete" onClick={() => deleteEleve(item._id)}>Delete</button>
                                        <button className="btn-edit" onClick={() => updateEleve(item._id)}>Update</button>
                                    </td>
                                </tr>

                            )
                        })}
                    </tbody>
                </table>
            </div>

            <StudentList/>
            
        </div>
    )
    
}

export default Admin
