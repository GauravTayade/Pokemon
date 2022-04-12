import React, {useEffect, useState} from 'react';
import {Card, CardContent, Typography, CardMedia} from "@mui/material";
import {motion} from 'framer-motion';

const PokemonCard = (props) =>{

    const pokemon = props.pokemon;
    const getPokemonDetails = props.getPokemonDetails;

    return(
        <motion.div whileTap={{ scale: 0.8 }}>
        <Card sx={{
            minWidth: 150,
            minHeight:150,
            maxHeight:320,
            maxWidth:300,
            cursor:'help',
            backgroundColor:'#faf9f6',
            margin:'1.5rem',
            boxShadow:3}}
            onClick={()=>getPokemonDetails(pokemon.url)}
        >
            <CardMedia
                component='img'
                sx={{
                    minHeight:125,
                    maxHeight:250,
                    minWidth:125,
                    maxWidth:275,marginX:'auto'}}
                image={pokemon.image}
                alt='pokemon image'/>
            <CardContent sx={{
                minWidth:150,
                maxWidth:300,
                marginBottom:'0.5rem'
            }}>
                <Typography variant="h4" color="grey"
                            sx={{   display:'flex',
                                    width:'100%',
                                    justifyContent:'center'}}>
                    {pokemon.name.toUpperCase()}
                </Typography>
            </CardContent>
        </Card>
        </motion.div>
    )

}

export default PokemonCard;