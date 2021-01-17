import React from 'react';
import { Typography } from "@material-ui/core";

export function Attribute(props) {
    return (
        <div 
            className="AttributeTile"
        >
            <span className="BigIcon">
                {props.icon}
                <Typography variant="h5" paragraph>
                    {props.title}
                </Typography>
            </span>
            <span className="Multiline AttrContent">
                <Typography color="inherit">
                    {props.content}
                </Typography>
            </span>
        </div>
    );
}