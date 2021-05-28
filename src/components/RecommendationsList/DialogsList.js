import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
// core components
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
import DialogItem from "../Items/Dialog/DialogItem";
import CardHeader from "../Card/CardHeader";
import Card from "../Card/Card";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        marginTop: theme.spacing(12),
    },
}));

function DialogsList(props) {
    const [dialogs, setDialogs] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const classes = useStyles();
    const {theme, user, userData, openSnackbar} = props;

    useEffect(() => {
        const unsubscribe = firestore
            .collection("channels")
            .orderBy("channelName", "asc")
            .onSnapshot((snapshot) => {
                const listItems = snapshot.docs
                    .map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                setDialogs(listItems)
                setLoading(false);
            }, (error) => {
                setLoading(false);
                setError(error);
            })
        return () => unsubscribe
    }, []);

    if (error) {
        return (
            <EmptyState
                image={<ErrorIllustration/>}
                title="Не удалось получить диалоги."
                description="Что-то пошло не так при попытке загрузить диалоги."
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

    if (dialogs.length >= 1) {
        return (
            <Grid item container xs={12} sm={12} md={10} lg={8} className={classes.root}>
                <Card>
                    <CardHeader color="success">
                        <h4 className={classes.cardTitleWhite}>Выбор заказа</h4>
                        <p className={classes.cardCategoryWhite}>
                            Выберите подходящий для вас диалог и нажмите "Перейти к обсуждению"
                        </p>
                    </CardHeader>

                    <List>
                        {dialogs.map((dialog, i) => (
                            <ListItem
                                divider={i < dialogs.length - 1}
                                key={dialog.id}>
                                <DialogItem theme={theme} dialog={dialog} openSnackbar={openSnackbar}/>
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
            title="No orders"
            description="Сорян, братан, но заказов пока нет("
        />
    );
}

export default DialogsList;

