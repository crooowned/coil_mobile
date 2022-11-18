import IAdress from "./IAdress";
import { IFrame } from "./IFrame";
import firestore, { firebase, FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface IDrive{
    id: string
    complete: boolean
    timestamp: Date
    startDate?: FirebaseFirestoreTypes.Timestamp
    endDate?: FirebaseFirestoreTypes.Timestamp
    vehicle: number
    vin: string
    summary: {
        drivenKm: number
        usedBatteryLevel: number
        usedEstRange: number
        usedRange: number
    }
    startLocation: IAdress
    endLocation?: IAdress | undefined
    frames?: IFrame[] | undefined

    getIcon(): string 
    getDurationString():string
    getStartTime(): string;
    getEndTime() : string;
    getAverageLiters() : string;
    getAverageCo2() : string;

}