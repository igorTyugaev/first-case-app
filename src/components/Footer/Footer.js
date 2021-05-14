/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";

// material-ui core components
import {makeStyles} from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-react/components/footerStyle.js";
import {
    Avatar,
    Badge,
    Box,
    CircularProgress,
    Container,
    Divider,
    Fade,
    Grid, Hidden,
    Link,
    Typography
} from "@material-ui/core";
import ChipsArray from "../../baseComponents/ChipsArray/ChipsArray";

const useStyles = makeStyles(styles);

export default function Footer(props) {
    const classes = useStyles();
    const {whiteFont} = props;
    const footerClasses = classNames({
        [classes.footer]: true,
        [classes.footerWhiteFont]: whiteFont
    });
    const aClasses = classNames({
        [classes.a]: true,
        [classes.footerWhiteFont]: whiteFont
    });
    return (
        <footer className={footerClasses}>
            <Container>
                <Hidden xsDown>
                    <Grid container direction="row" justify="space-between">
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <Box>
                                &copy; {1900 + new Date().getYear()}, {" "}
                                <a
                                    href="https://drive.google.com/file/d/1nzF0V54iEXKEBClFUwQAkMWnhkTIzi5N/view?usp=sharing"
                                    className={aClasses}
                                    target="_blank"
                                >
                                    Пользовательское соглашение об использовании ресурса.
                                </a>
                            </Box>
                        </Grid>

                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <Box>
                                &copy; {1900 + new Date().getYear()}, {" "}
                                <a
                                    href="/"
                                    className={aClasses}
                                    target="_blank"
                                >
                                    FIRST CASE.
                                </a>{" "}
                                Все права защищены.
                            </Box>
                        </Grid>

                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <Box>
                                &copy; {1900 + new Date().getYear()}, {" "}
                                <a
                                    href="https://drive.google.com/file/d/1apz3V1QNfm-FFeWt7BdoLVhVl0DDrTqX/view?usp=sharing"
                                    className={aClasses}
                                    target="_blank"
                                >
                                    Политика конфиденциальности и обработки персональных данных.
                                </a>
                            </Box>
                        </Grid>
                    </Grid>
                </Hidden>
                <Hidden smUp>
                    <Grid container direction="column" justify="space-between" alignItems="center" spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Box>
                                &copy; {1900 + new Date().getYear()}, {" "}
                                <a
                                    href="https://drive.google.com/file/d/1nzF0V54iEXKEBClFUwQAkMWnhkTIzi5N/view?usp=sharing"
                                    className={aClasses}
                                    target="_blank"
                                >
                                    Пользовательское соглашение об использовании ресурса.
                                </a>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Box>
                                &copy; {1900 + new Date().getYear()}, {" "}
                                <a
                                    href="/"
                                    className={aClasses}
                                    target="_blank"
                                >
                                    FIRST CASE.
                                </a>{" "}
                                Все права защищены.
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Box>
                                &copy; {1900 + new Date().getYear()}, {" "}
                                <a
                                    href="https://drive.google.com/file/d/1apz3V1QNfm-FFeWt7BdoLVhVl0DDrTqX/view?usp=sharing"
                                    className={aClasses}
                                    target="_blank"
                                >
                                    Политика конфиденциальности и обработки персональных данных.
                                </a>
                            </Box>
                        </Grid>
                    </Grid>
                </Hidden>
            </Container>
        </footer>
    );
}

Footer.propTypes = {
    whiteFont: PropTypes.bool
};
