import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import styles from "assets/jss/material-kit-react/views/editProfile.js";
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

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

export default function EditProfile(props) {
    const classes = useStyles();
    const {...rest} = props;

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
                            <h4 className={classes.cardTitleWhite}>Редактировать профиль</h4>
                            <p className={classes.cardCategoryWhite}>Заполните свой профиль</p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Имя"
                                        id="first-name"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Фамилия"
                                        id="last-name"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Эл. почта"
                                        id="email-address"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Пароль"
                                        id="password"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Город"
                                        id="city"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Возраст"
                                        id="country"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <InputLabel>
                                        <h3 className={classes.titleDescription}>О себе</h3>
                                    </InputLabel>
                                    <CustomInput
                                        labelText="Небольшой рассказ о себе, о своих навках, квалификации."
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
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <InputLabel>
                                        <h3 className={classes.titleDescription}>Образование</h3>
                                    </InputLabel>
                                    <CustomInput
                                        labelText="Небольшой рассказ о себе, о своих навках, квалификации."
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
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <InputLabel>
                                        <h3 className={classes.titleDescription}>Опыт</h3>
                                    </InputLabel>
                                    <CustomInput
                                        className={classes.customInput}
                                        labelText="Небольшой рассказ о себе, о своих навках, квалификации."
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
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <InputLabel>
                                        <h3 className={classes.titleDescription}>Услуги и цены</h3>
                                    </InputLabel>
                                    <CustomInput
                                        labelText="Небольшой рассказ о себе, о своих навках, квалификации."
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
                            <Button color="success">Обновить профиль</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </div>
            <Footer/>
        </div>
    );
}
