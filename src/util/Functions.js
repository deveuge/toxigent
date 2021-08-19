import { GardenPlantIcon, HousePlantIcon, WildPlantIcon } from '../static/img'

export function setTheme(checked) {
    let theme = checked ? 'light' : 'dark';
    localStorage.setItem('toxigent-theme', theme);
    document.documentElement.className = theme;
}

export function saveTheme() {
    setTheme(isLightTheme())
}

export function isLightTheme() {
    return localStorage.getItem('toxigent-theme') === 'light';
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