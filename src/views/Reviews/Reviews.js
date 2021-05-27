import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/editProfile.js";
// core components
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import profile from "../../assets/img/faces/avatar.jpg";
import ReviewItem from '../../components/ReviewItem/ReviewItem';
import List from "@material-ui/core/List";
import {v4 as uuid} from 'uuid';
import InputLabel from "@material-ui/core/InputLabel";
import MakeRating from './../../components/MakeRating/MakeRating';
import Loader from "../../baseComponents/Loader";
import {
    Box,
    Fab,
    ListItem,
} from '@material-ui/core';
import EmptyState from "../../baseComponents/EmptyState";
import {ReactComponent as ErrorIllustration} from "../../illustrations/error.svg";
import {Refresh as RefreshIcon} from "@material-ui/icons";
import {ReactComponent as NoDataIllustration} from "../../illustrations/no-data.svg";
import {firestore, auth} from "../../firebase";


const useStyles = makeStyles((theme) => ({
    styles,
    root: {
        margin: "0 auto",
        marginTop: theme.spacing(16),
    },
}));

export default function Reviews(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    if (loading) {
        return <Loader/>;
    };

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
    };

    if (reviews.length >= 1) {
        return (
            <div className={classNames(classes.main)}>
                <GridItem xs={12} sm={12} md={8}  className={classes.root}>
                    <Card>
                        <CardHeader color="success">
                            <h4 className={classes.cardTitleWhite}>Просмотр отзывов</h4>
                        </CardHeader>

                        <List>
                            {reviews.map((review, i) => (
                                review.targetPerson === auth.currentUser.uid?
                                <ListItem
                                    divider={i < reviews.length - 1}
                                    key={review.id}>
                                    <ReviewItem review={review}/>
                                </ListItem> : null
                            ))}
                        </List>
                    </Card>
                </GridItem>
            </div>
        );
    };

    return (
        <EmptyState
            image={<NoDataIllustration/>}
            title="No reviews"
            description="Сорян, братан, но отзывов пока нет("
        />
    )
};