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
import {ReactComponent as NoDataIllustration} from "../../illustrations/no-data.svg";
import Loader from "../Loader";
import OrderItem from "../Items/Order/OrderItem";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        marginTop: theme.spacing(12),
    },
}));

function MyOrderList(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const classes = useStyles();
    const {user, userData, openSnackbar} = props;

    const useItems = () => {
        const [items, setItems] = useState([])
        useEffect(() => {
            const unsubscribe = firestore
                .collection("orders")
                .where('author', '==', user.uid)
                .onSnapshot(snapshot => {
                    const listItems = snapshot.docs
                        .filter((doc) => {
                            const data = doc.data();
                            return !(data.status && data.status === "busy" || data.status === "completed")
                        })
                        .map(doc => ({
                            id: doc.id,
                            disabled: (doc.data().responses && doc.data().responses.includes(user.uid)),
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
                        <h4 className={classes.cardTitleWhite}>Ваши заказы</h4>
                        <p className={classes.cardCategoryWhite}>
                        </p>
                    </CardHeader>
                    <List>
                        {orders.map((order, i) => (
                            <ListItem
                                divider={i < orders.length - 1}
                                disabled={order.disabled}
                                key={order.id}>
                                <OrderItem setLoading={setLoading} openSnackbar={openSnackbar} userData={userData}
                                           order={order}/>
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

export default MyOrderList;