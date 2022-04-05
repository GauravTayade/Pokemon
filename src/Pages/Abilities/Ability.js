import React, {useEffect, useState} from 'react';
import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {ElectricBoltRounded} from "@mui/icons-material";
import axios from "axios";


const Ability =(props)=>{

    const ability = props.abilityData;
    const [abilityInfo,setAbilityInfo] = useState(null);

   useEffect(()=>{
       axios.get(ability.ability.url).then(response=>{
           setAbilityInfo(response.data.effect_entries[1].effect);
       })
   },[])

    return(
        <ListItem key={ability.ability.name}>
            <ListItemAvatar>
                <Avatar>
                    <ElectricBoltRounded/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={ability.ability.name}
                          secondary={abilityInfo}/>
        </ListItem>
    )
}

export default Ability;