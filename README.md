# Toxigent
![Toxigent Banner](preview.jpg)
_React App  - Catalog of poisonous plants to pets_

**Toxigent** is a React application built to display the data collected by my web scraper, [**Poisonous Plants Scraper**](https://github.com/deveuge/poisonous-plants-scraper), that collects information about poisonous plants to pets.

The data is saved as a JSON file in the app itself to avoid building a backend that serves it. The app loads it at start once and then uses it to display it to the user.

## Features
* Homepage that lists all poisonous plants to dogs and cats and lets you filter and/or order them by:
    * Common or scientific name.
    * Toxicity level: all, moderate or severe.
    * Plant type: all, house plant, garden plant or wild plant.
    * Toxicity: all, toxic to dogs, non-toxic to dogs, toxic to cats, non-toxic to cats.
    * Show only plants that contain detailed info: if this option is marked, only plants that contain data in "detailedInfo" will be displayed.
* Use of [**material-table**](https://material-table.com/) to display all plants in a table that offers the following functionality:
    * Ordering by table headers.
    * Custom action that allow the user to navigate to the detail of each plant.
    * Export option to download the data in CSV or PDF format.
* Possibility to switch to night mode, that swaps the light palette to one darker.
* Possibility to navigate to the detail of a random plant. This option is located at the bottom of the webpage.
* Detail page of each plant displaying the following information:
    * Image of the plant, obtained from the detailed info. If there isn't one specified, a placeholder image will be shown.
    * Icon of the plant.
    * List of common symptoms.
    * Type and toxicity of the plant.
    * Table with detailed info of the plant. If the plant doesn't have detailed info, the message _"No details available"_ will be displayed.
    * List of Wikipedia results related to the scientific name of the plant, limiting the results to a maximum of 3. If no results were found, the message _"No Wikipedia results available"_ will be displayed.