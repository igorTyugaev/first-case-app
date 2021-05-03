import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/userAboutBody";

const useStyles = makeStyles(styles);


export default function UserAboutBody(props) {
    const classes = useStyles();
    const {...rest} = props;

    return (
        <div>
            <h3 className={classes.titleDescription}>О себе</h3>
            <div className={classes.description}>
                <ul>
                    <li>Хочу изучать фронтенд разработку и создание интерфейсов</li>
                </ul>
            </div>

            <h3 className={classes.titleDescription}>Образование</h3>
            <div className={classes.description}>
                <ul>
                    <li>УрФУ им Б. Ельцина, специальность – прикладная информатика</li>
                </ul>
            </div>
        </div>
    );
}