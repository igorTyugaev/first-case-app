import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import styles from "assets/jss/material-kit-react/views/addOrder.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Header from "../../components/Header/Header";
import HeaderLinksProfile from "../../components/Header/HeaderLinksProfile";
import classNames from "classnames";
import Footer from "../../components/Footer/Footer";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";

const useStyles = makeStyles(styles);

export default function AddOrder(props) {
    const classes = useStyles();

    return (
        <div>

            <div className={classNames(classes.main)}>

                <GridItem xs={12} sm={12} md={8} className={classNames(classes.inner)}>
                    <Card>
                        <CardHeader color="success">
                            <h4 className={classes.cardTitleWhite}>Создать новый заказ</h4>
                            <p className={classes.cardCategoryWhite}>
                                Пожалуйста, укажите детали заказа в форме ниже
                            </p>
                        </CardHeader>
                        <form>
                            <CardBody>
                                <InputLabel>
                                    <Typography variant="subtitle1" color="textPrimary" component="p">
                                        Название заказа
                                    </Typography>
                                </InputLabel>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText="Что нужно сделать?"
                                            id="project-name"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>


                                <InputLabel>
                                    <Typography variant="subtitle1" color="textPrimary" component="p">
                                        Описание заказа
                                    </Typography>
                                </InputLabel>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            className={classes.customInput}
                                            labelText="Максимально подробно опишите все детали заказа"
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

                                <InputLabel>
                                    <Typography variant="subtitle1" color="textPrimary" component="p">Стоимость
                                        заказа</Typography>
                                </InputLabel>
                                <GridContainer>
                                    <GridItem xs={6} sm={6} md={6}>
                                        <CustomInput
                                            labelText="От"
                                            id="min-price"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={6} sm={6} md={6}>
                                        <CustomInput
                                            labelText="До"
                                            id="max-price"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>

                                <InputLabel>
                                    <Typography variant="subtitle1" color="textPrimary" component="p">
                                        Кол-во дней на выполнение заказа
                                    </Typography>
                                </InputLabel>

                                <GridContainer>
                                    <GridItem xs={6} sm={6} md={6}>
                                        <CustomInput
                                            labelText="Введите число дней"
                                            id="date-count"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>

                            </CardBody>
                            <CardFooter>
                                <Button color="success">Создать заказ</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </GridItem>
            </div>
            <Footer/>
        </div>
    );
}
