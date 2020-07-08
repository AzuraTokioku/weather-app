import React, { Component } from 'react';
import axios from 'axios';
import bulma from 'bulma';
import "./WeatherSystem.css";

import Period from "./Period";

class WeatherSystem extends Component {
    state = {
        periods: [],
        town: 'Lens'
        }
    
    componentDidMount() {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.town}&lang=fr&units=metric&appid=a5cdb36a596105dc54180e6c71b01706`)
        .then(res => {
            this.setState({
                periods: res.data.list
            })
        })
    }

    handleChangeTown = (e) => {
        this.setState({
        town:  e.target.value
        })
    
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.changeTown(this.state.town);
    }
    render() { 
        let periodsList = this.state.periods.map(period => {
            return <Period period={period} />
        })

        return ( 
            <div className="weathersystem">
                <h1>Météo de {this.state.town}</h1>
                            <div className="field has-addons">
                                <div className="control">
                                    <input onChange={this.handleChangeTown} className="input" type="text" value={this.state.town} placeholder="Entre ton bled (Mets Lens stp)"/>
                                </div>
                            <div className="control">
                        <button onSumbit={this.handleSubmit} className="button is-info">
                        Envoyer
                        </button>
                    </div>
                </div>
                {periodsList}
                
            </div>
         );
    }
}
 
export default WeatherSystem;