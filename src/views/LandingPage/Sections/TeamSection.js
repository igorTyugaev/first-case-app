import React from "react";
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import team1 from "../../../assets/img/Игорь.jpg";
import team2 from "../../../assets/img/Настя.jpg";
import team3 from "../../../assets/img/Наташа.jpg";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import CardBody from "../../../components/Card/CardBody";
import Card from "../../../components/Card/Card.js";

const useStyles = makeStyles(styles);

export default function TeamSection() {
    const classes = useStyles();
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    return (
        <div className={classes.section}>
            <h2 className={classes.title}>Отзывы наших клиентов</h2>
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <Card plain>
                            <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                                <img src={team1} alt="..." className={imageClasses}/>
                            </GridItem>
                            <h4 className={classes.cardTitle}>
                                Игорь 
                                <br/>
                                <small className={classes.smallTitle}>Разработчик</small>
                            </h4>
                            <CardBody>
                                <p className={classes.description}>
                                First Case помог мне найти ментора, который научил меня общаться с клиентами и помог заработать первые деньги! Я очень благодарен! 
                                </p>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Card plain>
                            <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                                <img src={team2} alt="..." className={imageClasses}/>
                            </GridItem>
                            <h4 className={classes.cardTitle}>
                                Настя 
                                <br/>
                                <small className={classes.smallTitle}>Наставник</small>
                            </h4>
                            <CardBody>
                                <p className={classes.description}>
                                    Здесь всегда можно найти желающих учиться и попадаются очень интересные заказы.
                                </p>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Card plain>
                            <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                                <img src={team3} alt="..." className={imageClasses}/>
                            </GridItem>
                            <h4 className={classes.cardTitle}>
                                Наташа
                                <br/>
                                <small className={classes.smallTitle}>Заказчик</small>
                            </h4>
                            <CardBody>
                                <p className={classes.description}>
                                    Неожидала, что мой заказ исполнят так качественно! Обязательно обращусь за  помощью ещё!
                                </p>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    );
}
