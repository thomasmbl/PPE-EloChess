import React, { useEffect, useState } from "react";
import "./Home.css";
import fetchData from "../utils/fetchData";
import Gif from "./Gif";
import LineChart from "../Components/LineChart";



function Home() {

    const [text, setText] = useState("Walter White")
    const [data, setData] = useState([])
    const [quote, setQuote] = useState([])
    

    useEffect(() => {
        const getData = async () => {
          const result = await fetchData(text)
          setData(result.data)
          console.log(result);
        }
        getData();
    }, [text]);

    const fetchQuote = () => {
        return fetch("https://www.breakingbadapi.com/api/quote/random")
              .then((response) => response.json())
              .then((data) => setQuote(data));
    }
    
    useEffect(() => {
        fetchQuote();
    },[])


    const getText = (text) => {
        setText(text);
        fetchQuote();
        console.log(text);
    }
    
    return(
        <div className="mainContent">
            <p>PAGE D'ACCUEIL</p>
        </div>
    )
}

export default Home;

/**
 * 
 * 
  <div className="Card5">
                    {quote.map((quoteObj) => (
                            <div key={quoteObj.quote_id}>
                                <h3>Random quote</h3>
                                <p className="p1">"{quoteObj.quote}"</p>
                                <p className="p2">- {quoteObj.author} -</p>
                            </div>
                        ))}
                    </div>
 */



/*


<input id="cinput" type="text" placeholder='Character Name'></input>
<button type="submit" onClick={(event) => {getText(document.getElementById('cinput').value)}}>Rechercher</button>
<option value="Marco & Leonel Salamanca">Marco & Leonel Salamanca</option>
<option value="Lydia Rodarte-Quayle">Lydia Rodarte-Quayle</option>
<option value="Skinny Pete">Skinny Pete</option>
<option value="Andrea Cantillo">Andrea Cantillo</option>
<option value="Ken">Ken</option>
<option value="Holly White">Holly White</option>
<option value="Donald Margolis">Donald Margolis</option>
<option value="Group Leader">Group Leader</option>
<option value="Stacey Ehrmantraut">Stacey Ehrmantraut</option>
<option value="Officer Saxton">Officer Saxton</option>

useEffect(() => {
        const getData = async () => {
          const result2 = await fetchQuote()
          setQuote(result2.data)
          console.log(result2);
        }
        getData();
      }, [quote]);

 {quote && quote.length > 0 && quote.map((quoteObj, index) => (
                    <div key={quoteObj.quote_id}>
                        <p>{quoteObj.quote}</p>
                    </div>
                    ))}






                    const fetchQuote = async () => {
        const response = await fetch("https://www.breakingbadapi.com/api/quote/random");
        const res = await response.json();
        return setQuote(res);
      }
    
      useEffect(() => {
        fetchQuote();
      },[])  
      




useEffect(() => {
        const getData = async () => {
          const result = await fetchData(text)
          setData(result.data)
          console.log(result);
        }
        getData();
      }, [text]);
    
    const getText = (text) => {
        setText(text);
        console.log(text);
    }


const Home = ({data})=> {
    
    return(
        <div>
            Hello home
            {data.map(item => (
            <CharacterImg key={item.char_id} item={item} />
            ))}
        </div>
    )
}

export default Home;



const fetchData = () => {
    return fetch("https://www.breakingbadapi.com/api/characters?name=Walter+White")
          .then((response) => response.json())
          .then((data) => setCharac(data));
  }

  useEffect(() => {
    fetchData();
  },[])

<div className="Widgets">
                    <div className="wgt1">
                        {charac && charac.length > 0 && charac.map((characObj, index) => (
                            <img key={characObj.char_id} src={characObj.img} alt="img"></img>
                            ))}
                    </div>

</div>

*/