import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import {Box, IconButton} from "@material-ui/core";
import {Link} from "react-router-dom";
import UserAvatar from "../../UserAvatar";
import Badge from "../../Badge/Badge";
import imagesStyle from "../../../assets/jss/material-kit-react/imagesStyles";

const useStyles = makeStyles({
    body: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },

    profile: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "center",
    },

    ...imagesStyle,
    imgBody: {
        display: "block"
    },
});

export default function DialogItemAvatar(props) {
    const classes = useStyles();
    const {theme, dialog} = props;

    return (
        <Box className={classNames(classes.body)}>
            <IconButton
                color="inherit"
                component={Link}
                to={dialog.uid ? `/user/${dialog.uid}` : `/order_page/${dialog.orderId}`}
            >
                <UserAvatar context="dialog" title={dialog.channelName} userData={dialog}/>
            </IconButton>

            <div style={{padding: "5px"}}>
                <Badge color="success">
                    Наставник
                </Badge>
            </div>
        </Box>
    );
}

DialogItemAvatar.propTypes = {};
