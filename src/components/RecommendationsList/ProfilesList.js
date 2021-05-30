import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import List from "@material-ui/core/List";


import {
    Box,
    Fab,
    ListItem,
} from '@material-ui/core';

import Grid from "@material-ui/core/Grid";
import {firestore} from "../../firebase";
import EmptyState from "../EmptyState";
import {ReactComponent as ErrorIllustration} from "../../illustrations/error.svg";
import {Refresh as RefreshIcon} from "@material-ui/icons";
import Loader from "../Loader";

import {ReactComponent as NoDataIllustration} from "../../illustrations/no-data.svg";
import ProfileItem from "../Items/Profile/ProfileItem";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        marginTop: theme.spacing(12),
    },
}));

function ProfilesList(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const classes = useStyles();
    const {user, userData, openSnackbar} = props;

    const getHeaderByType = (role) => {
        if (userData.role) {
            switch (role.toLowerCase()) {
                case "student":
                    return (
                        <CardHeader color="success">
                            <h4 className={classes.cardTitleWhite}>Наставники, готовые вам помочь</h4>
                            <p className={classes.cardCategoryWhite}>
                                Выберите подходящего для вас наставника и нажмите "ОТКЛИКНУТЬСЯ"
                            </p>
                        </CardHeader>
                    );
                case "customer":
                    return (
                        <CardHeader color="success">
                            <h4 className={classes.cardTitleWhite}>Наставники, готовые выполнить ваш заказ</h4>
                            <p className={classes.cardCategoryWhite}>
                                Выберите подходящего для вас наставника и нажмите "ОТКЛИКНУТЬСЯ"
                            </p>
                        </CardHeader>
                    );
                case "mentor":
                    return (
                        <CardHeader color="success">
                            <h4 className={classes.cardTitleWhite}>Студенты, подходящие под ваш профиль</h4>
                            <p className={classes.cardCategoryWhite}>
                                Выберите подходящего для вас студента и нажмите "ОТКЛИКНУТЬСЯ"
                            </p>
                        </CardHeader>
                    );
                default:
                    return;
            }
        } else
            return null;
    }

    const getFindTypeUser = (role) => {
        if (userData.role) {
            switch (role.toLowerCase()) {
                case "student":
                    return "Mentor";
                case "customer":
                    return "Mentor";
                case "mentor":
                    return "Student";
                default:
                    return;
            }
        } else
            return null;
    }

    const useItems = () => {
        const [items, setItems] = useState([])
        useEffect(() => {
            const unsubscribe = firestore
                .collection("users")
                // .where("role", "==", getFindTypeUser(userData.role))
                // .orderBy("createdAt");
                .get()
                .then(snapshot => {
                    const listItems = snapshot.docs
                        .filter((doc) => doc.id !== user.uid)
                        .map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                            disabled: (doc.data().responses && doc.data().responses.includes(user.uid)),
                        }))
                    setItems(listItems)
                    setLoading(false);
                }, (error) => {
                    setLoading(false);
                    setError(error);
                })
            return () => unsubscribe
        }, [])
        return items
    }
    const profiles = useItems();

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

    if (profiles.length >= 1) {
        return (
            <Grid item container xs={12} sm={12} md={10} lg={8} className={classes.root}>
                <Card>
                    {getHeaderByType(userData.role)}
                    <List>
                        {profiles.map((profile, i) => (
                            <ListItem
                                divider={i < profiles.length - 1}
                                key={profile.id}
                                disabled={profile.disabled}>
                                <ProfileItem profile={profile} userData={userData} openSnackbar={openSnackbar}
                                             setLoading={setLoading}/>
                            </ListItem>
                        ))}
                    </List>
                </Card>
            </Grid>
        );
    }

    return (
        <EmptyState
            image={<NoDataIllustration/>}
            title="Не найдено"
            description="Извините, но подходящих кандидатов нет"
        />
    );
}

export default ProfilesList;

