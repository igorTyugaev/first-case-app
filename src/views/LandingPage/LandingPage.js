import React from "react";

import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

// core components
import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import {Button} from "@material-ui/core";
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
                                Найдем исполнителя для решения Вашей задачи!
                            </h1>
                            <h4>
                                Под руководством опытных наставников сфере IT, молодые специалисты работают над Вашим
                                проектом
                            </h4>
                            <br/>
                            <Button
                                color="secondary"
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
