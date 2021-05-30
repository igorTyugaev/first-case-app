import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Messages from "./Messages";
import IconButton from "@material-ui/core/IconButton";
import {NavLink, useParams} from "react-router-dom";
import {firestore} from "../../firebase";
import firebase from "firebase/app";
import ScrollableFeed from "react-scrollable-feed";
import {FiSend} from "react-icons/fi";
import {RiImageAddLine} from "react-icons/ri";
import FileUpload from "./FileUpload";
import "emoji-mart/css/emoji-mart.css";
import {Box, Divider, Grid, Link, Paper, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

import {
    ArrowBackIos as BackIcon,
} from "@material-ui/icons";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import classNames from "classnames";
import orders from "../../services/orders";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: `calc(100vh - ${theme.spacing(8)}px)`,
        width: "100%",
    },
    header: {
        height: "10%",
        padding: "15px",

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    subheader: {
        height: "10%",
        paddingBottom: "15px",

        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    body: {
        position: "relative",
        overflowY: "auto",
        padding: theme.spacing(2),
        paddingTop: 0,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "space-between"
    },
    footer: {
        display: "flex",
        alignItems: "flex-end",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: "primary",
        borderRadius: "5px",
        marginBottom: theme.spacing(1),
    },
    title: {
        maxWidth: "68vw",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
    },
    message: {
        width: "100%",
        color: "white",
    },
    roomNameText: {
        marginBlockEnd: 0,
        marginBlockStart: 0,
        paddingLeft: "5px",
    },
    iconDesign: {
        fontSize: "1.5em",
    },
    inputFile: {
        display: "none",
    },
}));

