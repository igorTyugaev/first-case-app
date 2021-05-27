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
import {Box, Divider, Link, Paper, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

import {
    ArrowBackIos as BackIcon,
} from "@material-ui/icons";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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
    const [userNewMsg, setUserNewMsg] = useState("");
    const [modalState, setModalState] = useState(false);
    const [file, setFileName] = useState(null);

    const {user, userData} = props;
    const history = useHistory();

    useEffect(() => {
        if (params.id) {
            firestore.collection("channels")
                .doc(params.id)
                .onSnapshot((snapshot) => {
                    if (snapshot && snapshot.data() && snapshot.data().channelName)
                        setChannelName(snapshot.data().channelName);
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

    const handelFileUpload = (e) => {
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
                    onChange={(e) => handelFileUpload(e)}
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
