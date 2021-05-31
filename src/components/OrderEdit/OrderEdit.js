import React, {Component} from "react";

import PropTypes from "prop-types";

import validate from "validate.js";
import {withStyles} from "@material-ui/core/styles";

import {
    Grid,
    Typography,
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Hidden,
    Divider, Container, Input,
} from "@material-ui/core";

import orders from "../../services/orders";
import constraintsOrder from "../../data/constraintsOrder";
import TagsAutocompleteOrder from "../TagsAutocompleteOrder/TagsAutocompleteOrder";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {getTime} from "date-fns";

const styles = (theme) => ({
    mainContent: {
        paddingTop: theme.spacing(2),
    },

    badge: {
        top: theme.spacing(2),
        right: -theme.spacing(2),
    },

    loadingBadge: {
        top: "50%",
        right: "50%",
    },

    avatar: {
        marginRight: "auto",
        marginLeft: "auto",

        width: theme.spacing(14),
        height: theme.spacing(14),
    },

    nameInitials: {
        cursor: "default",
    },

    personIcon: {
        fontSize: theme.spacing(7),
    },

    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),

        minHeight: "initial",
    },
});

const initialState = {
    showingField: "",
    performingAction: false,
    errors: null,
    name: null,
    description: null,
    tags: null,
    deadline: null,
    price: null,
};

class OrderEdit extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    submitForm = () => {
        this.setState({
            performingAction: true,
            errors: null,
        })
        
        const {orderId} = this.props;
        const {history} = this.props;
        const values = {
            name: this.state.name,
            description: this.state.description,
            tags: this.state.tags,
            deadline: this.state.deadline,
            price: this.state.price,
        }

        console.log(orderId);
        const errorsCurrent = validate(
            {
                name: this.state.name,
                description: this.state.description,
                price: this.state.price,
            },
            {
                name: constraintsOrder.getValidator("name"),
                description: constraintsOrder.getValidator("description"),
                price: constraintsOrder.getValidator("price"),
            }
        );

