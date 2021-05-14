import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/offerActions.js";
import Button from "../CustomButtons/Button";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Badge from "../Badge/Badge";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);


export default function OfferActions(props) {
    const classes = useStyles();
    const { product, variant } = props;

    const placeholderUno = () => {
        alert(`Вы откликнулись на ${product.name} как ${variant === 'student' ? "студент" : "ментор"}.`)
    }

    const placeholderDuo = () => {
        alert(`Вы отклонили на ${product.name} как ${variant === 'student' ? "студент" : "ментор"}.`)
    }

    return (
        <div className={classNames(classes.main)}>
            <Typography variant="subtitle1" color="textPrimary" component="p">
                {variant === "mentor" ? (
                    <>
                        Сделаю за: <br />
                        <span style={{ fontWeight: "bold", color: "#000", textAlign: "center" }}>
                            {product.price}{"₽"}
                        </span>
                    </>
                ) : variant === "student" ? (
                    <>
                        Оплачу: <br />
                        <span style={{ fontWeight: "bold", color: "#000", textAlign: "center" }}>
                            {product.price}{"₽"}
                        </span>
                    </>
                ) : variant === "customer" ? (
                    <>
                        Цена: <br />
                        <span style={{ fontWeight: "bold", color: "#000", textAlign: "center" }}>
                            {product.price}{"₽"}
                        </span>
                    </>
                ) : <></>}
            </Typography>
            <Typography variant="subtitle1" color="textPrimary" component="p">
                Срок исполнения: <br /> <span
                    style={{ fontWeight: "bold", color: "#000", textAlign: "center" }}>{Date(product.deadline).toLocaleString()}</span>
            </Typography>

            {variant !== 'customer' && (
                <>
                    <Button color="success" className={classNames(classes.btn)} onClick={placeholderUno}>Откликнуться</Button>
                    <Button color="danger" className={classNames(classes.btn)} onClick={placeholderDuo}>Отклонить</Button>
                </>
            )}
        </div>
    );
}

