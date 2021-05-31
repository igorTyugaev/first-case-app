import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import {
    Box, Button, Card,
    Fab, Grid,
    ListItem, Typography,
} from '@material-ui/core';

import {ReactComponent as ErrorIllustration} from "../../illustrations/error.svg";
import {ArrowBackIos as BackIcon, Refresh as RefreshIcon} from "@material-ui/icons";
import {ReactComponent as NoDataIllustration} from "../../illustrations/no-data.svg";
import {firestore, auth} from "../../firebase";
import Loader from "../Loader";
import EmptyState from "../EmptyState";
import ReviewItem from "./ReviewItem/ReviewItem";
import {useHistory, useParams} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        marginTop: theme.spacing(8),
    },
    header: {
        height: "10%",
        padding: "15px",

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
}));

export default function Reviews(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Custom Properties
    const history = useHistory();
    const {currentId} = useParams();

    const useItems = () => {
        const [items, setItems] = useState([]);
        useEffect(() => {
            const unsubscribe = firestore
                .collection("reviews")
                .where('targetPerson', '==', currentId)
                .onSnapshot(snapshot => {
                    const listItems = snapshot.docs
                        .map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    setLoading(false);
                    setItems(listItems);
                }, (error) => {
                    setLoading(false);
                    setError(error);
                })

            return () => unsubscribe()
        }, []);
        return items
    }

    const reviews = useItems();

    if (loading) {
        return <Loader/>;
    }

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

    if (reviews.filter(review => review.targetPerson === currentId).length >= 1) {
        return (
            <Grid item xs={12} sm={12} md={8} className={classes.root}>
                <Card>
                    <Box className={classes.header}>
                        <Button
                            startIcon={<BackIcon/>}
                            onClick={() => history.goBack()}
                        >
                            Назад
                        </Button>

                        <Typography color="primary" variant="h5">
                            Просмотр отзывов
                        </Typography>

                        <IconButton>
                            <MoreVertIcon/>
                        </IconButton>
                    </Box>

                    <List>
                        {reviews.map((review, i) => (
                            <ListItem
                                divider={i < reviews.length - 1}
                                key={review.id}>
                                <ReviewItem review={review}/>
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
            title="No reviews"
            description="Сорян, братан, но отзывов пока нет("
        />
    )
};