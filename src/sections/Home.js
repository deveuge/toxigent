import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Paper } from '@material-ui/core';
import '../static/css/home.css';

import MaterialTable from "material-table";

import { getTypeIcon } from '../util/Functions';
import { ToxicIcon, DogIcon, CatIcon } from '../static/img'
import { AppData } from '../util/Constants';

class Home extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { data: [] };
    }

    componentDidMount() {
        this.originalData = AppData.plantData;
        this.setState({ data: AppData.plantData });
    }

    async handleChange(e) {
        let timeout = e.target.id === "name" ? 500 : 0;

        const delaySearch = setTimeout(() => {
            let value = e.target.value === "all"
                ? undefined
                : e.target.type === "checkbox"
                    ? e.target.checked
                    : e.target.value;
            this.setState(prevState => ({
                filter: { ...prevState.filter, [e.target.id]: value }
            }), this.filterData);
        }, timeout);

        return () => clearTimeout(delaySearch)
    }

    filterData() {
        let filteredData = this.originalData;
        let filter = this.state.filter;

        filteredData = filteredData.filter(data => {
            if (filter.name && filter.name.length) {
                if (!data.name.common.toLowerCase().includes(filter.name.toLowerCase())
                    && !data.name.scientific.toLowerCase().includes(filter.name.toLowerCase()))
                    return false;
            }

            if (filter.level && data.toxicity.level.toLowerCase() !== filter.level) {
                return false;
            }

            if (filter.type && data.type.toLowerCase() !== filter.type) {
                return false;
            }

            switch (filter.toxicity) {
                case "dogs":
                    if (!data.toxicity.dogs)
                        return false;
                    break;
                case "non-dogs":
                    if (data.toxicity.dogs)
                        return false;
                    break;
                case "cats":
                    if (!data.toxicity.cats)
                        return false;
                    break;
                case "non-cats":
                    if (data.toxicity.cats)
                        return false;
                    break;
                default:
                    // Do not filter by toxic to dogs/cats
                    break;
            }

            if (filter.detailed && data.detailedInfo === undefined) {
                return false;
            }

            return true;
        });

        this.setState({ data: filteredData });
    }

    render() {
        return (
            <div>
                <Header onChange={this.handleChange} />
                <Table data={this.state.data} history={this.props.history} />
            </div>
        );
    }
}

const Header = ({ onChange }) => {
    return (
        <header>
            <div>
                <h1>Discover if a plant is toxic for your pet</h1>
                <h2>Use the form below to narrow the search</h2>
                <Form onChange={onChange} />
            </div>
        </header>
    );
}

const Form = ({ onChange }) => {
    return (
        <form id="search-form" autoComplete="off" onChange={onChange}>
            <label htmlFor="name">Common or scientific name</label>
            <input id="name" placeholder="Common or scientific name" type="text" />
            <div>
                <label htmlFor="level">Toxicity level</label>
                <select id="level">
                    <option value="all">All levels</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                </select>
            </div>
            <div>
                <label htmlFor="type">Plant type</label>
                <select id="type">
                    <option value="all">All types</option>
                    <option value="house plant">House plant</option>
                    <option value="garden plant">Garden plant</option>
                    <option value="wild plant">Wild plant</option>
                </select>
            </div>
            <div>
                <label htmlFor="toxicity">Filter by</label>
                <select id="toxicity">
                    <option value="all">Show all</option>
                    <option value="dogs">Toxic to dogs</option>
                    <option value="non-dogs">Non-toxic to dogs</option>
                    <option value="cats">Toxic to cats</option>
                    <option value="non-cats">Non-toxic to cats</option>
                </select>
            </div>
            <label htmlFor="detailed" class="checkbox">
                <input type="checkbox" id="detailed" value="detailed" />
                <span>✔</span> 
                Only show plants that contain detailed information
            </label>
        </form>
    );
}


const Table = ({ data, history }) => {
    return (
        <div id="plant-table">
            <MaterialTable
                components={{
                    Container: props => <Paper {...props} elevation={0} />
                }}
                title="Plant catalog"
                data={data}
                columns={[
                    {
                        title: "", field: "icon", sorting: false,
                        render: rowData => <img src={rowData.icon} style={{ borderRadius: '50%' }} className="plant-img" alt="Plant icon" />
                    },
                    {
                        title: "Name", field: "name.common", cellStyle: { width: "100%", padding: '0.5rem' }, headerStyle: { width: "100%" },
                        render: rowData => <span>{rowData.name.common} <i>({rowData.name.scientific})</i></span>
                    },
                    { title: "Scientific name", field: "name.scientific", hidden: true, export: true },
                    {
                        title: "Plant type", field: "type",
                        render: rowData => <img src={getTypeIcon(rowData.type)} title={rowData.type} alt={rowData.type} />
                    },
                    {
                        title: "Toxicity level", field: "toxicity.level",
                        render: rowData => <img src={ToxicIcon} title={rowData.toxicity.level} alt={rowData.toxicity.level} className={rowData.toxicity.level.toLowerCase()} />
                    },
                    {
                        title: "Toxic to dogs", field: "toxicity.dogs",
                        render: rowData => <img src={DogIcon} title={rowData.toxicity.dogs ? "Yes" : "No"} alt={rowData.toxicity.dogs ? "Yes" : "No"} className={rowData.toxicity.dogs ? "active" : "disabled"} />
                    },
                    {
                        title: "Toxic to cats", field: "toxicity.cats",
                        render: rowData => <img src={CatIcon} title={rowData.toxicity.cats ? "Yes" : "No"} alt={rowData.toxicity.cats ? "Yes" : "No"} className={rowData.toxicity.cats ? "active" : "disabled"} />
                    },
                ]}
                options={{
                    exportButton: true,
                    search: false,
                    showTitle: false,
                    draggable: false,
                    paginationType: "stepped",
                    pageSize: 25,
                    exportFileName: "ToxigentPlantCatalog",
                    pageSizeOptions: [25, 50, 100],
                    actionsColumnIndex: -1,
                    exportAllData: true,
                    cellStyle: {
                        padding: '0.5rem',
                    },
                    headerStyle: {
                        padding: '0.75rem 0.5rem',
                        whiteSpace: 'nowrap'
                    }
                }}
                actions={[
                    {
                        icon: 'info',
                        tooltip: 'View details',
                        onClick: (event, rowData) => history.push({
                            pathname: '/p/' + rowData.name.common
                        })
                    }
                ]}
                localization={{
                    header: {
                        actions: ''
                    }
                }}
            />
        </div>
    );
}


export default withRouter(Home);