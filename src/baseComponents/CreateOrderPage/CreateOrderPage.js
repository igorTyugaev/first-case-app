import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

import PropTypes from "prop-types";

import {makeStyles} from "@material-ui/core/styles";

import OrderEdit from "../OrderEdit";
import Card from "../../components/Card/Card";
import Grid from "@material-ui/core/Grid";
import CardHeader from "../../components/Card/CardHeader";

const useStyles = makeStyles((theme) => ({
    inner: {
        margin: "0 auto",
        padding: "6vh 0",
    },

    root: {
        margin: "0 auto",
        marginTop: theme.spacing(12),
    }
}));

function CreateOrderPage(props) {
    // Styling
    const classes = useStyles();

    // Custom Properties
    const {theme} = props;

    // Custom Functions
    const {openSnackbar} = props;

    const {userID} = props;

    const history = useHistory();

    return (
        <Grid item container xs={12} sm={12} md={10} lg={8} className={classes.root}>
            <Card>
                <CardHeader color="success">
                    <h4 className={classes.cardTitleWhite}>Создать новый заказ</h4>
                    <p className={classes.cardCategoryWhite}>
                        Пожалуйста, укажите детали заказа в форме ниже
                    </p>
                </CardHeader>

                <OrderEdit
                    theme={theme}
                    openSnackbar={openSnackbar}
                    userID={userID}
                    history={history}
                />
            </Card>
        </Grid>
    );
}

CreateOrderPage.propTypes = {
    // Custom Properties
    theme: PropTypes.object.isRequired,

    // Custom Functions
    openSnackbar: PropTypes.func.isRequired,
};

export default CreateOrderPage;