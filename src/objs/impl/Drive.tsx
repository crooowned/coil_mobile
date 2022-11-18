import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import DriveService from "../../services/DriveService";
import IAdress from "../interfaces/IAdress";
import { IDrive } from "../interfaces/IDrive";
import { IFrame } from "../interfaces/IFrame";
import Address from "./Address";

export default class Drive implements IDrive{
    id: string;
    complete: boolean;
    timestamp: Date;
    startDate?: FirebaseFirestoreTypes.Timestamp;
    endDate?: FirebaseFirestoreTypes.Timestamp;
    vehicle: number;
    vin: string;
    summary: { drivenKm: number; usedBatteryLevel: number; usedEstRange: number; usedRange: number; };
    startLocation: Address;
    endLocation?: Address | undefined;
    frames?: IFrame[] | undefined;

    constructor(id: string, proto: IDrive){
        this.id = id;
        this.complete = proto.complete;
        this.timestamp = proto.timestamp;
        this.vehicle = proto.vehicle;
        this.vin = proto.vin;
        this.summary = proto.summary;
        this.startLocation = new Address(proto.startLocation);
        this.startDate = proto.startDate;
        this.endDate = proto.endDate;
        if(proto.endLocation){
            this.endLocation = new Address(proto.endLocation);
        }
    }

    getIcon(): string {
        // random ionic icons
        let icons = [
            'ios-car',
            'barbell-outline'
        ];
        return icons[Math.floor(Math.random() * icons.length)];
    }

    getDurationString() : string{
        if(this.endDate && this.startDate){
            let seconds = Math.floor((this.endDate?.toMillis() - this.startDate?.toMillis()) / 1000);
            if(seconds > 60*60){
                return Number(seconds/60/60).toFixed(0) + "h";
            } else {
                return Number(seconds/60).toFixed(0) + "min";
            }
        }
        return "";
    }

    getStartTime() : string{
        if(this.startDate)
            return this.startDate?.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        else 
            return "?";
    }

    getEndTime() : string {
        if(this.endDate)
            return this.endDate?.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        else 
            return "?";
    }

    getAverageLiters() : string {
        let liters = new Number((this.summary?.drivenKm * 0.077)).toFixed(2);
        return liters;
    }

    getAverageCo2() : string {
        let co2 = this.summary?.drivenKm * 130;
        if(co2 > 1000)
            return (co2/1000).toFixed(2)+"kg";
        else
            return co2.toFixed(0) + "g";
    }


    
}