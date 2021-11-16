import React, {Component} from 'react';
import {Box, Button, Grid, Paper, Slider} from "@mui/material";
import Switch from "@mui/material/Switch";

class App extends Component {
    state = {
        isOpen: true,
        distance: 1500,
        count: 5,
        region: {
            geoLat: 0,
            geoLong: 0
        }
    }

    componentDidMount() {
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

    showCoordinates = () => {
        console.log('Send request with params:')
        console.log('Only open ' + this.state.isOpen)
        console.log('Region is ' + this.state.region.geoLat + " " + this.state.region.geoLong)
        console.log('Distance is ' + this.state.distance)
        console.log('Count is ' + this.state.count)
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

        return (
            <div style={divStyle}>
                <div>
                    <img src="https://doodleipsum.com/500x500/outline?i=bf8210036f741844a10667e3d181517a"
                         style={{width: 400, height: 400}}
                         alt="logo"/>
                </div>
                <div align="center" style={{marginTop: -50}}>
                    <Box sx={{
                        height: 250,
                        width: 400,
                        mx: 0.5,
                        display: 'inline-block'
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
                                onClick={this.showCoordinates}>Найти</Button>
                    </Box>
                </div>
            </div>
        );
    }
}

export default App;



