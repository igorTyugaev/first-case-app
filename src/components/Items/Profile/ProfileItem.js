import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import ProfileItemAvatar from "./ProfileItemAvatar";
import ProfileItemDescription from "./ProfileItemDescription";
import ProfileActions from "./ProfileActions";

const useStyles = makeStyles({
    main: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",

        "@media (max-width: 642px)": {
            display: "flex",
            flexDirection: "column",
        },
    },

    col_1: {
        flex: "1",
        width: "100%",
    },

    col_2: {
        flex: "3",
        width: "100%",
    },

    col_3: {
        flex: "1.5",
        width: "100%",
    },
});

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
                <ProfileActions profile={profile} userData={userData} openSnackbar={openSnackbar}
                                setLoading={setLoading}/>
            </div>
        </div>
    );
}

