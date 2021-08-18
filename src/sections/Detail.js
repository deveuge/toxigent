import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import '../static/css/details.css';

import { 
    getTypeIcon, 
    WikipediaAPI
} from '../util/Constants';
import { ToxicIcon, DogIcon, CatIcon, Placeholder } from '../static/img'

import { AppData } from '../util/Constants';

class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plant: undefined
        };
    }

    componentDidMount() {
        this.getPlantInfo(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        this.getPlantInfo(nextProps.match.params.id);
    }

    getPlantInfo(id) {
        let plant = AppData.plantData.filter((obj) => obj.name.common === id)[0];
        this.setState({ plant: plant });

        axios.get(WikipediaAPI.search + plant.name.scientific).then(res => {
            this.setState({ wikipediaResults: res.data.query.pages });
        });
    }

    render() {
        if (this.state.plant !== undefined) {
            return (
                <div>
                    <Header name={this.state.plant.name} />
                    <Body plant={this.state.plant} wikipediaResults={this.state.wikipediaResults} />
                </div>
            );
        } else {
            return (<div></div>);
        }
    }
}

const Header = ({ name }) => {
    return (
        <header id="detail-header">
            <div>
                <h1>{name.common}</h1>
                <h2>{name.scientific}</h2>
            </div>
        </header>
    );
}

const Body = ({ plant, wikipediaResults }) => {

    function getPlantImage() {
        try {
            return plant.detailedInfo.image;
        } catch (err) { }
        return Placeholder;
    }

    return (
        <main>
            <div className="card">
                <div id="info-container">
                    <div id="image-container">
                        <img src={getPlantImage(plant)} alt={plant.name.common} />
                        <img src={plant.icon} alt={plant.name.common + " icon"} />
                    </div>

                    <div>
                        <h2>Common symptoms</h2>
                        <ul>
                            {plant.symptoms.map((symptom, index) => (<li key={index}>{symptom}</li>))}
                        </ul>
                    </div>
                </div>

                <div id="card-details">
                    <div>
                        <img src={getTypeIcon(plant.type)} title="Plant type" alt="Plant type" />
                        <span>{plant.type}</span>
                    </div>
                    <div>
                        <img src={ToxicIcon} title="Toxicity" alt="Toxicity" />
                        <span>{plant.toxicity.level}</span>
                    </div>
                    <div>
                        <img src={DogIcon} title={plant.toxicity.dogs ? "Toxic to dogs" : "Non-toxic to dogs"} alt={plant.toxicity.dogs ? "Toxic to dogs" : "Non-toxic to dogs"} />
                        <span>{plant.toxicity.dogs ? "Toxic to dogs" : "Non-toxic to dogs"}</span>
                    </div>
                    <div>
                        <img src={CatIcon} title={plant.toxicity.cats ? "Toxic to cats" : "Non-toxic to cats"} alt={plant.toxicity.cats ? "Toxic to cats" : "Non-toxic to cats"} />
                        <span>{plant.toxicity.cats ? "Toxic to cats" : "Non-toxic to cats"}</span>
                    </div>
                </div>
            </div>

            <DetailsTable detailedInfo={plant.detailedInfo} />

            <WikipediaResults info={wikipediaResults} />
        </main>
    );
}

const DetailsTable = ({ detailedInfo }) => {

    function orderObjectProperties(arr) {
        return Object.keys(arr).sort().reduce(
            (obj, key) => { obj[key] = arr[key]; return obj; }, {}
        );
    }

    if (detailedInfo !== undefined) {
        return (
            <div className="card">
                <h2>Details</h2>
                <table id="details-table">
                    <thead>
                        <th>Attribute</th>
                        <th>Value</th>
                    </thead>
                    <tbody>
                        {Object.keys(orderObjectProperties(detailedInfo)).map((key, index) => {
                            if (key.toLowerCase() !== "image") {
                                return (
                                    <tr key={key}>
                                        <td key={1}>{key.split(/(?=[A-Z])/).join(" ").toLowerCase()}</td>
                                        <td key={2}>{detailedInfo[key]}</td>
                                    </tr>
                                )
                            }
                        }
                        )}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return (
            <div className="card" id="no-details">
                <em>No details available</em>
            </div>);
    }
}

const WikipediaResults = ({ info }) => {

    if (info !== undefined) {
        return (
            <div className="card">
                <h2>Wikipedia results</h2>
                {info.map((item, i) => (
                    <a href={WikipediaAPI.page + item.pageid} class="wiki-result" target="_blank" without rel="noreferrer">
                        <figure key={i}>
                            <img src={item.thumbnail.source} alt="Wikipedia result icon"/>
                            <figcaption>
                                <b>{item.title}</b>
                                <p>{item.terms.description}</p>
                            </figcaption>
                        </figure>
                    </a>
                ))}
            </div>
            
        );
    } else {
        return (
            <div className="card" id="no-details">
                <em>No Wikipedia results available</em>
            </div>);
    }
}


export default withRouter(Detail);