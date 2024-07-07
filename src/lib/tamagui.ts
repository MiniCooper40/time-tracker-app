import {createTamagui} from "tamagui";

export const config = createTamagui({})

export type Conf = typeof config

declare module 'tamagui' {
    interface Conf {}
}