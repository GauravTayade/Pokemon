import React, {useEffect, useState} from 'react';
import {Avatar, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {ElectricBoltRounded} from "@mui/icons-material";
import axios from 'axios';
import Ability from "./Ability";

const AbilitiesList =(props)=>{

    const [abilities,setAbilities] = useState();


    const getAbilityDesc = (props) =>{
        let ability;
        console.log(props)
        // axios.get(props.abilities[0].ability.url)
        //     .then(response=>{
        //         ability = response.data.effect_entries[1].effect
        //     })
        //
        // return ability;
    }

    return(
        <List sx={{ width: '100%', maxWidth: 660, bgcolor: 'background.paper' }}>
            {props.abilities.map(abilityData=>{
                return(
                        <Ability abilityData={abilityData}/>
                    )
            })}
        </List>
    )
}

export default AbilitiesList;