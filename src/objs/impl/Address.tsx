import IAdress from "../interfaces/IAdress";

export default class Address implements IAdress{
    "ISO3166-2-lvl4": string;
    city?: string;
    city_disctrict: string;
    country: string;
    country_code: string;
    house_number: number;
    neighbourhood: string;
    postcode: string;
    road: string;
    state: string;
    suburb: string;
    county?: string;
    shop?: string;
    amenity?: string;
    constructor(proto: IAdress){
        this["ISO3166-2-lvl4"] = proto["ISO3166-2-lvl4"];
        this.city = proto.city;
        this.city_disctrict = proto.city_disctrict;
        this.country = proto.country;
        this.country_code = proto.country_code;
        this.house_number = proto.house_number;
        this.neighbourhood = proto.neighbourhood;
        this.postcode = proto.postcode;
        this.road = proto.road;
        this.state = proto.state;
        this.suburb = proto.suburb;
        this.county = proto.county;
        this.shop = proto.shop;
        this.amenity = proto.amenity;
    }

    getDisplayName(): string {
        return  (this.amenity??this.shop??this.road??this.neighbourhood) + (this.house_number?" "+this.house_number:"");
    }
    
}