import React, {useEffect, useState} from 'react';
import {Button, Card, CardContent, Typography, CardActions} from "@mui/material";

const PokemonCard = (props) =>{
    return(
        <Card sx={{
            width: 250,
            height:250,
            margin:'2rem',
            background:'url("https://i.pinimg.com/564x/b5/21/54/b5215484083edfae0d98a27689f5adc2.jpg")',
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
                <Typography variant="h4" color="grey">
                    {props.pokemon.name.toUpperCase()}
                </Typography>
            </CardContent>
            <CardActions sx={{justifyContent:'flex-end'}}>
                <Button color='success' variant='outlined' onClick={()=>props.getPokemonDetails(props.pokemon.url)}>Details</Button>
            </CardActions>
        </Card>
    )
}

export default PokemonCard;