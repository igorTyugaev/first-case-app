import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/offerActions.js";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import channels from "../../../services/channels";
import orders from "../../../services/orders";

const useStyles = makeStyles(styles);


export default function OrderActions(props) {
    const classes = useStyles();
    const {setLoading, openSnackbar, order, userData} = props;
    const history = useHistory();

    const goToChannel = (id) => {
        history.push(`/dialog/${id}`);
    };

    const handleChannel = () => {
        setLoading(true);
        channels
            .addChannelOrder(order, userData)
            .then((id) => {
                console.log(id)
                goToChannel(id);
            })
            .catch((reason) => {
                const code = reason.code;
                const message = reason.message;

                switch (code) {
                    default:
                        openSnackbar(message);
                        return;
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handleRespondBtn = () => {
        orders
            .addMemberToOrder(order.id)
            .then(() => {
                handleChannel();
            })
            .catch((reason) => {
                const code = reason.code;
                const message = reason.message;

                switch (code) {
                    default:
                        openSnackbar(message);
                        return;
                }
            })

    }

    return (
        <div className={classNames(classes.main)}>
            <Typography variant="subtitle1" color="textPrimary" component="p">
                Бюджет: <br/>
                <span style={{fontWeight: "bold", color: "#000", textAlign: "center"}}>
                    {order.price ? order.price : "Не указано"}
                </span>
            </Typography>
            <Typography variant="subtitle1" color="textPrimary" component="p">
                Срок исполнения: <br/> <span
                style={{fontWeight: "bold", color: "#000", textAlign: "center"}}>
                {order.deadline ? new Date(order.deadline).toDateString() : "Не указано"}
            </span>
            </Typography>

            <Button color="primary" variant="contained" className={classNames(classes.btn)}
                    onClick={handleRespondBtn}>
                {order.disabled ? "Перейти к обсуждению" : "Оставить заявку"}
            </Button>
        </div>
    );
}

