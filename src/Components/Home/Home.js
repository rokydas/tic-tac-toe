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
        checkMatePartition(0, 1, 2);
        checkMatePartition(3, 4, 5);
        checkMatePartition(6, 7, 8);
        checkMatePartition(0, 3, 6);
        checkMatePartition(1, 4, 7);
        checkMatePartition(2, 5, 8);
        checkMatePartition(0, 4, 8);
        checkMatePartition(2, 4, 6);
    }

    const checkMatePartition = (a, b, c) => {
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
    }

    console.log(playData);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 border">
                    <img className="img-fluid" src={player} alt="" />
                    <h1 className={`p-5 ${isPlayerOne ? 'active' : 'inactive'}`}>
                        Player 1 (Circle)
                    </h1>
                    {isPlayerOne && <h3>Now your turn</h3>}
                </div>
                <div className="col-md-6">
                    <h1 className="mb-5 mt-2">Tic Tac Toe</h1>
                    <div className="d-flex justify-content-center">
                        <div className="w-50">
                            <div className="row">
                                {
                                    playData.map(d => <Playground d={d} getOption={getOption} key={d.position} />)
                                }
                            </div>
                            {isFinished && <h1 className="text-success m-5">Player {wonPlayer} won the match</h1>}
                        </div>
                    </div>
                </div>
                <div className="col-md-3 border">
                    <img className="img-fluid" src={player} alt="" />
                    <h1 className={`p-5 ${!isPlayerOne ? 'active' : 'inactive'}`}>
                        Player 2 (Cross)
                    </h1>
                    {!isPlayerOne && <h3>Now your turn</h3>}
                </div>
            </div>
        </div>
    );
};

export default Home;