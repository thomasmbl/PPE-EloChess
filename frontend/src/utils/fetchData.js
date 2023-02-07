import axios from 'axios';

const fetchData = async (text) => {
    return await axios.get(`https://breakingbadapi.com/api/characters?name=${text}`)
}

export default fetchData;