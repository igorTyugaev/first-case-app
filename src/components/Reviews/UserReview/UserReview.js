import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import {IconButton} from "@material-ui/core";
import {Link} from "react-router-dom";
import UserAvatar from "../../UserAvatar";
import Badge from "../../Badge/Badge";

const useStyles = makeStyles({
    body: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        width: "100%",
    },

    profile: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "center",

        "& img": {
            display: "block",
            maxWidth: "160px",
            width: "100%",
        }
    },
});

export default function UserReview(props) {
    const classes = useStyles();
    const {review} = props;

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    const getRandomBadge = (type) => {
        if (type)
            return <Badge color="success">Аккаунт проверен</Badge>
        else
            return <Badge color="warning">Не подтвержден</Badge>
    }

    return (
        <div className={classNames(classes.body)}>
            <div className={classNames(classes.profile)}>
                <IconButton
                    color="inherit"
                    component={Link} to={`/user/${review.idAuthor}`}
                >
                    <UserAvatar context="card" title={review.author} user={review}/>
                </IconButton>

                <div style={{padding: "5px"}}>
                    {getRandomBadge(getRandomInt(2))}
                </div>

                <Typography variant="body2" color="textSecondary" component="p">
                    Выполненых работ: {getRandomInt(75)}
                </Typography>

                {/*<Rating name="read-only" value={value} readOnly style={{padding: "5px"}}/>*/}

            </div>
        </div>
    );
}

UserReview.propTypes = {};