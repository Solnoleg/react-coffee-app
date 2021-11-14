import React, {Component} from "react";
import classes from "./Layout.module.css";
import {Button} from "@mui/material";

class Layout extends Component {
    state = {
        region: {
            geoLat: 0,
            geoLong: 0
        }
    }

    componentDidMount() {
        const { region } = this.state;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                region.geoLat = position.coords.latitude
                region.geoLong = position.coords.longitude
                this.setState({region});
            },
            (error) => alert(JSON.stringify(error))
        );
    }

    showCoordinates = () => {
        console.log('Lat is: ' + this.state.region.geoLat)
        console.log('Long is: ' + this.state.region.geoLong)
    }

    render() {
        return (
            <div>
                <main>
                    <div className={classes.Layout}>
                        <header>
                            <img src="https://doodleipsum.com/700/outline?i=bf8210036f741844a10667e3d181517a"
                                 alt="logo"/>
                        </header>
                    </div>
                    <div>
                        <Button variant="contained" onClick={this.showCoordinates}>Мои координаты</Button>
                    </div>
                    <p>Coordinates is: {this.state.region.geoLong}</p>
                    <p>Coordinates is: {this.state.region.geoLong}</p>
                </main>
            </div>
        )
    }
}

export default Layout
