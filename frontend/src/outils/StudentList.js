import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExcelJS from 'exceljs';
import moment from 'moment';
import "./StudentList.css"
import Coupe from '../images/coupe.png';



function StudentList() {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  


  //Récupération des élèves depuis mongodb et ajout des élèves selectionnés dans une liste.
  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    const res = await axios.get('http://localhost:3001/eleves');
    if (res.status === 200) {
      setStudents(res.data);
    }
  };

  async function getPlayerDataById(id) {
    const res = await fetch(`http://localhost:3001/eleves/${id}`);
    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
    return null;
  }

  async function updatePlayerDataByID(id, playerData) {
    try {
      await axios.patch(`http://localhost:3001/eleves/${id}`, playerData);
    } catch (error) {
      console.error(error);
    }
  }
  


  async function updateElo(joueur1, joueur2, winner) {
    // Calculer le résultat du match (0 = joueur 1 gagne, 1 = joueur 2 gagne, 2 = match nul)
    let resultatMatch = 0.5;
    if (winner === joueur1) {
      resultatMatch = 0;
    } else if (winner === joueur2) {
      resultatMatch = 1;
    }
  
    // Calculer les scores attendus pour chaque joueur
    const expected1 = expectedScore(parseInt(joueur2.elo) - parseInt(joueur1.elo));
    const expected2 = 1 - expected1;
  
    // Définir le coefficient K
    const K = 40;
  
    //Calculer les nouveaux ELO de chaque joueur et actualiser la BDD
    joueur1.elo = parseInt(joueur1.elo) + Math.round(K * (expected2 - resultatMatch));
    await updatePlayerDataByID(joueur1._id, joueur1);

    joueur2.elo = parseInt(joueur2.elo) + Math.round(K * (resultatMatch - expected1));
    await updatePlayerDataByID(joueur2._id, joueur2);
  }
  

  function expectedScore(diff) {
    return 1 / (1 + Math.pow(10, diff / 400));
  }
  

  

  

  const handleSelectStudent = (event) => {
    const selectedStudentId = event.target.value;
    const selectedStudent = students.find((student) => student._id === selectedStudentId);

    if (selectedStudent) {
      setStudents(prevStudents => prevStudents.filter(student => student._id !== selectedStudentId));
      setSelectedStudents(prevSelectedStudents => [...prevSelectedStudents, selectedStudent]);
    }
    //setSelectedStudents([...selectedStudents, selectedStudent]);
  };
  
  const handleRemoveSelectedStudent = (student) => {
    //setSelectedStudents(selectedStudents.filter((s) => s !== student));
    setSelectedStudents(prevSelectedStudents => prevSelectedStudents.filter(selectedStudent => selectedStudent._id !== student._id));
    setStudents(prevStudents => [...prevStudents, student]);
  };
  ////////////////////////////////////////////////////////////////////////////////////////////
  //On récupère le filtre
  const [filterType, setFilterType] = useState("");
  const [fileName, setFileName] = useState("");

  //Génération de la feuille de tournois
  function handleGenerateTournamentSheet() {
    let filtered_data;
    let filterValue = (400,800);

    //On filtre les données en fonction du filtre choisi
    if (filterType === "MAISON") {
      const houses = [...new Set(selectedStudents.map((student) => student.maison))];
      filtered_data = [];
      for (const house of houses) {
        const players = selectedStudents.filter((player) => player.maison === house);
        filtered_data.push(...players);
      }
    } else if (filterType === "ELO") {
      filtered_data = selectedStudents.filter(
        (player) => player.elo >= filterValue.min && player.elo <= filterValue.max
      );
    } else if (filterType === "CLASSE") {
      filtered_data = selectedStudents.filter((player) => player.classe === filterValue);
    } else {
      filtered_data = selectedStudents;
    }

    //Tri des joueurs par ordre alphabétique
    filtered_data.sort((a, b) => a.nom.localeCompare(b.nom));

    //Création des paires de joueurs avec l'algorithme du Round Robin
    let num_players = filtered_data.length;
    if (num_players % 2 === 1) {
      filtered_data.push({ nom: "Joueur Fantôme", maison: "", ELO: -1, classe: "" });
      num_players += 1;
    }

    const half_num_players = Math.floor(num_players / 2);
    const player_list = filtered_data.map((_, index) => index);
    const rounds = [];
    let round;

    for (let i = 0; i < num_players - 1; i++) {
      round = [];
      for (let j = 0; j < half_num_players; j++) {
        if (player_list[j] !== null && player_list[num_players - 1 - j] !== null) {

          round.push([player_list[j], player_list[num_players - 1 - j]]);

          /*if (!["Joueur Fantôme", filtered_data[player_list[j]].nom, filtered_data[player_list[num_players - 1 - j]].nom].includes("Joueur Fantôme")) {
            
            console.error('test', filtered_data[player_list[j]].prenom)

            if (filtered_data[player_list[j]].maison !== filtered_data[player_list[num_players - 1 - j]].maison) {
              round.push([player_list[j], player_list[num_players - 1 - j]]);
            }
          }*/
        }
      }
      rounds.push(round);
      player_list.splice(1, 0, player_list.pop());
    }

    //Écriture des paires de joueurs dans la feuille de tournoi
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Tournoi');

    worksheet.addRow(["N° ronde", "Joueur 1", "ID Joueur 1", "Joueur 2", "ID Joueur 2", "Gagnant du match", "ID Gagnant"]);

    //Redimension des colonnes Excel
    worksheet.getColumn('A').width = 10;
    worksheet.getColumn('B').width = 13;
    worksheet.getColumn('C').width = 30;
    worksheet.getColumn('D').width = 13;
    worksheet.getColumn('E').width = 30;
    worksheet.getColumn('F').width = 17;
    worksheet.getColumn('G').width = 30;



    for (let round_num = 0; round_num < rounds.length; round_num++) {
      for (let pair of rounds[round_num]) {
        const player1 = filtered_data[pair[0]];
        const player2 = filtered_data[pair[1]];
        worksheet.addRow([`Ronde ${round_num + 1}`, player1.prenom, player1._id, player2.prenom, player2._id, null]);
      }
    }

    //Définition du nom du fichier Excel en fonction du filtre choisi et de la date du jour
    const date_format = 'DD-MM-YYYY';
    const date_str = moment().format(date_format);
    let filename;
    if (filterType === "MAISON") {
      filename = `Tournoi par Maison (${date_str}).xlsx`;
    } else if (filterType === "ELO") {
      filename = `Tournoi par ELO (${filterValue[0]}-${filterValue[1]}) (${date_str}).xlsx`;
    } else if (filterType === "CLASSE") {
      filename = `Tournoi par Classe (${filterValue}) (${date_str}).xlsx`;
    } else {
      filename = `Tournoi général (${date_str}).xlsx`;
      setFileName(filename);
    }

    //Enregistrement du fichier Excel
    console.log("feuille de tournoi générée");
    //workbook.xlsx.writeFile(filename);

    
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
    });
  }
  ////////////////////////////////////////////////////////////////////////////////////////////

  async function handleScoreSheet(file) {
    const workbook = new ExcelJS.Workbook();
    

    //Lecture du contenu du fichier en utilisant FileReader
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        workbook.xlsx.load(data)
          .then(async () => {
            //On Récupère la première feuille de calcul
            const worksheet = workbook.getWorksheet(1);

            //On Vérifie si worksheet est défini
            if (!worksheet) {
              throw new Error('Feuille de calcul introuvable');
            }

  
            //On Récupère les données des colonnes C et E
            const columnCData = [];
            const columnEData = [];
            const columnGData = [];
  
            worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
              if (rowNumber > 1) { // On ignore la première ligne qui contient les titres des colonnes
                columnCData.push(row.getCell('C').value);
                columnEData.push(row.getCell('E').value);
                columnGData.push(row.getCell('G').value);
              }   
            });

            //Actualisation BDD
            let rowNumber;

            if (columnCData.length >= columnEData.length && columnCData.length >= columnGData.length) {
              rowNumber = columnCData.length;
            } else if (columnEData.length >= columnCData.length && columnEData.length >= columnGData.length) {
              rowNumber = columnEData.length;
            } else {
              rowNumber = columnGData.length;
            }

            for(let i = 0; i < rowNumber; i++){
              if(columnCData[i] !== null && columnEData[i] !== null && columnGData[i] !== null){

                //On récupère les data des joueurs(élèves)
                let joueur1 = await getPlayerDataById(columnCData[i]);
                let joueur2 = await getPlayerDataById(columnEData[i]);
                let winner;

                //On actualise le nombre de parties jouées / gagnées
                if(columnGData[i] == columnCData[i]){
                  joueur1.nbPartiesGagne = parseInt(joueur1.nbPartiesGagne) + 1;
                  winner = joueur1;
                }else{
                  joueur2.nbPartiesGagne = parseInt(joueur2.nbPartiesGagne) + 1;
                  winner = joueur2;
                }
                joueur1.nbPartiesJoue = parseInt(joueur1.nbPartiesJoue) + 1;
                joueur2.nbPartiesJoue = parseInt(joueur2.nbPartiesJoue) + 1;

                //On Update le nb de parties dans la BDD
                await updatePlayerDataByID(joueur1._id, joueur1);
                await updatePlayerDataByID(joueur2._id, joueur2);
                
                //Update du elo
                await updateElo(joueur1, joueur2, winner);
              }
            }


            console.error('cd1', columnCData[5], columnEData[5], columnGData[5], rowNumber)
  
            // Renvoyer les données récupérées
            resolve({ columnCData, columnEData });
          })
          .catch((error) => {
            // Renvoyer l'erreur en cas d'échec de la lecture du fichier
            reject(error);
          });
      };
      reader.onerror = (event) => {
        // Renvoyer l'erreur en cas d'échec de la lecture du fichier
        reject(reader.error);
      };
      reader.readAsArrayBuffer(file);
    });
  }
  
  function handleFileUpload(event) {
    const file = event.target.files[0];
    handleScoreSheet(file)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
    });
    
      
  }
  


  return (
    <div className='container5'>
      {/*
      <h1>Filtres</h1>
        <button onClick={handleFilterClick} value='MAISON'>MAISON</button>
        <button onClick={handleFilterClick} value='ELO'>ELO</button>
        <button onClick={handleFilterClick} value='CLASSE'>CLASSE</button>
      */}
      <h1>Gestion des tournois & résultats</h1>
      <img className='Coupe2' src={Coupe} alt="Coupe" />

      <h5>-------------\/-------------</h5>
      <h1>Liste d'élèves</h1>
      <select onChange={handleSelectStudent} value="">
        <option value="">Sélectionnez un élève</option>
        {students.map((student) => (
          <option key={student._id} value={student._id}>
            {student.prenom}
          </option>
        ))}
      </select>

      <h5>-------------\/-------------</h5>

      <h1>Liste d'élèves sélectionnés</h1>
      <h5>Nombre d'élèves sélectionnés : {selectedStudents.length}</h5>
      <div className="menu-container">
        <ul className="menu-list">
          {selectedStudents
            .sort((a, b) => a.prenom.localeCompare(b.prenom))
            .map((student) => (
              <li key={student._id}>
                {student.prenom}{'          '}
                <span onClick={() => handleRemoveSelectedStudent(student)}>X</span>
              </li>
            ))}
        </ul>
      </div>

      <button className="btn-sheet" onClick={handleGenerateTournamentSheet}>Générer une feuille de tournoi</button>
      
      <h1>Upload les résultats</h1>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
}

export default StudentList;


/*<select onChange={handleSelectStudent} value={selectedStudents}>
        <option value="">Sélectionnez un élève</option>
        {students.map((student) => (
          <option key={student._id} value={student._id}>
            {student.prenom}
          </option>
        ))}
      </select>*/