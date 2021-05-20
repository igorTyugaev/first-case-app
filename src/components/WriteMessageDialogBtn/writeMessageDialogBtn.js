import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/offerActions.js";
import Button from "../CustomButtons/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import {Container} from "@material-ui/core";
import classNames from "classnames";
import CustomInput from "../CustomInput/CustomInput";


const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
Transition.displayName = "Transition";


export default function WriteMessageDialogBtn(props) {
    const classes = useStyles();
    const [classicModal, setClassicModal] = React.useState(false);

    return (
        <div className={classNames(classes.main)}>
            <Button color="success" className={classNames(classes.btn)}
                    onClick={() => setClassicModal(true)}>
                Откликнуться
            </Button>

            <Container xs={12} sm={12} md={12} lg={6}>
                <Dialog
                    classes={{
                        root: classes.center,
                        paper: classes.modal
                    }}
                    open={classicModal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setClassicModal(false)}
                    aria-labelledby="classic-modal-slide-title"
                    aria-describedby="classic-modal-slide-description">

                    <DialogTitle
                        id="classic-modal-slide-title"
                        disableTypography
                        className={classes.modalHeader}>

                        <h2 className={classes.modalTitle}>Заявка на участие в конкурсе</h2>
                    </DialogTitle>

                    <DialogContent
                        id="classic-modal-slide-description"
                        className={classes.modalBody}>

                        <h4>Сообщение для заказчика</h4>
                        <CustomInput
                            labelText="Напипшите ваше сообщение"
                            id="message"
                            formControlProps={{
                                fullWidth: true,
                                className: classes.textArea
                            }}
                            inputProps={{
                                multiline: true,
                                rows: 5
                            }}
                        />
                    </DialogContent>

                    <DialogActions className={classes.modalFooter}>
                        <Button
                            onClick={() => setClassicModal(false)}
                            color="danger"
                            simple>Close
                        </Button>
                        <Button color="success">
                            Отправить
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </div>
    );
}