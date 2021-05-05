import React from "react";
// nodejs library to set properties for components
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/userSummary.js";
import classNames from "classnames";
import Button from "../CustomButtons/Button";
import Badge from "../Badge/Badge";
import {Message} from "@material-ui/icons";


const useStyles = makeStyles(styles);

export default function UserSummary(props) {
    const classes = useStyles();
    const {...rest} = props;

    return (
        <div className={classNames(classes.body)}>
            <h3 className={classes.title}>Пупкин Иван</h3>

            {/*<ProfileRating/>*/}

            <div>
                <Badge color="warning">Python</Badge>
                <Badge color="success">Django</Badge>
                <Badge color="primary">Tornado</Badge>
                <Badge color="info">Pandas</Badge>
            </div>


            <Button color="success" round className={classes.btn}>
                <Message className={classes.icons}/> Написать сообщение
            </Button>

        </div>
    );
}

UserSummary.propTypes = {};
