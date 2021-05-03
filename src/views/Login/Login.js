import React from "react";
import {Link as RouterLink} from 'react-router-dom';
import Button from "components/CustomButtons/Button.js";
import * as Yup from 'yup';
import {Formik} from 'formik';
import {
    Container, FormHelperText,
    Grid,
    Link,
    TextField,
    Typography
} from '@material-ui/core';

import {makeStyles} from "@material-ui/core/styles";
import styles from "../../assets/jss/material-kit-react/components/login";
import classNames from "classnames";
import Header from "../../components/Header/Header";
import HeaderLinksRole from "../../components/Header/HeaderLinksRole";
import HeaderLinksAuth from "../../components/Header/HeaderLinksAuth";
import Footer from "../../components/Footer/Footer";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

export default function Login(props) {
    const classes = useStyles();
    const {...rest} = props;

    return (

        <div>
            <div className={classNames(classes.main)}>
                <Header
                    color="white"
                    routes={dashboardRoutes}
                    brand="FirstCase"
                    leftLinks={<HeaderLinksRole/>}
                    rightLinks={<HeaderLinksAuth/>}
                    fixed
                    {...rest}
                />

                <div className={classNames(classes.inner)}>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email('Адрес эл. почты должен быть действительным').max(255).required('Эл. почта обязательна'),
                            password: Yup.string().max(255).required('Необходим пароль'),
                        })}
                        onSubmit={() => {

                        }}>

                        {({
                              errors,
                              handleBlur,
                              handleChange,
                              handleSubmit,
                              isSubmitting,
                              touched,
                              values
                          }) => (
                            <form onSubmit={handleSubmit}>
                                <div className={classNames(classes.header)}>
                                    <Typography
                                        color="textPrimary"
                                        variant="h3">
                                        Войти
                                    </Typography>

                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                        variant="body2">
                                        Авторизуйтесь на платформе
                                    </Typography>
                                </div>

                                <TextField
                                    error={Boolean(touched.email && errors.email)}
                                    fullWidth
                                    helperText={touched.email && errors.email}
                                    label="Эл. почта"
                                    margin="normal"
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="email"
                                    value={values.email}
                                    variant="outlined"/>

                                <TextField
                                    error={Boolean(touched.password && errors.password)}
                                    fullWidth
                                    helperText={touched.password && errors.password}
                                    label="Пароль"
                                    margin="normal"
                                    name="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="password"
                                    value={values.password}
                                    variant="outlined"/>

                                <Button
                                    disabled={isSubmitting}
                                    className={classes.btn}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                    round>
                                    Войти
                                </Button>

                                <Typography
                                    color="textSecondary"
                                    variant="body1">
                                    Нет учетной записи?
                                    {' '}
                                    <Link
                                        component={RouterLink}
                                        to="/register"
                                        variant="h6"
                                    >
                                        Зарегистрироваться
                                    </Link>
                                </Typography>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
