import { GardenPlantIcon, HousePlantIcon, WildPlantIcon } from '../static/img'

export const AppName = "Toxigent";
export const AppData = {};

export const WikipediaAPI = {
    search: "https://en.wikipedia.org/w/api.php?origin=*&action=query&formatversion=2&generator=prefixsearch&gpslimit=3&prop=pageimages%7Cpageterms&piprop=thumbnail&pithumbsize=150&pilimit=3&redirects=&wbptterms=description&format=json&gpssearch=",
    page: "https://en.wikipedia.org/?curid="
}

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