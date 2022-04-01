import { ICar } from "../objs/interfaces/ICar";
import { IDrive } from "../objs/interfaces/IDrive";

export class CarService{
    static async getDrives(carId: number) : Promise<IDrive[]>{
        return [
            {id: 0, distance: 12, duration: 15, end_time: "", start_time: "", positions: []},
            {id: 1, distance: 20, duration: 20, end_time: "", start_time: "", positions: []}
        ];
    }

    static async getCars() : Promise<ICar[]>{
        return [
            {id: 0, color: "#0000FF", display_name: "Tessi", drives: [], make: "Tesla", model: "Model 3 LR", vin: "ABCDEFG", year: 2021},
            {id : 1, color: "#FF0000", display_name: "Yessi", drives: [], make: "Tesla", model: "Model Y LR", vin: "HIJKLMN", year: 2022}
        ];
    }

    
}