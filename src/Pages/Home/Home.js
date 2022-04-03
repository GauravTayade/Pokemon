import React, {useEffect, useState} from "react";
import {Card, CardContent, Container, Drawer, Grid, Typography,List,ListItem,ListItemAvatar,Avatar} from "@mui/material";
import {ElectricBoltRounded} from "@mui/icons-material";

//import libraries
import axios from "axios";

//import components here
import Header from "../AppBar/Header";
import PokemonCard from "../PokemonCard/PokemonCard";

const axiosClient = axios.create({
    baseURL:'https://pokeapi.co/api/v2',
    timeout:1000,
})

const Home = (props)=>{

    const [pokemons,setPokemons] = useState(null);
    const [pokemon,setPokemon] = useState(null);
    const [isDrawer,setIsDrawer] = useState(false);

    useEffect(()=>{
        axiosClient.get('/pokemon?offset=24&limit=24').then(response=>{
            setPokemons(response.data.results)
        })
    },[])

    const getPokemonDetails=(pokemonUrl)=>{
        axios.get(pokemonUrl).then((response)=>{
            setPokemon(response.data);
        })
    }

    const pokemonDetails = (pokemonUrl) =>{
        getPokemonDetails(pokemonUrl);
        setIsDrawer(true);
    }

    const closeDrawer = () =>{
        setIsDrawer(false);
    }

    return(
        <Container disableGutters={true} maxWidth="false">
            <Grid container>
                <Grid item xs={12}>
                    <Header/>
                    <Grid container>
                        {pokemons?
                            pokemons.map((pokemon,index)=>{
                                return(
                                    <PokemonCard key={index} getPokemonDetails={pokemonDetails} pokemon={pokemon}/>
                                )
                            })
                            :
                            ''}
                    </Grid>
                </Grid>
            </Grid>
            <Drawer anchor='bottom' open={isDrawer} onClose={closeDrawer}>
                {pokemon ?
                    <Grid container>
                        <Grid container>
                            <Grid item xs={4}>
                                <Typography variant="h4" color="grey" sx={{display:'flex',justifyContent:'center'}}>
                                    {pokemon.name.toUpperCase()}
                                </Typography>
                                <Card sx={{
                                    width: 350,
                                    height:350,
                                    margin:'2rem',
                                    background:`url("${pokemon.sprites.other["official-artwork"].front_default}")`,
                                    backgroundPosition: 'top center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain',
                                    boxShadow:3}}>
                                    <CardContent sx={{
                                        height:160,
                                        width:250,
                                        textAlign: 'center',
                                        display:'table-cell',
                                        verticalAlign:'middle',
                                    }}>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <List>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <ElectricBoltRounded/>
                                            </Avatar>
                                        </ListItemAvatar>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <ElectricBoltRounded/>
                                            </Avatar>
                                        </ListItemAvatar>
                                    </ListItem>
                                    <ListItem></ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={4}>

                            </Grid>
                        </Grid>
                    </Grid>

                    :
                    ''
                }
            </Drawer>
        </Container>
    )   
}

export default Home;