import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-react/components/userCard.js";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import {IconButton} from "@material-ui/core";
import {Link} from "react-router-dom";
import UserAvatar from "../../../baseComponents/UserAvatar";
import Badge from "../../Badge/Badge";

const useStyles = makeStyles(styles);

export default function ProfileItemAvatar(props) {
    const classes = useStyles();
    const {profile} = props;

    const [value, setValue] = React.useState(4);

    return (
        <div className={classNames(classes.body)}>
            <div className={classNames(classes.profile)}>
                <IconButton
                    color="inherit"
                    component={Link} to={`/user/${profile.id}`}
                >
                    <UserAvatar context="card" title={profile.fullName}/>
                </IconButton>

                <div style={{padding: "5px"}}>
                    <Badge color="success">Аккаунт проверен</Badge>
                </div>

                <Typography variant="body2" color="textSecondary" component="p">
                    Выполненых работ: 200
                </Typography>

                {/*<Rating name="read-only" value={value} readOnly style={{padding: "5px"}}/>*/}

            </div>
        </div>
    );
}

ProfileItemAvatar.propTypes = {};
