import React from "react";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import Email from "@material-ui/icons/Email";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import profileImage from "assets/img/faces/marc.jpg";

import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinksStudent(props) {
    const classes = useStyles();
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <Button
                    href="#pablo"
                    className={classes.navLink}
                    onClick={e => e.preventDefault()}
                    color="transparent"
                >
                    Наставники
                </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Button
                    href="#pablo"
                    className={classes.navLink}
                    onClick={e => e.preventDefault()}
                    color="transparent"
                >
                    Ваш заказ
                </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Button
                    justIcon
                    round
                    href="#pablo"
                    className={classes.notificationNavLink}
                    onClick={e => e.preventDefault()}
                    color="success">
                    <Email className={classes.icons}/>
                </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
                <CustomDropdown
                    left
                    caret={false}
                    hoverColor="black"
                    dropdownHeader="Ученик Иван"
                    buttonText={
                        <img
                            src={profileImage}
                            className={classes.img}
                            alt="profile"
                        />
                    }
                    buttonProps={{
                        className:
                            classes.navLink + " " + classes.imageDropdownButton,
                        color: "transparent"
                    }}
                    dropdownList={[
                        "Мой профиль",
                        "Ред. профиль",
                        "Выйти"
                    ]}
                />
            </ListItem>
        </List>
    );
}