import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";

const InfoBox = ({ title, cases, total, active, isRed, isGreen, ...props }) => {
    console.log("active", active)
    return (
        <>
            <Card className={`flex-1 cursor-pointer my-2 md:my-0 ${active && "border-t-8 border-red-600"}`} onClick={props.onClick}>
                <CardContent>
                    <Typography color="textSecondary" className="font-bold" gutterBottom>
                        {title}
                    </Typography>
                    <h2 className={`text-2xl  font-bold ${isGreen && "text-green-600"}`}>
                        {cases}
                    </h2>

                    <Typography className="infoBox__total" color="textSecondary">
                        {total} Total
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default InfoBox;