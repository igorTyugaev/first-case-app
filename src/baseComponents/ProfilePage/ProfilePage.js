import React, {Component, useEffect, useState} from "react";
import PropTypes from "prop-types";

import {makeStyles, withStyles} from "@material-ui/core/styles";

import AccountView from "../AccountView";
import Card from "../../components/Card/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardHeader from "../../components/Card/CardHeader";
import OrderPage from "../OrderPage/OrderPage";
import {firestore} from "../../firebase";
import {useParams} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        marginTop: theme.spacing(12),
    },
}));

function ProfilePage(props) {
    // Styling
    const classes = useStyles();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null)

    // Custom Properties
    const {user, userData} = props;

    const {profileId} = useParams();

    useEffect(() => {
        const unsubscribe = firestore
            .collection("users")
            .doc(profileId)
            .onSnapshot(
                (snapshot) => {
                    const data = snapshot.data();

                    if (!snapshot.exists || !data) {
                        return;
                    }

                    setProfile(data);
                    setLoading(false);
                },
                (error) => {
                    setLoading(false);
                    setError(error);
                }
            );
        return () => unsubscribe()
    }, []);

    // Custom Functions
    const {openSnackbar} = props;

    return (
        <Grid item container xs={12} sm={12} md={10} lg={8} className={classes.root}>
            <Card>
                <CardHeader color="success">
                    <Typography color="initial" variant="h4" component="h4" align="left">
                        {(userData.fullName) ? (userData.fullName) : ("информация отсутствует (")}
                    </Typography>
                </CardHeader>

                <AccountView
                    user={user}
                    userData={userData}
                    openSnackbar={openSnackbar}
                />
            </Card>
        </Grid>
    );
}

ProfilePage.propTypes = {
    // Custom Properties
    theme: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    userData: PropTypes.object,

    // Custom Functions
    openSnackbar: PropTypes.func.isRequired,
};
export default ProfilePage;
