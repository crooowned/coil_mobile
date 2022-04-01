import { IDrive } from "./IDrive";

export interface ICar {
    id: number;
    vin: string;
    display_name: string;
    make: string;
    model: string;
    year: number;
    color: string;
    drives: IDrive[];
}