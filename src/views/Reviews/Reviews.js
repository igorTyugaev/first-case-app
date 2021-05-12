import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/editProfile.js";
// core components
import Header from "../../components/Header/Header";
import HeaderLinksProfile from "../../components/Header/HeaderLinksProfile";
import classNames from "classnames";
import Footer from "../../components/Footer/Footer";
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
import {
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText
} from '@material-ui/core';
import InputLabel from "@material-ui/core/InputLabel";
import MakeRating from './../../components/MakeRating/MakeRating';

const reviews = [
    {
        id:uuid(),
        name:'Лена',
        text:'Отличный исполнитель, очень довольны работой',
        imageUrl: {profile},
    },
    {
        id:uuid(),
        name:'Наташа',
        text:'Отлично',
        imageUrl: {profile},
    },
    {
        id:uuid(),
        name:'Влада',
        text:'Хорошо',
        imageUrl: {profile},
    },
    {
        id:uuid(),
        name:'Маша',
        text:'Прекрасная работа',
        imageUrl: {profile},
    },
];

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

export default function Reviews(props) {
    const classes = useStyles();
    const {...rest} = props;
    const [value, setValue] = React.useState(1);
    return (
        <div>
            <Header
            color="white"
            routes={dashboardRoutes}
            brand="FirstCase"
            rightLinks={<HeaderLinksProfile/>}
            fixed
            {...rest}/>
            
            <div className={classNames(classes.main)}>
                <GridItem xs={12} sm={12} md={8} className={classNames(classes.inner)}>
                    <Card>
                        <CardHeader color="success">
                            <h4 className={classes.cardTitleWhite}>Создать отзыв</h4>
                            <p className={classes.cardCategoryWhite}>
                                Пожалуйста, укажите ваш отзыв ниже
                            </p>
                        </CardHeader>

                        <MakeRating/>
                        
                        <form>
                            <CardBody>
                                <InputLabel>
                                    <Typography variant="subtitle1" color="textPrimary" component="p">
                                        Отзыв
                                    </Typography>
                                </InputLabel>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            className={classes.customInput}
                                            labelText="Что вы думаете об этом исполнителе?"
                                            id="about-me"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                multiline: true,
                                                rows: 5
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                            <CardFooter>
                                <Button color="success">Добавить отзыв</Button>
                            </CardFooter>
                        </form>
                        <Typography variant="subtitle1" color="textPrimary" component="p" style={{paddingLeft: "35px"}}>
                            Отзывы 
                        </Typography>
                        <List>
                            {reviews.map((review, i) => (
                                <ListItem
                                    divider={i < reviews.length - 1}
                                    key={reviews.id}>
                                    <ReviewItem review={review}/>
                                </ListItem>
                            ))}
                        </List>
                    </Card>
                </GridItem>
            </div>
            <Footer/>
        </div>
    )
};