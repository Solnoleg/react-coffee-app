import React, {Component} from 'react';
import {Box, Button, Grid, Paper, Slider} from "@mui/material";
import Switch from "@mui/material/Switch";
import CoffeeShop from "./components/CoffeeShop";
import axios from "axios";

class App extends Component {
    state = {
        isOpen: true,
        distance: 1500,
        count: 5,
        region: {
            geoLat: 0,
            geoLong: 0
        },
        coffeeSops: []
    }

    async componentDidMount() {
        const {region} = this.state;
        navigator.geolocation.getCurrentPosition(
            (position) => {
                region.geoLat = position.coords.latitude
                region.geoLong = position.coords.longitude
                this.setState({region});
            },
            (error) => alert(JSON.stringify("Нет доступа к геопозиции"))
        );
    }

    showShops = () => {
        try {
            axios.post(
                // 'http://localhost:8080/find',
                'https://coffee-service-find.herokuapp.com/find',
                {
                    "open": this.state.isOpen,
                    "latitude": this.state.region.geoLat,
                    "longitude": this.state.region.geoLong,
                    "distance": this.state.distance,
                    "count": this.state.count
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(response => {
                this.setState({
                    coffeeSops: response.data
                })
            });
        } catch (e) {
            console.log(e)
        }
    }

    isOpenHandler = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };

    distanceChangeHandler = (event, newValue) => {
        this.setState({
            distance: newValue
        })
    }

    cafeCountChangeHandler = (event, newValue) => {
        this.setState({
            count: newValue
        })
    }

    render() {
        const divStyle = {
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }

        let coffeeShops = this.state.coffeeSops.map((cs, index) => {
            return (
                <div className="row" key={cs.id}>
                    <div className="col-sm-4 mb-4" key={cs.id}>
                        <CoffeeShop
                            key={index}
                            name={cs.title}
                            route={cs.route}
                            distance={parseInt(cs.distance, 10) + 'm'}
                        />
                    </div>
                </div>
            );
        })

        return (
            <div style={divStyle}>
                <div>
                    <img src="https://doodleipsum.com/500x500/outline?i=bf8210036f741844a10667e3d181517a"
                         style={{maxWidth: 400, maxHeight: 400, margin: 3}}
                         alt="logo"/>
                </div>
                <div align="center" style={{marginTop: -50}}>
                    <Box sx={{
                        height: 250,
                        width: 400,
                        mx: 0.5,
                        display: 'inline-block',
                        margin: 3
                    }}>
                        <Grid container rowSpacing={4} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                            <Grid item xs={6}>
                                <Paper sx={{
                                    height: 35,
                                    padding: 1,
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    textAlign: 'center'
                                }}>Открытые сейчас</Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper sx={{
                                    height: 35,
                                    padding: 1,
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    textAlign: 'center'
                                }}>
                                    <Switch defaultChecked onChange={this.isOpenHandler}> </Switch>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper sx={{
                                    height: 35,
                                    padding: 1,
                                    alignItems: 'center',
                                    alignContent: 'center'
                                }}>Расстояние до кафе</Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper sx={{
                                    height: 35,
                                    padding: 1,
                                    alignItems: 'center',
                                    alignContent: 'center'
                                }}><Slider
                                    aria-label="Distance"
                                    onChange={this.distanceChangeHandler}
                                    defaultValue={1500}
                                    marks
                                    valueLabelDisplay="on"
                                    step={250} min={250} max={2500}
                                /></Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper sx={{
                                    height: 35,
                                    padding: 1,
                                    alignItems: 'center',
                                    alignContent: 'center'
                                }}>Сколько кафе показывать</Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper sx={{
                                    height: 35,
                                    padding: 1,
                                    alignItems: 'center',
                                    alignContent: 'center'
                                }}><Slider
                                    aria-label="count"
                                    onChange={this.cafeCountChangeHandler}
                                    defaultValue={5}
                                    marks
                                    valueLabelDisplay="on"
                                    step={1} min={1} max={10}
                                /></Paper>
                            </Grid>
                        </Grid>
                        <Button style={{width: 100, marginTop: 20}}
                                variant="contained"
                                onClick={this.showShops}>Найти</Button>

                        {coffeeShops}
                    </Box>
                </div>
            </div>
        );
    }
}

export default App;



