import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/userItem.js";
import classNames from "classnames";
import ProfileItemAvatar from "./ProfileItemAvatar";
import ProfileItemDescription from "./ProfileItemDescription";
import ProfileActions from "./ProfileActions";


const useStyles = makeStyles(styles);


export default function ProfileItem(props) {
    const classes = useStyles();
    const {profile, userData, openSnackbar, setLoading} = props;

    return (
        <div className={classNames(classes.main)}>

            <div className={classNames(classes.col_1)}>
                <ProfileItemAvatar profile={profile}/>
            </div>

            <div className={classNames(classes.col_2)}>
                <ProfileItemDescription profile={profile}/>
            </div>

            <div className={classNames(classes.col_3)}>
                <ProfileActions profile={profile} userData={userData} openSnackbar={openSnackbar} setLoading={setLoading}/>
            </div>
        </div>
    );
}

