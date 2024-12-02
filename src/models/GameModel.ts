import {createEffect, createEvent, createStore, sample} from 'effector';
import {atom} from "utils/atom";
import {createCountdown} from "utils/createCountdown";
import {g, PER_SEC, v_o} from "config";
import {xByTime, yByTime} from "utils/getCoords";

enum GameStatus {
    PREPARED = 'prepared',
    STARTED = 'started',
    FINISHED = 'finished',
}

export const GameModel = atom(() => {
    const $score = createStore(0);
    const $time = createStore(0);
    const $x = createStore(0);
    const $y = createStore(0);
    const $gameStatus = createStore(GameStatus.PREPARED);

    const timeIncrement = createEvent();
    const jump = createEvent();
    const changeY = createEvent<number>();
    const startGame = createEvent();

    const startGameFx = createEffect((gameStatus: GameStatus) => {
        if (gameStatus === GameStatus.PREPARED) {
            setInterval(timeIncrement, 1000 / PER_SEC);
        }
        return GameStatus.STARTED;
    });

    const startCountdown = createEvent<number>()
    const abortCountdown = createEvent()

    const countdown = createCountdown({
        start: startCountdown,
        abort: abortCountdown,
        timeout: 1000 / PER_SEC
    })

    countdown.tick.watch((seconds: number) => changeY(yByTime($y.getState(), 3 - seconds)))

    $y.watch((y) => {
        if (y < 0) {
            abortCountdown();
            changeY(0);
        }
    })

    const jumpFx = createEffect(({time: initialTime}: { time: number }) => {
        startCountdown(3);
    })

    sample({
        clock: changeY,
        target: $y
    });

    sample({
        clock: startGameFx.doneData,
        target: $gameStatus
    });

    sample({
        clock: startGame,
        source: $gameStatus,
        target: startGameFx
    });

    sample({
        clock: timeIncrement,
        source: $time,
        fn: (time) => {
            return time + 1 / PER_SEC;
        },
        target: $time
    });

    sample({
        clock: $time,
        source: $x,
        fn: (x, time) => xByTime(x, time),
        target: $x,
    })

    sample(
        {
            clock: jump,
            source: {time: $time},
            target: jumpFx,
        }
    );

    return {$score, $time, $x, $y, timeIncrement, jump, startGame};
});