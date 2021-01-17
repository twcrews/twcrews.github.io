import React from 'react';
import { Typography } from "@material-ui/core";

export function Attribute(props) {
    return (
        <React.Fragment>
            <span className="BigIcon">
                {props.icon}
                <Typography variant="h5">
                    {props.title}
                </Typography>
            </span>
            <span>
                <Typography>
                    {props.content}
                </Typography>
            </span>
        </React.Fragment>
    )
}