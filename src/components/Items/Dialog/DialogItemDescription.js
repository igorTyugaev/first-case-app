import React from "react";
// @material-ui/core components
// nodejs library that concatenates classes
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
// core components
import {NavLink} from "react-router-dom";
import {IconButton, Link} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "../../../baseComponents/UserAvatar/UserAvatar";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
    },

    circle: {
        display: "block",
    },

    text: {
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    }

});


export default function DialogItemDescription(props) {
    const classes = useStyles();
    const {dialog} = props;

    const truncate = (input, len) => input.length > len ? `${input.substring(0, len)}...` : input;

    return (
        <div className={classNames(classes.root)}>
            <div className={classNames(classes.circle)}>
                <IconButton
                    color="inherit"
                    component={NavLink}
                    to={dialog.uid ? `/user/${dialog.uid}` : `/order_page/${dialog.orderId}`}
                >
                    <UserAvatar context="dialog" title={dialog.channelName} userData={dialog}/>
                </IconButton>
            </div>

            <div className={classNames(classes.text)}>
                <Typography variant="h5" color="textPrimary">
                    <Link
                        color="inherit"
                        component={NavLink}
                        to={`/dialog/${dialog.id}`}
                        underline="none"
                    >
                        {!dialog.userName || dialog.userName.length < 1 ? "Загаловок отсутствует" : dialog.userName}
                    </Link>
                </Typography>
                <Typography variant="body1" component="p" align="left" color="textPrimary">
                    {!dialog.text || dialog.text.length < 1 ? "Сообщение отсутствует" : truncate(dialog.text, 350)}
                </Typography>
            </div>
        </div>
    );
}

