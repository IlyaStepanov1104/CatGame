import {g, v_o} from "../config";

export const xByTime = (x: number, t: number): number => {
    return v_o.x * t
}


export const yByTime = (y: number, t: number): number => {
    return v_o.y * t - g * t * t / 2
}