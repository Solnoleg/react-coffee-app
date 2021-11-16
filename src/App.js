import React, {Component} from 'react';
import {Box, Button, Grid, Paper, Slider} from "@mui/material";
import Switch from "@mui/material/Switch";
import * as PropTypes from "prop-types";

function Item(props) {
    return null;
}

Item.propTypes = {children: PropTypes.node};

class App extends Component {
    state = {
        isOpen: true,
        distance: 1500,
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

    render() {
        const divStyle = {
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }

        // const Item = styled(Paper)(({theme}) => ({
        //     ...theme.typography.body2,
        //     padding: theme.spacing(1),
        //     textAlign: 'center',
        //     color: theme.palette.text.secondary,
        // }));

        return (
            <div style={divStyle}>
                <div>
                    <img src="https://doodleipsum.com/500x500/outline?i=bf8210036f741844a10667e3d181517a"

                         alt="logo"/>
                </div>
                <div align="center">
                    <Box sx={{
                        height: 150,
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
                        </Grid>
                    </Box>
                </div>
                <div style={{marginTop: `20px`}}>
                    <Button variant="contained" onClick={this.showCoordinates}>Найти</Button>
                </div>
            </div>
        );
    }
}

export default App;



