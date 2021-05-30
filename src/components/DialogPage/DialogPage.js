import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from "../../components/Chat/Dialog";
import Grid from "@material-ui/core/Grid";

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
    const {user, userData, openSnackbar} = props;

    return (
        <Grid item container xs={12} sm={12} md={10} lg={8} className={classes.root}>
            <Dialog theme={theme} user={user} userData={userData} openSnackbar={openSnackbar}/>
        </Grid>
    );
}

export default DialogPage;
