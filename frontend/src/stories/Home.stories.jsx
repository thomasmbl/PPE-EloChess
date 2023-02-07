import '../Pages/Home.css'
import Dead from '../images/dead.gif';
import '../Pages/Gif.css';
import Lgraph from '../images/Lgraph.png'

export default {
    title:'UI/W1',
    component: 'W1',
}

export const W1 = (args) => {
    return <div className="Card1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla maiores quae nemo corporis, deserunt suscipit voluptas ullam repellendus explicabo cum cumque quia sint magnam odio, sed iure sunt aliquid?
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quos consequatur eaque praesentium veniam tempore? Possimus quam voluptatum voluptates exercitationem et dolorum iste molestias quae! Velit ipsa exercitationem excepturi atque. 
                <img src={'https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg'} className="cardimg" alt="img"></img>
            </div>
}

export const W2 = (args) => {
    return <div className="Card2" style={{height:'122px'}}>
                <h1>Character Infos</h1>
                <li>Name = Walter White</li>
                <li>Birthday = 09-07-1958</li>
                <li>Occupation = High School Chemistry Teacher </li>
            </div>
}

export const W3 = (args) => {
    return <div className="Card3">
                <p style={{marginLeft:'32px'}}>Heisenberg</p>
            </div>
}

export const W4 = (args) => {
    return <div className="Card4">
                <h1 className="txt2">Presumed Dead</h1>
                <img src={Dead} className="img2"></img>
            </div>
}

export const W5 = (args) => {
    return <div className="Card5" style={{marginLeft:'25px'}}>
                <h3>Random quote</h3>
                <p className="p1">"I am not in danger, Skyler. I am the danger!"</p>
                <p className="p2">- Walter White -</p>
            </div>
}

export const W6 = (args) => {
    return <div className="Card6" style={{height:'450px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla maiores quae nemo corporis, deserunt suscipit voluptas ullam repellendus explicabo cum cumque quia sint magnam odio, sed iure sunt aliquid?
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quos consequatur eaque praesentium veniam tempore? Possimus quam voluptatum voluptates exercitationem et dolorum iste molestias quae! Velit ipsa exercitationem excepturi atque. 
                <img src={Lgraph} className="cardimg" alt="img"></img>
            </div>
}
