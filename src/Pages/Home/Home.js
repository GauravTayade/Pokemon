import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    Drawer,
    Grid,
    ListItem,
    List,
    ListItemAvatar, Avatar, ListItemText
} from "@mui/material";

import {ChildFriendly} from "@mui/icons-material";

//import libraries
import axios from "axios";

//import components here
import Header from "../AppBar/Header";
import PokemonCard from "../PokemonCard/PokemonCard";
import AbilitiesList from "../Abilities/AbilitiesList";

const axiosClient = axios.create({
    baseURL:'https://pokeapi.co/api/v2',
    timeout:1000,
})

const Home = (props)=> {

    //main data holder
    const [pageData,setPageData] =useState({count:0,next:null,prev:null})
    const [pokemonList,setPokemonList] = useState(null);
    const [objPokemon,setObjPokemon] = useState(null);
    const [isDrawer,setIsDrawer] = useState(false);
    const pokemonArray = [];

    const closeDrawer = () =>{
        setIsDrawer(false);
    }

    const getNextPokemons = async() =>{
        if(pageData.next !== null){
            await axios.get(pageData.next)
                .then(response=>{
                    setPageData({...pageData,
                        next:response.data.next? response.data.next : null,
                        prev:response.data.prev? response.data.prev : null,
                        count:response.data.count
                    })

                    Promise.all(
                        response.data.results.map(async(pokemon)=>{
                            console.log('main request',response.data.results[1]);
                            await axios.get(pokemon.url)
                                .then(response=>{
                                    pokemonArray.push({
                                        name:pokemon.name,
                                        url: response.data.species.url,
                                        image: response.data.sprites.other['official-artwork'].front_default
                                    })


                                })
                        })
                    ).then(()=>{
                        setPokemonList(pokemonArray)
                    })
                })
        }else{
            await axiosClient.get('/pokemon?limit=24&offset=0')
                .then(response=>{
                    setPageData({...pageData,
                        next:response.data.next? response.data.next : null,
                        prev:response.data.prev? response.data.prev : null,
                        count:response.data.count
                    })

                    Promise.all(
                        response.data.results.map(async(pokemon)=>{
                            await axios.get(pokemon.url)
                                .then(response=>{
                                    pokemonArray.push({
                                        name:pokemon.name,
                                        url: response.data.species.url,
                                        image: response.data.sprites.other['official-artwork'].front_default
                                    })


                                })
                        })
                    ).then(()=>{
                        setPokemonList(pokemonArray)
                    })
                })
        }
    }

    const getPokemonDetails =async(url) =>{
        await axios.get(url).then(async (response)=>{
            console.log(response.data);
           await setObjPokemon({
                name:response.data.name,
                shape:response.data.shape,
                color: response.data.color.name,
                habitat:response.data.habitat.name,
                basic_form: response.data.evolves_from_species? response.data.evolves_from_species.name:'',
                growth_rate: response.data.growth_rate.name,
                baby:response.data.is_baby ? 'Yes' : 'No',
                mythical: response.data.is_mythical ? 'Yes' : 'No',
                legendary: response.data.is_legendary ? 'Yes' : 'No'
            })

            setIsDrawer(true);
        })
    }

    useEffect(async()=>{
         await getNextPokemons();
    },[])

    return(
        <Container disableGutters={true} maxWidth="false">
            <Grid container>
                <Grid item xs={12}>
                    <Header/>
                    <Grid container sx={{
                        backgroundImage:'url("/images/web_main_bg.png")',
                        backgroundPosition:'center',
                        backgroundRepeat:'no-repeat',
                        backgroundSize:'cover',
                        minHeight:'100vh',
                        minWidth:'100vw'}}>

                    </Grid>
                    <Grid container sx={{display:'flex',flexWrap:"wrap",justifyContent:"space-around", alignItems:"center"}}>
                        {pokemonList?

                            pokemonList.map(pokemon=>{
                                return(
                                    <PokemonCard pokemon={pokemon} getPokemonDetails={getPokemonDetails}/>
                                )
                            })
                        :
                            'no Data'
                        }
                    </Grid>
                    <Grid container>
                        <Grid container sx={{display:'flex', justifyContent:'center',marginBottom:'2rem'}}>
                            <Button sx={{padding:'0.75rem 2rem',backgroundColor:'#064635', fontSize:'1rem'}} variant='contained' onClick={()=>getNextPokemons()}>Next</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Drawer anchor='bottom' open={isDrawer} onClose={closeDrawer}>
                {objPokemon ?
                    <Grid container sx={{display:"flex",justifyContent:"center"}}>
                        <Grid container >
                            <Grid item xs={4} sx={{display:"flex",justifyContent:"center"}}>
                                <Card sx={{justifyContent:'center', display:'flex',width:'100%',flexWrap:'wrap'}}>
                                    <CardContent>
                                        <h3>{objPokemon.name}</h3>
                                    </CardContent>
                                    <CardMedia
                                        component="img"
                                        sx={{width:'350px',}}
                                        src="https://i.pinimg.com/564x/e4/b1/78/e4b1789696e9c9353533ba4a7cb968bd.jpg"/>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <List sx={{width:'100%', bgColor:'background.paper'}}>
                                    <ListItem>
                                        <ListItemText primary="BABY" secondary={objPokemon.baby}></ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="BASIC FORM" secondary={objPokemon.basic_form}></ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="GROWTH RATE" secondary={objPokemon.growth_rate}></ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="COLOR" secondary={objPokemon.color}></ListItemText>
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={4}>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="HABITAT" secondary={objPokemon.habitat}></ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="SHAPE" secondary={objPokemon.shape.name}></ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="LEGENDARY" secondary={objPokemon.legendary}></ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="MYTHICAL" secondary={objPokemon.mythical}></ListItemText>
                                    </ListItem>
                                </List>
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