        if (!errorsCurrent) {
            this.setState({
                errors: null,
            });

            orders
                .updateOrder(values, orderId)
                .then(() => {
                    history.push('/my_orders');
                })
                .catch((reason) => {
                    const code = reason.code;
                    const message = reason.message;

                    switch (code) {
                        default:
                            this.props.openSnackbar(message);
                            return;
                    }
                })
                .finally(() => {
                    this.setState({
                        performingAction: false,
                    })
                });
        } else {
            this.setState({
                performingAction: false,
                errors: errorsCurrent,
            });
        }
    };

    checkValidator = (fieldId, value) => {
        if (constraintsOrder.getValidator(fieldId)) {
            const errorsCurrent = validate(
                {
                    [fieldId]: value,
                },
                {
                    [fieldId]: constraintsOrder.getValidator(fieldId),
                }
            );

            if (!errorsCurrent)
                this.setState({
                    errors: null,
                })
            else {
                this.setState({
                    errors: errorsCurrent,
                })
            }
        }
    }

    changeField = (value, fieldId) => {
        if (!fieldId) {
            return;
        }

        this.checkValidator(fieldId, value);
    };

    handleChange = (value, fieldId) => {
        this.changeField(value, fieldId);

        this.setState({
            [fieldId]: value,
        });
    };

    render() {
        // Styling
        const {classes} = this.props;

        const {
            performingAction,
            errors,
        } = this.state;


        return (
            <Container classes={{root: classes.mainContent}}>
                <List disablePadding>
                    <ListItem>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <ListItemText
                                primary="Название"
                                secondary={errors && errors.name ? (
                                    <Typography color="error">
                                        {errors.name[0]}
                                    </Typography>
                                ) : "Что нужно сделать?"}
                            />

                            <Input
                                autoComplete="Что нужно сделать?"
                                autoFocus
                                disabled={performingAction}
                                error={!!(errors && errors.name)}
                                fullWidth
                                placeholder="Реализовать чат бота на..."
                                required
                                type="text"
                                defaultValue={this.name ? this.name : ""}
                                onChange={(event) => this.handleChange(event.target.value, "name")}
                            />
                        </Grid>
                    </ListItem>

                    <ListItem>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <ListItemText
                                primary="Описание"
                                secondary={errors && errors.description ? (
                                    <Typography color="error">
                                        {errors.description[0]}
                                    </Typography>
                                ) : "Максимально подробно опишите требования и детали вашего заказа"}
                            />

                            <Input
                                autoComplete="name"
                                autoFocus
                                disabled={performingAction}
                                error={!!(errors && errors.description)}
                                fullWidth
                                placeholder="Бот должен уметь..."
                                required
                                type="text"
                                defaultValue={this.description ? this.description : ""}
                                onChange={(event) => this.handleChange(event.target.value, "description")}
                            />
                        </Grid>
                    </ListItem>

                    <ListItem>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <ListItemText
                                primary="Теги к заказу"
                                secondary="Выберите ключевые слова, характеризующие ваш заказ"
                            />
                            <TagsAutocompleteOrder handleChange={this.handleChange}/>

                        </Grid>
                    </ListItem>

                    <ListItem>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <ListItemText
                                primary="Крайний срок выполнения заказа"
                                secondary="Укажите дату к которой должен быть готов заказ"
                            />

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    autoOk={true}
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    value={this.deadline}
                                    onChange={(data) => this.handleChange(getTime(data), "deadline")}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </ListItem>

                    <ListItem>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <ListItemText
                                primary="Бюджет на проект"
                                secondary={errors && errors.price ? (
                                    <Typography color="error">
                                        {errors.price[0]}
                                    </Typography>
                                ) : "Какую сумму вы готовы залптить за выполение зазака?"}
                            />

                            <Input
                                autoComplete="Что нужно сделать?"
                                autoFocus
                                disabled={performingAction}
                                error={!!(errors && errors.price)}
                                fullWidth
                                placeholder="999 ₽"
                                required
                                type="text"
                                defaultValue={this.price ? this.price : ""}
                                onChange={(event) => this.handleChange(event.target.value, "price")}
                            />
                        </Grid>
                    </ListItem>

                    <Box mt={1} mb={1}>
                        <Divider light/>
                    </Box>

                    <ListItem>
                        <Hidden xsDown>
                            <Grid alignItems="center" container direction="row" justify="space-between">
                                <Grid item xs>
                                    <ListItemText
                                        primary="Опубликовать объявление"
                                        secondary="Объявление можно будет отредактировать позже"
                                    />
                                </Grid>

                                <Grid item xs>
                                    <ListItemSecondaryAction>
                                        <Button
                                            color="primary"
                                            disabled={performingAction}
                                            variant="contained"
                                            onClick={() => this.submitForm()}
                                        >
                                            Опубликовать
                                        </Button>
                                    </ListItemSecondaryAction>
                                </Grid>
                            </Grid>
                        </Hidden>

                        <Hidden smUp>
                            <Grid alignItems="center" container direction="column" justify="space-between">
                                <Grid item xs>
                                    <ListItemText
                                        primary="Опубликовать объявление"
                                        secondary="Объявление можно будет отредактировать позже"
                                    />
                                </Grid>

                                <Grid item xs>
                                    <Box mb={2} mt={2}>
                                        <Button
                                            color="primary"
                                            disabled={performingAction}
                                            variant="contained"
                                            onClick={() => this.submitForm()}
                                        >
                                            Опубликовать
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Hidden>
                    </ListItem>
                </List>
            </Container>
        );
    }

    componentWillUnmount() {
        this.setState({history: null})
    }
}

OrderEdit.propTypes = {
    // Styling
    classes: PropTypes.object.isRequired,

    // Functions
    openSnackbar: PropTypes.func.isRequired,
};

export default withStyles(styles)(OrderEdit);
