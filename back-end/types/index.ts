import { User } from "../model/user"

export type Duration = {
    hours : number,
    minutes: number,
    seconds: number
}

export type ListInput = {
    user?: User,
    title: string,
    description: string,
    albums: number[],
}
