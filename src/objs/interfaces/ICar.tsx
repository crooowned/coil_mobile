import { EnumNumberMember } from "@babel/types";
import { IDrive } from "./IDrive";

export interface ICar {
    id: number;
    vin: string;
    display_name: string;
    charge_state: {
        battery_heater_on: boolean;
        battery_level: number;
        battery_range: number;
        charge_amps: number;
        charge_limit_soc: number;
        charge_rate: number;
        charge_to_max_range: number;
        charger_actual_current: number;
        charger_power: number;
        charger_voltage: number;
        est_battery_range: number;
        minutes_to_full_charge: number;
        time_to_full_charge: number;
        usable_battery_level: number;
        timestamp: number;
    };
    vehicle_config: {
        car_type: string;
        efficiency_package: string;
    }

}