import React from "react";

import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

// core components
import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import {Button, Grid} from "@material-ui/core";
import Footer from "./Footer/Footer";
import Parallax from "./Parallax/Parallax";
import GridContainer from "./Grid/GridContainer";
import GridItem from "./Grid/GridItem";

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
    const classes = useStyles();
    const {...rest} = props;
    return (
        <div>
            <Parallax filter image={require("assets/img/landing-bg.jpg")}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={7}>
                            <h1 className={classes.title}>
                                Добро пожаловать на First Case!
                            </h1>
                            <h4>
                                Обучай, учись и зрабатывай!
                            </h4>
                            <br/>
                            <Button
                                color="secondary"
                                variant="contained"
                            >
                                Смотреть промо
                            </Button>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <ProductSection/>
                    <TeamSection/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
