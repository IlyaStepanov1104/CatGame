import {FC, useEffect} from "react";
import {useUnit} from "effector-react";
import {GameModel} from "models/GameModel";

import styles from './Cat.module.css';
import {BARRIER_COUNT, BARRIER_DISTANCE, BARRIER_OFFSET, BARRIER_WIDTH} from "config";


const getBarrierLeft = (n: number, x: number): number => {
    const cycle = Math.max(0, Math.floor((x - BARRIER_OFFSET - BARRIER_WIDTH) / (BARRIER_DISTANCE * BARRIER_COUNT)));
    const prev_x = (n + cycle * BARRIER_COUNT) * BARRIER_DISTANCE + BARRIER_OFFSET + BARRIER_WIDTH;
    if (prev_x >= x) {

        return prev_x - BARRIER_WIDTH;
    }

    return (n + (cycle + 1) * BARRIER_COUNT) * BARRIER_DISTANCE + BARRIER_OFFSET;
}

export const Cat: FC = () => {
    const jump = useUnit(GameModel.jump);

    const {$x: x, $y: y} = useUnit(GameModel);

    useEffect(() => {
        window.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                jump();
            }
        });
    }, []);

    return (<div className={styles['gameContainer']} style={{backgroundPositionX: -x, border: '1px solid black'}}>
        <div className={styles["gameScene"]}>
            <div style={{bottom: `${y}px`}} className={styles['cat']}></div>

            <div className={styles['barrier']} style={{left: getBarrierLeft(0, x) - x}}></div>
            <div className={styles['barrier']} style={{left: getBarrierLeft(1, x) - x}}></div>
            <div className={styles['barrier']} style={{left: getBarrierLeft(2, x) - x}}></div>
            <div className={styles['barrier']} style={{left: getBarrierLeft(3, x) - x}}></div>
        </div>
    </div>);
}