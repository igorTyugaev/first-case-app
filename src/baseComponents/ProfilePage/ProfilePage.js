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
import {Link, useParams} from "react-router-dom";
import EmptyState from "../EmptyState";
import {ReactComponent as ErrorIllustration} from "../../illustrations/error.svg";
import {Box, Breadcrumbs, Container, Fab} from "@material-ui/core";
import {Refresh as RefreshIcon} from "@material-ui/icons";
import Loader from "../Loader";
import OrderView from "../OrderView/OrderView";
import {ReactComponent as NoDataIllustration} from "../../illustrations/no-data.svg";

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
    const {userId} = useParams();

    // Custom Functions
    const {openSnackbar} = props;

    useEffect(() => {
        const unsubscribe = firestore
            .collection("users")
            .doc(userId)
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


    if (error) {
        return (
            <EmptyState
                image={<ErrorIllustration/>}
                title="Не удалось получить пользователя."
                description="Что-то пошло не так при попытке получить пользователя."
                button={
                    <Fab
                        variant="extended"
                        color="primary"
                        onClick={() => window.location.reload()}
                    >
                        <Box clone mr={1}>
                            <RefreshIcon/>
                        </Box>
                        Повторить
                    </Fab>
                }
            />
        );
    }

    if (loading) {
        return <Loader/>;
    }

    if (profile) {
        return (
            <Grid item container xs={12} sm={12} md={10} lg={8} className={classes.root}>
                <Card>
                    <CardHeader color="success">
                        <Typography color="initial" variant="h4" component="h4" align="left">
                            {(profile.fullName) ? (profile.fullName) : ("информация отсутствует (")}
                        </Typography>
                    </CardHeader>

                    <AccountView
                        profile={profile}
                        openSnackbar={openSnackbar}
                    />
                </Card>
            </Grid>
        );
    }

    return (
        <EmptyState
            image={<NoDataIllustration/>}
            title="No orders"
            description="Сорян, братан, но заказов пока нет("
        />
    );
}

ProfilePage.propTypes = {
    // Custom Properties
    theme: PropTypes.object.isRequired,
    userData: PropTypes.object,

    // Custom Functions
    openSnackbar: PropTypes.func.isRequired,
};
export default ProfilePage;
