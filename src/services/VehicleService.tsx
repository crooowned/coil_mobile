import { ICar } from "../objs/interfaces/ICar";
import { IDrive } from "../objs/interfaces/IDrive";
import {firebase} from '@react-native-firebase/database';
import auth from "@react-native-firebase/auth";
import { environment } from "../globals/environment";
import AsyncStorage from '@react-native-async-storage/async-storage';

export class VehicleService{
    static getVehicles(callback: (cars: any)=>void){
        firebase.app().database(environment.firebase.realtime_database.url)
            .ref('users/' + auth().currentUser?.uid + "/vehicles") // no trailing "/"! (even though it does get trimmed off internally)
            .on(
                'value',
                snapshot => {
                    let cars: ICar[] = [];
                    snapshot.forEach(snap=>{
                        cars.push(snap.val());
                        return true;
                    });
                    callback(cars);
                },
                error => {
                    console.error('Failed to retrieve users/vehicles ' + error);
                }
            );
        console.debug("VehicleService.getVehicles()");
    }

    static getVehicleById(vid: string, callback : (car: ICar)=>void){
        firebase.app().database(environment.firebase.realtime_database.url)
        .ref('users/' + auth().currentUser?.uid + "/vehicles/" + vid).on(
            'value',
            snapshot => {
                if(snapshot.exists())
                    callback(snapshot.val() as ICar);
            },
            error => {
                console.error('Failed to retrieve users/vehicles/id: ' + error);
            }
        )
        console.debug("VehicleService.getVehicleById()");
    }

    static async getSelectedVehicleId() : Promise<string|null>{   
        return await AsyncStorage.getItem("selectedVehicle");
    }

    static async setSelectVehicleId(vid: string){
        await AsyncStorage.setItem("selectedVehicle", vid);
    }
}