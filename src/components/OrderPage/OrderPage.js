import React, {Component} from "react";
import PropTypes from "prop-types";

import {withStyles} from "@material-ui/core/styles";
import {
    Grid,
    Typography,
    Box,
} from "@material-ui/core";

import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";


const styles = (theme) => ({
    root: {
        margin: "6vh auto",
        marginTop: theme.spacing(12),
    },
    description: {
        margin:'15px 25px'
    },
});

const initialState = {
    selectedTab: 0,
};

class OrderPage extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
    }

    handleExited = () => {
        this.setState(initialState);
    };

    handleTabChange = (event, value) => {
        this.setState({
            selectedTab: value,
        });
    };

    handleIndexChange = (index) => {
        this.setState({
            selectedTab: index,
        });
    };

    render() {
        // Styling
        const {classes} = this.props;

        // Custom Properties
        const {user, userData, theme} = this.props;

        // Custom Functions
        const {openSnackbar} = this.props;

        // Custom Functions
        const {onDeleteAccountClick} = this.props;

        const {selectedTab} = this.state;

        return (
            <Grid item container xs={12} sm={12} md={10} lg={8} className={classes.root}>

                <Card>
                    <CardHeader color="success">
                        <Typography color="initial" variant="h4" component="h4" align="left">
                            {'Название заказа'}
                        </Typography>
                    </CardHeader>

                    <Box className={classes.description}>
                        <Typography color="initial" variant="h4" component="h4" align="left" gutterBottom>
                            Описание заказа
                        </Typography>
                        <div className={classes.description}>
                            <ul>
                                <p>
                                Необходимо сделать сайт
                                </p>
                            </ul>
                        </div>

                        <Typography color="initial" variant="h4" component="h4" align="left" gutterBottom>
                            Теги
                        </Typography>
                        <div className={classes.description}>
                            <ul>
                                <li>
                                    Java
                                </li>
                                <li>
                                    JS
                                </li>
                                <li>
                                    TS
                                </li>
                            </ul>
                        </div>

                        <Typography color="initial" variant="h4" component="h4" align="left" gutterBottom>
                            Бюджет на проект
                        </Typography>
                        <div className={classes.description}>
                            <ul>
                                <p>
                                    5000р
                                </p>
                            </ul>
                        </div>

                        <Typography color="initial" variant="h4" component="h4" align="left" gutterBottom>
                            Сроки
                        </Typography>
                        <div className={classes.description}>
                            <ul>
                                <p>7 месяцев</p>
                            </ul>
                        </div>

                        <Typography color="initial" variant="h4" component="h4" align="left" gutterBottom>
                            Особые требования
                        </Typography>
                        <div className={classes.description}>
                            <ul>
                                <p> Английский язык 2000 ₽ / 60 мин.</p>
                            </ul>
                        </div>

                        <Typography color="initial" variant="h4" component="h4" align="left" gutterBottom>
                            Прикрепленные файлы
                        </Typography>
                        <div className={classes.description}>
                            <ul>
                                <li></li>
                            </ul>
                        </div>
                    </Box>
                </Card>

            </Grid>
        );
    }
}

OrderPage.propTypes = {
    // Styling
    classes: PropTypes.object.isRequired,

    // Custom Properties
    theme: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    userData: PropTypes.object,

    // Custom Functions
    openSnackbar: PropTypes.func.isRequired,

    // Custom Events
    onDeleteAccountClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(OrderPage);
