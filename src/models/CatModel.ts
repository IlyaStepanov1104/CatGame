import {atom} from "../utils/atom";
import {useState} from "react";
import {createStore} from "effector";

export enum CatState {
    STAY = 'stay',
    RUN = 'run',
    PRE_JUMP = 'pre_jump',
    JUMP = 'jump',
    FALL = 'fall',
    DIE = 'die'
}

const initial = {
    state: CatState.STAY,
    lives: 3,
}

export const CatModel = atom(() => {
    const $state = createStore<CatState>(initial.state);
    const $lives = createStore<number>(initial.lives)

    return {$state, $lives};
});