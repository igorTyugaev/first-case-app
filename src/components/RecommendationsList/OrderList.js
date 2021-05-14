import React, {useEffect, useState} from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/executors.js";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import List from "@material-ui/core/List";

import {v4 as uuid} from 'uuid';
import {
    Box, Breadcrumbs,
    Fab, Link,
    ListItem,
} from '@material-ui/core';
import profile from "../../assets/img/faces/christian.jpg";
import OrderItem from "../RecommendationsItem/OrderItem";
import Grid from "@material-ui/core/Grid";
import {firestore} from "../../firebase";
import EmptyState from "../../baseComponents/EmptyState";
import {ReactComponent as ErrorIllustration} from "../../illustrations/error.svg";
import {Home as HomeIcon, Refresh as RefreshIcon} from "@material-ui/icons";
import {ReactComponent as NoDataIllustration} from "../../illustrations/no-data.svg";
import Loader from "../../baseComponents/Loader";
import OrdersFilter from "./../../components/OrdersFilter/OrdersFilter";

const products = [
    {
        id: uuid(),
        name: 'Многопоточный парсер данных',
        imageUrl: {profile},
        desc:
            "Парсер позволяет собирать: ссылки, населенный пункт, заголовок, описание, имя продавца и стоимость. Собираются данные организаций и юридических лиц. \n" +
            "Для многопоточной работы программы необходимо отдельно приобрести прокси: IP4 прокси (https или socks) \n" +
            "Для разгадывания капчи нужен ключ от сервиса распознавания. Поддерживается Рукапча."
    },
    {
        id: uuid(),
        name: 'Medium Corporation',
        imageUrl: "../../assets/img/faces/christian.jpg",
        desc: "moment().subtract(2, 'hours')"
    },
    {
        id: uuid(),
        name: 'Slack',
        imageUrl: '/static/images/products/product_3.png',
        desc: "moment().subtract(3, 'hours')"
    },
    {
        id: uuid(),
        name: 'Lyft',
        imageUrl: '/static/images/products/product_4.png',
        desc: "moment().subtract(5, 'hours')"
    },
    {
        id: uuid(),
        name: 'GitHub',
        imageUrl: '/static/images/products/product_5.png',
        desc: "moment().subtract(9, 'hours')"
    }
];

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
    const products = useItems();

    if (error) {
        return (
            <EmptyState
                image={<ErrorIllustration/>}
                title="Couldn’t retrieve user."
                description="Something went wrong when trying to retrieve the requested user."
                button={
                    <Fab
                        variant="extended"
                        color="primary"
                        onClick={() => window.location.reload()}
                    >
                        <Box clone mr={1}>
                            <RefreshIcon/>
                        </Box>
                        Retry
                    </Fab>
                }
            />
        );
    }

    if (loading) {
        return <Loader/>;
    }

    if (products.length >= 1) {
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
                        {products.map((product, i) => (
                            <ListItem
                                divider={i < products.length - 1}
                                key={product.id}>
                                <OrderItem product={product}/>
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