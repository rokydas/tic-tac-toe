import React, { useState } from 'react';
import player from '../../images/player.png';
import data from '../Data/Data';
import Playground from '../Playground/Playground';
import './Home.css';

const Home = () => {

    const [isPlayerOne, setIsPlayerOne] = useState(true);
    const [playData, setPlayData] = useState(data);
    const [isFinished, setIsFinished] = useState(false);
    const [wonPlayer, setWonPlayer] = useState(0);
    const [counter, setCounter] = useState(0);

    const checkMate = () => {
        checkMatePosition(0, 1, 2);
        checkMatePosition(3, 4, 5);
        checkMatePosition(6, 7, 8);
        checkMatePosition(0, 3, 6);
        checkMatePosition(1, 4, 7);
        checkMatePosition(2, 5, 8);
        checkMatePosition(0, 4, 8);
        checkMatePosition(2, 4, 6);
    }

    const checkMatePosition = (a, b, c) => {
        if (playData[a].value != 'not-given') {
            if (playData[a].value == playData[b].value && playData[b].value == playData[c].value) {
                setWonPlayer(isPlayerOne ? 1 : 2);
                setIsFinished(true);
            }
        }
    }

    const getOption = (position) => {
        if (counter != 9 && !isFinished) {
            const newPlayData = playData;
            newPlayData[position - 1].value = isPlayerOne ? 'circle' : 'cross';
            setPlayData(newPlayData);
            setIsPlayerOne(!isPlayerOne);
            setCounter(counter + 1);
            checkMate();
        }
        console.log(counter)
        if (counter + 1 == 9) {
            setIsFinished(true)
        }
    }

    return (
        <div className="full-page" >
            <h1 className="p-3">Tic Tac Toe</h1>
            <div className="d-flex justify-content-center mb-3">
                <div className="playground-header">
                    <div className="row">
                        {
                            playData.map(d => <Playground d={d} getOption={getOption} key={d.position} />)
                        }
                    </div>
                </div>
            </div>
            {(isFinished && wonPlayer != 0) && <h5 className="text-success">Player {wonPlayer} won the match</h5>}
            {(isFinished && wonPlayer == 0) && <h5 className="text-success">Match Drawn</h5>}
            <div className="d-flex justify-content-center mt-3">
                <div style={{ maxWidth: "150px" }} >
                    <img className="img-fluid" src={player} alt="" />
                    <h3 className={`${isPlayerOne ? 'active' : 'inactive'}`}>Player 1 (Circle)</h3>
                    {isPlayerOne && <h5>Now your turn</h5>}
                </div>
                <div style={{ width: "50px" }}></div>
                <div style={{ maxWidth: "150px" }} >
                    <img className="img-fluid" src={player} alt="" />
                    <h3 className={`${!isPlayerOne ? 'active' : 'inactive'}`}>Player 2 (Cross)</h3>
                    {!isPlayerOne && <h5>Now your turn</h5>}
                </div>
            </div>
        </div>
    );
};

export default Home;