import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

import {makeStyles} from "@material-ui/core/styles";

import Card from "../../components/Card/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardHeader from "../../components/Card/CardHeader";
import {firestore} from "../../firebase";
import {Link, useParams} from "react-router-dom";
import orders from "../../services/orders";
import EmptyState from "../EmptyState";
import {ReactComponent as NoDataIllustration} from "../../illustrations/no-data.svg";
import {ReactComponent as ErrorIllustration} from "../../illustrations/error.svg";
import {Box, Breadcrumbs, Container, Fab} from "@material-ui/core";
import {Refresh as RefreshIcon} from "@material-ui/icons";
import Loader from "../Loader";
import OrderView from "../OrderView";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        marginTop: theme.spacing(12),
    },
}));


function OrderPage(props) {
    // Styling
    const classes = useStyles();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [order, setOrder] = useState(null)

    // Custom Properties
    const {user, userData, theme} = props;
    const {orderId} = useParams();

    // Custom Functions
    const {openSnackbar} = props;

    useEffect(() => {
        const unsubscribe = firestore
            .collection("orders")
            .doc(orderId)
            .onSnapshot(
                (snapshot) => {
                    const data = snapshot.data();

                    if (!snapshot.exists || !data) {
                        return;
                    }

                    setOrder(data);
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

    if (order) {
        return (

            <Grid item container xs={12} sm={12} md={10} lg={8} className={classes.root}>
                <Container>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link color="inherit" to={"/orders"}>
                            Все заказы
                        </Link>
                    </Breadcrumbs>
                </Container>
                <Card>
                    <CardHeader color="success">
                        <Typography color="initial" variant="h4" component="h4" align="left">
                            {(order.name) ? (order.name) : ("информация отсутствует (")}
                        </Typography>
                    </CardHeader>

                    <OrderView order={order}/>

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

OrderPage.propTypes = {
    // Custom Properties
    theme: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    userData: PropTypes.object,

    // Custom Functions
    openSnackbar: PropTypes.func.isRequired,
};

export default OrderPage;
