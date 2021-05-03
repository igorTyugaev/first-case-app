import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/offerActions.js";
import Button from "../CustomButtons/Button";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Badge from "../Badge/Badge";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import GridItem from "../Grid/GridItem";
import Slide from "@material-ui/core/Slide";
import {Container} from "@material-ui/core";
import WriteMessageDialogBtn from "../WriteMessageDialogBtn/writeMessageDialogBtn";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

export default function OfferActions(props) {
    const classes = useStyles();
    const {...rest} = props;

    return (
        <div className={classNames(classes.main)}>
            <Typography variant="subtitle1" color="textPrimary" component="p">
                Сделаю за: <br/>
                <span style={{fontWeight: "bold", color: "#000", textAlign: "center"}}>
                    {200}{"₽"}
                </span>
            </Typography>
            <Typography variant="subtitle1" color="textPrimary" component="p">
                Срок исполнения: <br/> <span
                style={{fontWeight: "bold", color: "#000", textAlign: "center"}}>{"30.12.21"}</span>
            </Typography>

            <WriteMessageDialogBtn/>
            <Button color="danger" className={classNames(classes.btn)}>Отклонить</Button>
        </div>
    );
}

