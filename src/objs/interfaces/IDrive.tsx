import { IPosition } from "./IPosition";

export interface IDrive{
    id: number;
    start_address: IPosition;
    start_time: string;
    end_time: string;
    end_address: IPosition;
    distance: number;
    duration: number;
    
    positions: IPosition[];
}