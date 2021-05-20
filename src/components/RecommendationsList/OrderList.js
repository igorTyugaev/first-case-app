import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/executors.js";
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
import EmptyState from "../../baseComponents/EmptyState";
import {ReactComponent as ErrorIllustration} from "../../illustrations/error.svg";
import {Refresh as RefreshIcon} from "@material-ui/icons";
import {ReactComponent as NoDataIllustration} from "../../illustrations/no-data.svg";
import Loader from "../../baseComponents/Loader";
import OrdersFilter from "./../../components/OrdersFilter/OrdersFilter";
import OrderItem from "../Items/Order/OrderItem";

const useStyles = makeStyles((theme) => ({
    styles,
    root: {
        margin: "0 auto",
        marginTop: theme.spacing(12),
    },
}));


function OrderList(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const classes = useStyles();

    const useItems = () => {
        const [items, setItems] = useState([])
        useEffect(() => {
            const unsubscribe = firestore
                .collection("orders")
                // .where("status", "==", true)
                // .orderBy("createdAt");
                .onSnapshot(snapshot => {
                    const listItems = snapshot.docs
                        // TODO: Сделать фильтрацию: убирать пустые order-ы
                        // TODO: Считывать только необходимые для item-ов поля
                        // .filter((doc) => doc.data())
                        .map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    setLoading(false);
                    setItems(listItems)
                }, (error) => {
                    setLoading(false);
                    setError(error);
                })
            return () => unsubscribe()
        }, [])
        return items
    }
    const orders = useItems();

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

    if (orders.length >= 1) {
        return (
            <Grid item container xs={12} sm={12} md={10} lg={8} className={classes.root}>
                <Card>
                    <CardHeader color="success">
                        <h4 className={classes.cardTitleWhite}>Выбор заказа</h4>
                        <p className={classes.cardCategoryWhite}>
                            Выберите подходящий для вас заказ и нажмите "ПРИНЯТЬ"
                        </p>
                    </CardHeader>
                    <OrdersFilter/>
                    <List>
                        {orders.map((order, i) => (
                            <ListItem
                                divider={i < orders.length - 1}
                                key={order.id}>
                                <OrderItem order={order}/>
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

export default OrderList;