function Dialog(props) {
    const classes = useStyles();
    const params = useParams();

    const [allMessages, setAllMessages] = useState([]);
    const [channelName, setChannelName] = useState("");
    const [actionStatus, setActionStatus] = useState("");
    const [userNewMsg, setUserNewMsg] = useState("");
    const [modalState, setModalState] = useState(false);
    const [file, setFileName] = useState(null);
    const [orderId, setOrderId] = useState(null);

    const {user, userData, openSnackbar} = props;
    const history = useHistory();

    const changeStatusOrder = (status) => {
        if (!orderId)
            return;

        orders
            .changeStatus(orderId, status)
            .then(() => {
                console.log("changeStatus")
            })
            .catch((reason) => {
                const code = reason.code;
                const message = reason.message;

                openSnackbar(message);
            })
    }

    const changeChannelStatus = (new_status) => {
        if (params.id) {
            firestore.collection("channels")
                .doc(params.id)
                .update({
                    status: new_status,
                })
                .then((res) => {
                    console.log("changeChannelStatus");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handleActionAccept = () => {
        if (actionStatus === "request_order") {
            changeChannelStatus("response_order");
            return;
        }

        if (actionStatus === "request_profile") {
            changeChannelStatus("response_profile");
            return;
        }

        if (actionStatus === "response_order") {
            changeChannelStatus("busy_order");
            changeStatusOrder("busy");
            return;
        }

        if (actionStatus === "response_profile") {
            changeChannelStatus("busy_profile");
            return;
        }

        if (actionStatus === "busy_order") {
            changeChannelStatus("completed");
            changeStatusOrder("completed");
            return;
        }

        if (actionStatus === "busy_profile") {
            changeChannelStatus("completed");
            return;
        }
    };

    const handleActionReject = () => {

    };

    const getSubheaderTitle = () => {
        if (!actionStatus)
            return;

        const userRole = (userData && userData.role) ? userData.role.toLowerCase() : null;

        if (!userRole)
            return;

        if (actionStatus === "request_order") {
            if (userRole === "customer")
                return "Выбрать этого исполнителя?";
        }

        if (actionStatus === "request_profile") {
            if (userRole === "mentor")
                return "Выбрать этого студента?";
        }

        if (actionStatus === "response_order") {
            if (userRole === "mentor")
                return "Выбрать этого заказчика?";
        }

        if (actionStatus === "response_profile") {
            if (userRole === "student")
                return "Выбрать этого наставника?";
        }

        if (actionStatus === "busy_order") {
            if (userRole === "customer")
                return "Подтвердить выполнение заказа?";
        }

        if (actionStatus === "busy_profile") {
            return;
        }

        if (actionStatus === "completed")
            return;

        return
    }

    const sendMsg = (e) => {
        e.preventDefault();
        if (userNewMsg && params.id) {
            if (userData) {
                const displayName = userData.fullName;
                const imgUrl = userData.avatar;
                const uid = user.uid;
                const likeCount = 0;
                const likes = {};
                const fireCount = 0;
                const fire = {};
                const heartCount = 0;
                const heart = {};
                const postImg = null;

                const obj = {
                    text: userNewMsg,
                    timestamp: firebase.firestore.Timestamp.now(),
                    userImg: imgUrl ? imgUrl : null,
                    userName: displayName ? displayName : "Don't have a display name",
                    uid: uid,
                    likeCount: likeCount,
                    likes: likes,
                    fireCount: fireCount,
                    fire: fire,
                    heartCount: heartCount,
                    heart: heart,
                    postImg: postImg,
                };


                firestore.collection("channels")
                    .doc(params.id)
                    .collection("messages")
                    .add(obj)
                    .then((res) => {
                        console.log("message sent");
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                firestore.collection("channels")
                    .doc(params.id)
                    .update({
                        text: userNewMsg,
                        avatar: imgUrl ? imgUrl : null,
                        userName: displayName ? displayName : "Don't have a display name",
                        uid: uid,
                    })
                    .then((res) => {
                        console.log("message sent");
                    })
                    .catch((err) => {
                        console.log(err);
                    });

            }

            setUserNewMsg("");
        }
    };

    const openModal = () => {
        setModalState(!modalState);
    };

    const handleFileUpload = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            setFileName(e.target.files[0]);
            openModal();
        }
        e.target.value = null;
    };

    const handleKeyDown = (event) => {
        if (!event) {
            return;
        }

        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
            return;
        }

        const key = event.key;

        if (!key) {
            return;
        }

        if (key === "Enter") {
            sendMsg(event);
        }
    };

    useEffect(() => {
        if (params.id) {
            firestore.collection("channels")
                .doc(params.id)
                .onSnapshot((snapshot) => {
                    if (snapshot && snapshot.data()) {
                        const data = snapshot.data();
                        data.channelName && setChannelName(data.channelName);
                        data.status && setActionStatus(data.status);
                        data.orderId && setOrderId(data.orderId);
                    }
                });

            firestore.collection("channels")
                .doc(params.id)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) => {
                    setAllMessages(
                        snapshot.docs.map((doc) => ({id: doc.id, data: doc.data()}))
                    );
                });
        }
    }, [params]);

    return (
        <Paper className={classes.root}>
            {modalState ? <FileUpload setState={openModal} file={file}/> : null}

            <Box className={classes.header}>
                <Button
                    startIcon={<BackIcon/>}
                    onClick={() => history.goBack()}
                >
                    Назад
                </Button>

                <Link
                    color="inherit"
                    component={NavLink}
                    to="/"
                    underline="none">
                    <Typography color="primary" variant="h5">
                        {channelName}
                    </Typography>
                </Link>

                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </Box>
            {getSubheaderTitle() && (
                <Grid container spacing={1} direction="row" className={classes.subheader}>
                    <Grid item>
                        <Typography color="inherit" variant="h6" component="p">
                            {getSubheaderTitle()}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Button color="primary" variant="contained" className={classNames(classes.btn)}
                                onClick={handleActionAccept}>
                            Принять
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button color="secondary" variant="contained" className={classNames(classes.btn)}
                                onClick={handleActionReject}>
                            Отклонить
                        </Button>
                    </Grid>
                </Grid>
            )}

            <Divider light/>
            <Box className={classes.body}>
                <ScrollableFeed>
                    {allMessages.map((message) => (
                        <Messages
                            key={message.id}
                            values={message.data}
                            msgId={message.id}
                            user={user}
                            userData={userData}
                        />
                    ))}
                </ScrollableFeed>
            </Box>
            <Box className={classes.footer}>
                <input
                    accept="image/*"
                    className={classes.inputFile}
                    id="icon-button-file"
                    type="file"
                    onChange={(e) => handleFileUpload(e)}
                />
                <label htmlFor="icon-button-file">
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                    >
                        <RiImageAddLine style={{color: "#b9bbbe"}}/>
                    </IconButton>
                </label>

                <form
                    autoComplete="off"
                    style={{width: "100%", display: "flex", margin: 0}}
                    onSubmit={(e) => sendMsg(e)}
                    onKeyDown={(e) => handleKeyDown(e)}>

                    <TextField
                        className={classes.message}
                        required
                        id="outlined-basic"
                        label="Введите сообщение"
                        variant="outlined"
                        multiline
                        rows={1}
                        rowsMax={6}
                        value={userNewMsg}
                        onChange={(e) => {
                            setUserNewMsg(e.target.value);
                        }}
                    />
                    <IconButton type="submit" component="button">
                        <FiSend style={{color: "#b9bbbe"}}/>
                    </IconButton>
                </form>
            </Box>
        </Paper>
    );
}

export default Dialog;