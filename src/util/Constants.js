import { GardenPlantIcon, HousePlantIcon, WildPlantIcon } from '../static/img'

export const AppName = "Toxigent";
export const AppData = {};

export function getTypeIcon(name) {
    switch(name) {
        case "House Plant":
            return HousePlantIcon;
        case "Garden Plant":
            return GardenPlantIcon;
        case "Wild Plant":
            return WildPlantIcon;
        default:
            return null;
    }
}