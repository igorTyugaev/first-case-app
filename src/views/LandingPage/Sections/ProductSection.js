import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

// @material-ui/icons
import learning from "../../../illustrations/learning1.svg";
import reading from "../../../illustrations/reading1.svg";
import teacher from "../../../illustrations/teacher1.svg";
// core components

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";

const useStyles = makeStyles(styles);

export default function ProductSection(props) {
    const classes = useStyles();
    const {theme} = props;
    return (
        <div className={classes.section}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8}>
                    <h2 style={{paddingBottom: '27px'}} className={classes.title}>Здесь вы найдёте</h2>
                </GridItem>
            </GridContainer>
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <img src={learning} alt="" style={{marginBottom: '17px'}}/>
                        <h4 className={classes.title}>Исполните свой первый проект, под наставничеством опытных экспертов</h4>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <img src={reading} alt=""/>
                        <h4 className={classes.title}>Исполнителя для вашего проеката под руководством настоящих профессионалов</h4>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <img src={teacher} alt="" style={{marginBottom: '9px'}}/>
                        <h4 className={classes.title}>Найдете заинтерисованых студентов и пополните своё портфолио новыми проектами</h4>
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    );
}
