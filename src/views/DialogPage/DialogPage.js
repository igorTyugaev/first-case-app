import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from "../../baseComponents/Chat/Dialog";
import Grid from "@material-ui/core/Grid";
import DialogBar from "../../baseComponents/Chat/DialogBar";

const useStyles = makeStyles((theme) => ({

    root: {
        margin: "0 auto",
        marginTop: theme.spacing(8),
        height: `calc(100vh - ${theme.spacing(8)}px)`
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: "#22273b !important",
    },
}));

function DialogPage(props) {
    // Styling
    const classes = useStyles();

    // Custom Properties
    const {theme} = props;
    const {user, userData} = props;

    return (
        <Grid container direction="row" className={classes.root}>
            <Grid item xs={2} sm={2} md={2} lg={2}>
                <DialogBar theme={theme} user={user}/>
            </Grid>

            <Grid item xs={10} sm={10} md={10} lg={10}>
                <Dialog theme={theme} user={user} userData={userData}/>
            </Grid>
        </Grid>
    );
}

export default DialogPage;
