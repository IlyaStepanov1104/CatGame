import {createEffect, createEvent, createStore, EventCallable, sample} from "effector";

const wait = (ms: number): Promise<void> => new Promise(resolve => {
    setTimeout(resolve, ms)
});

interface ICreateCountdownProps {
    start: EventCallable<number>;
    abort: EventCallable<void>;
    timeout: number;
}

export function createCountdown(
    {
        start,
        abort,
        timeout
    }: ICreateCountdownProps
) {
    const $working = createStore<boolean>(true)
    const tick = createEvent<number>()
    const timer = createEffect<number, void>().use(() => wait(timeout))

    $working.on(abort, () => false)
    $working.on(start, () => true)

    sample({
        source: start,
        filter: timer.pending.map(is => !is),
        target: tick,
    })

    sample({
        clock: tick,
        target: timer,
    })

    const willTick = sample({
        source: timer.done.map(({params}) => {
            return params - timeout / 1000;
        }),
        filter: seconds => seconds >= 0,
    })

    sample({
        source: willTick,
        filter: $working,
        target: tick,
    })

    return {tick}
}