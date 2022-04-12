import React from 'react';
import {List} from "@mui/material";
import Ability from "./Ability";

const AbilitiesList =(props)=>{

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