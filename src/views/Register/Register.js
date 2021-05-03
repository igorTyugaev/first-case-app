import React from "react";
import {Link as RouterLink} from 'react-router-dom';
import Button from "components/CustomButtons/Button.js";

import {Helmet} from 'react-helmet';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {
    Checkbox,
    Container,
    FormHelperText,
    Link,
    TextField,
    Typography
} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../assets/jss/material-kit-react/components/register";
import classNames from "classnames";
import Header from "../../components/Header/Header";
import HeaderLinksRole from "../../components/Header/HeaderLinksRole";
import HeaderLinksAuth from "../../components/Header/HeaderLinksAuth";
import Footer from "../../components/Footer/Footer";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

export default function Register(props) {
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
                            firstName: '',
                            lastName: '',
                            password: '',
                            policy: false
                        }}
                        validationSchema={
                            Yup.object().shape({
                                email: Yup.string().email('Адрес эл. почты должен быть действительным').max(255).required('Эл. почта обязательна'),
                                firstName: Yup.string().max(255).required('Имя обязательно'),
                                lastName: Yup.string().max(255).required('Фамилия обязательна'),
                                password: Yup.string().max(255).required('Необходим пароль'),
                                policy: Yup.boolean().oneOf([true], 'Это поле необходимо отметить')
                            })
                        }
                        onSubmit={() => {

                        }}
                    >
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
                                        Создать новый аккаунт
                                    </Typography>

                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                        variant="body2">
                                        Используйте свою эл. почту, чтобы создать новую учетную запись
                                    </Typography>
                                </div>

                                <TextField
                                    error={Boolean(touched.firstName && errors.firstName)}
                                    fullWidth
                                    helperText={touched.firstName && errors.firstName}
                                    label="Имя"
                                    margin="normal"
                                    name="firstName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    variant="outlined"/>

                                <TextField
                                    error={Boolean(touched.lastName && errors.lastName)}
                                    fullWidth
                                    helperText={touched.lastName && errors.lastName}
                                    label="Фамилия"
                                    margin="normal"
                                    name="lastName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    variant="outlined"/>

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

                                <div className={classNames(classes.policy)}>
                                    <Checkbox
                                        checked={values.policy}
                                        name="policy"
                                        onChange={handleChange}/>

                                    <Typography
                                        color="textSecondary"
                                        variant="body1"
                                        className={classNames(classes.textHighLineHeight)}>
                                        Я прочитал
                                        {' '}
                                        <Link
                                            color="primary"
                                            component={RouterLink}
                                            to="#"
                                            underline="always"
                                            variant="h6">
                                            Правила и условия
                                        </Link>
                                    </Typography>
                                </div>


                                {Boolean(touched.policy && errors.policy) && (
                                    <FormHelperText error>
                                        {errors.policy}
                                    </FormHelperText>
                                )}

                                <Button
                                    disabled={isSubmitting}
                                    className={classes.btn}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                    round
                                >
                                    Зарегистрироваться сейчас
                                </Button>


                                <Typography
                                    color="textSecondary"
                                    variant="body1"
                                    className={classNames(classes.textHighLineHeight)}>
                                    Уже есть аккаунт?
                                    {' '}
                                    <Link
                                        component={RouterLink}
                                        to="/login"
                                        variant="h6">
                                        Войти
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
