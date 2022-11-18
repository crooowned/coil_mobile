export default interface IAdress{
    "ISO3166-2-lvl4": string
    city?: string
    city_disctrict: string
    country: string
    country_code: string
    house_number: number
    neighbourhood: string
    postcode: string
    road: string
    state: string
    suburb: string
    county?: string
    shop?: string
    amenity?: string;

    getDisplayName():void;
}