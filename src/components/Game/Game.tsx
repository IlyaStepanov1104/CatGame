import React, {FC} from 'react';
import {useUnit} from 'effector-react';
import {GameModel} from 'models/GameModel';
import {Cat} from "../Cat/Cat";

const Game: FC = () => {
    const score = useUnit(GameModel.$score);
    const time = useUnit(GameModel.$time);

    const startGame = useUnit(GameModel.startGame);

    return (
        <div>
            <h2>Game Component</h2>
            <p>Current Score: {score}</p>
            <p>Current Time: {time}</p>
            <button onClick={startGame}>Start Game</button>
            <Cat/>
        </div>
    );
};

export default Game;
