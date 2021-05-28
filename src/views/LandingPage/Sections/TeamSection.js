import React from "react";
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import team1 from "../../../assets/img/faces/avatar.jpg";
import team2 from "../../../assets/img/faces/christian.jpg";
import team3 from "../../../assets/img/faces/kendall.jpg";
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
            <h2 className={classes.title}>Here is our team</h2>
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <Card plain>
                            <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                                <img src={team1} alt="..." className={imageClasses}/>
                            </GridItem>
                            <h4 className={classes.cardTitle}>
                                Gigi Hadid
                                <br/>
                                <small className={classes.smallTitle}>Model</small>
                            </h4>
                            <CardBody>
                                <p className={classes.description}>
                                    You can write here details about one of your team members. You
                                    can give more details about what they do. Feel free to add
                                    some <a href="#pablo">links</a> for people to be able to
                                    follow them outside the site.
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
                                Christian Louboutin
                                <br/>
                                <small className={classes.smallTitle}>Designer</small>
                            </h4>
                            <CardBody>
                                <p className={classes.description}>
                                    You can write here details about one of your team members. You
                                    can give more details about what they do. Feel free to add
                                    some <a href="#pablo">links</a> for people to be able to
                                    follow them outside the site.
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
                                Kendall Jenner
                                <br/>
                                <small className={classes.smallTitle}>Model</small>
                            </h4>
                            <CardBody>
                                <p className={classes.description}>
                                    You can write here details about one of your team members. You
                                    can give more details about what they do. Feel free to add
                                    some <a href="#pablo">links</a> for people to be able to
                                    follow them outside the site.
                                </p>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    );
}
