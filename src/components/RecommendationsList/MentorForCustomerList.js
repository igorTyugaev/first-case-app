import React, {useEffect, useState} from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/executors.js";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import classNames from "classnames";
import List from "@material-ui/core/List";


import {v4 as uuid} from 'uuid';
import {
    Box,
    Fab,
    ListItem,
} from '@material-ui/core';
import profile from "../../assets/img/faces/christian.jpg";
import MentorForCustomerItem from "../RecommendationsItem/MentorForCustomerItem";
import Grid from "@material-ui/core/Grid";
import {firestore} from "../../firebase";
import EmptyState from "../../baseComponents/EmptyState";
import {ReactComponent as ErrorIllustration} from "../../illustrations/error.svg";
import {Refresh as RefreshIcon} from "@material-ui/icons";
import Loader from "../../baseComponents/Loader";
import OrdersFilter from "../OrdersFilter/OrdersFilter";
import OrderItem from "../RecommendationsItem/OrderItem";
import {ReactComponent as NoDataIllustration} from "../../illustrations/no-data.svg";

const mentors = [
    {
        id: uuid(),
        name: 'Многопоточный парсер данных',
        imageUrl: {profile},
        message:
            "Парсер позволяет собирать: ссылки, населенный пункт, заголовок, описание, имя продавца и стоимость. Собираются данные организаций и юридических лиц. \n" +
            "Для многопоточной работы программы необходимо отдельно приобрести прокси: IP4 прокси (https или socks) \n" +
            "Для разгадывания капчи нужен ключ от сервиса распознавания. Поддерживается Рукапча."
    },
    {
        id: uuid(),
        name: 'Medium Corporation',
        imageUrl: "../../assets/img/faces/christian.jpg",
        message: "moment().subtract(2, 'hours')"
    },
    {
        id: uuid(),
        name: 'Slack',
        imageUrl: '/static/images/mentors/product_3.png',
        message: "moment().subtract(3, 'hours')"
    },
    {
        id: uuid(),
        name: 'Lyft',
        imageUrl: '/static/images/mentors/product_4.png',
        message: "moment().subtract(5, 'hours')"
    },
    {
        id: uuid(),
        name: 'GitHub',
        imageUrl: '/static/images/mentors/product_5.png',
        message: "moment().subtract(9, 'hours')"
    }
];

const useStyles = makeStyles((theme) => ({
    styles,
    root: {
        margin: "0 auto",
        marginTop: theme.spacing(12),
    },
}));


function MentorForCustomerList(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const classes = useStyles();
    const {...rest} = props;
    const {user} = props;

    const useItems = () => {
        const [items, setItems] = useState([])
        useEffect(() => {
            const unsubscribe = firestore
                .collection("users")
                // .where("status", "==", true)
                // .orderBy("createdAt");
                .onSnapshot(snapshot => {
                    const listItems = snapshot.docs
                        // TODO: Сделать фильтрацию: убирать пустые order-ы
                        // TODO: Считывать только необходимые для item-ов поля
                        .filter((doc) => doc.id != user.uid)
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
    const mentors = useItems();

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

    if (mentors.length >= 1) {
        return (
            <Grid item container xs={12} sm={12} md={10} lg={8} className={classes.root}>
                <Card>
                    <CardHeader color="success">
                        <h4 className={classes.cardTitleWhite}>Наставники, готовые выполнить ваш заказ</h4>
                        <p className={classes.cardCategoryWhite}>
                            Выберите подходящего для вас наставника и нажмите "ОТКЛИКНУТЬСЯ"
                        </p>
                    </CardHeader>
                    <List>
                        {mentors.map((mentor, i) => (
                            <ListItem
                                divider={i < mentors.length - 1}
                                key={mentor.id}>
                                <MentorForCustomerItem mentor={mentor}/>
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

export default MentorForCustomerList;

