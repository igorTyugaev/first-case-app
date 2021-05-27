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
import {Link, useHistory, useParams} from "react-router-dom";
import EmptyState from "../EmptyState";
import {ReactComponent as ErrorIllustration} from "../../illustrations/error.svg";
import {Box, Breadcrumbs, Container, Divider, Fab} from "@material-ui/core";
import {ArrowBackIos as BackIcon, Refresh as RefreshIcon} from "@material-ui/icons";
import Loader from "../Loader";
import OrderView from "../OrderView/OrderView";
import {ReactComponent as NoDataIllustration} from "../../illustrations/no-data.svg";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        marginTop: theme.spacing(8),
    },
    header: {
        height: theme.spacing(8),
        padding: "15px",

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
}));

function ProfilePage(props) {
    // Styling
    const classes = useStyles();
    const history = useHistory();

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
            <Grid item xs={12} sm={12} md={10} lg={8} className={classes.root}>
                <Card>
                    <Box className={classes.header}>
                        <Button
                            startIcon={<BackIcon/>}
                            onClick={() => history.goBack()}
                        >
                            Назад
                        </Button>

                        <Typography color="initial" variant="h6" component="p" align="center">
                            {(profile.fullName) ? (profile.fullName) : ("информация отсутствует (")}
                        </Typography>

                        <IconButton>
                            <MoreVertIcon/>
                        </IconButton>
                    </Box>

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
