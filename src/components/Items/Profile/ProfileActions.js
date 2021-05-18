import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/offerActions.js";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(styles);


export default function ProfileActions(props) {
    const classes = useStyles();
    const {profile} = props;

    return (
        <div className={classNames(classes.main)}>
            <Typography variant="subtitle1" color="textPrimary" component="p">
                Сделаю за: <br/>
                <span style={{fontWeight: "bold", color: "#000", textAlign: "center"}}>
                    {profile.price ? profile.price : "Не указано"}
                </span>
            </Typography>
            <Typography variant="subtitle1" color="textPrimary" component="p">
                Срок исполнения: <br/> <span
                style={{fontWeight: "bold", color: "#000", textAlign: "center"}}>
                {profile.deadline ? new Date(profile.deadline).toDateString() : "Не указано"}
            </span>
            </Typography>

            <Button color="primary" variant="contained" className={classNames(classes.btn)}>Откликнуться</Button>
        </div>
    );
}

