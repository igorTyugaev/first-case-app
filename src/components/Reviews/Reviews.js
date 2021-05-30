import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import {
    Box,
    Fab, Grid,
    ListItem,
} from '@material-ui/core';

import {ReactComponent as ErrorIllustration} from "../../illustrations/error.svg";
import {Refresh as RefreshIcon} from "@material-ui/icons";
import {ReactComponent as NoDataIllustration} from "../../illustrations/no-data.svg";
import {firestore, auth} from "../../firebase";
import Loader from "../Loader";
import EmptyState from "../EmptyState";
import Card from "../Card/Card.js";
import CardHeader from "../Card/CardHeader";
import ReviewItem from "./ReviewItem/ReviewItem";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        marginTop: theme.spacing(12),
    },
}));

export default function Reviews(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {currentId} = props;
  
    const useItems = () => {
        const [items, setItems] = useState([]);
        useEffect(() => {
            const unsubscribe = firestore
                .collection("reviews")
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
    console.log(reviews, currentId)
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
                    <CardHeader color="success">
                        <h4 className={classes.cardTitleWhite}>Просмотр отзывов</h4>
                    </CardHeader>

                    <List>
                        {reviews.map((review, i) => (
                            (review.targetPerson === currentId)?
                                <ListItem
                                    divider={i < reviews.length - 1}
                                    key={review.id}>
                                    <ReviewItem review={review}/>
                                </ListItem> : null
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