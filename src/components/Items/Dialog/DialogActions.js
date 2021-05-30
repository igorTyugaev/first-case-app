import React, {useState} from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import {Link as RouterLink, useHistory} from "react-router-dom";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Grid, Link} from "@material-ui/core";
import channels from "../../../services/channels";
import DeleteModal from "../../Chat/DeleteModal";

const useStyles = makeStyles({
    main: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    btn: {
        width: "100%",
    },
});

export default function DialogActions(props) {
    const classes = useStyles();
    const {dialog, openSnackbar} = props;
    const history = useHistory();
    const [deleteModal, setDeleteModal] = useState(false);

    const goToChannel = () => {
        history.push(`/dialog/${dialog.id}`);
    };

    const removeChannel = (id) => {
        if (!(dialog && dialog.id))
            return;

        channels
            .removeChannel(dialog.id)
            .then((value) => {
                console.log(value)
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

            });
    };

    const showDeleteModal = () => {
        setDeleteModal(!deleteModal);
    };

    return (
        <Grid item container direction="column" spacing={1}>
            {deleteModal ? (
                <DeleteModal
                    title="Вы уверены, что хотите отклонить заказ?"
                    deleteMsg={removeChannel}
                    handleModal={showDeleteModal}
                />
            ) : null}

            <Grid item>
                <Typography variant="subtitle1" color="textPrimary" component="p">
                    Заказ: <br/>
                    <Link style={{fontWeight: "bold", color: "#000", textAlign: "center"}}
                          component={RouterLink}
                          to={`/order_page/${dialog.orderId}`}>
                        {!dialog.channelName || dialog.channelName.length < 1 ? "Загаловок отсутствует" : dialog.channelName}
                    </Link>
                </Typography>
            </Grid>

            <Grid item>
                <Typography variant="subtitle1" color="textPrimary" component="p">
                    Стутус заказа: <br/>
                    <span style={{fontWeight: "bold", color: "#000", textAlign: "center"}}>
                    {dialog.status ? dialog.status : "Не указано"}
                </span>
                </Typography>
            </Grid>

            <Grid item>
                <Button color="primary" variant="contained" className={classNames(classes.btn)}
                        onClick={goToChannel}>
                    Перейти к обсуждению
                </Button>
            </Grid>

            <Grid item>
                <Button color="secondary" variant="contained" className={classNames(classes.btn)}
                        onClick={showDeleteModal}>
                    Отклонить
                </Button>
            </Grid>
        </Grid>
    );
}

