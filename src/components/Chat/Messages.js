import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import {deepPurple} from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import {AiFillLike} from "react-icons/ai";
import {AiFillFire} from "react-icons/ai";
import {AiFillHeart} from "react-icons/ai";
import {AiFillDelete} from "react-icons/ai";
import {firestore} from "../../firebase";
import {NavLink, useParams} from "react-router-dom";
import DeleteModal from "./DeleteModal";
import {Anchorme} from "react-anchorme";
import {Link} from "@material-ui/core";
import UserAvatar from "../UserAvatar/UserAvatar";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        width: "100%",
    },
    paperSent: {
        display: "flex",
        alignItems: "center",
        color: "black",
        borderRadius: theme.spacing(1),
        padding: theme.spacing(1.4),
        width: "100%",

        "&:hover": {
            background: "#e5e5ea",
        }
    },

    paperReceived: {
        display: "flex",
        alignItems: "center",
        color: "black",
        borderRadius: theme.spacing(1),
        padding: theme.spacing(1.5),
        width: "100%",

        "&:hover": {
            background: "#e5e5ea",
        }
    },
    avatar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    message: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: "1rem",
    },
    chatHeading: {
        marginBlockStart: 0,
        marginBlockEnd: 0,
        display: "inline-block",
        fontSize: "1rem",
        fontWeight: "600",
        maxWidth: "40vw",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        paddingRight: "0.5em",
    },
    chatTimming: {
        marginBlockStart: 0,
        marginBlockEnd: 0,
        display: "inline-block",
    },
    chatText: {
        wordBreak: "break-all",
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: "#3f51b5",
    },
    emojiDiv: {
        position: "absolute",
        right: 0,
        top: 0,
    },
    emojiDivInner: {
        position: "absolute",
        right: 0,
        padding: "0 35px 0 32px",
    },
    emojiBtn: {
        fontSize: "1.1rem",
        color: "rgb(255 195 54)",
    },
    allEmoji: {
        backgroundColor: "#2d2e31ba",
        borderRadius: "5px",
        paddingLeft: "2px",
        paddingRight: "2px",
        display: "flex",
    },
    countEmojiBtn: {
        padding: "3px",
        borderRadius: "4px",
        fontSize: "0.8em",
        backgroundColor: "#ffffff4a",
        color: "#cacaca",
        paddingLeft: "5px",
        paddingRight: "5px",
        "&:hover": {
            backgroundColor: "#ffffff4a",
            color: "#e7e7e7",
        },
    },
}));

function Messages(props) {
    const [style, setStyle] = useState({display: "none"});
    const [deleteModal, setDeleteModal] = useState(false);
    const classes = useStyles();

    const {values, msgId, user, userData} = props;

    const senderUid = user.uid;
    const messegerUid = values.uid;
    const date = values.timestamp.toDate();
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const time = `${day}/${month}/${year}   ${hour}:${minute}`;

    const numLikes = values.likeCount;
    const numFire = values.fireCount;
    const numHeart = values.heartCount;

    const userLiked = values.likes[senderUid];
    const userFire = values.fire[senderUid];
    const userHeart = values.heart[senderUid];

    const postImg = values.postImg;

    const channelId = useParams().id;

    const selectedLike = userLiked
        ? {color: "#8ff879", backgroundColor: "#545454"}
        : null;

    const selectedHeart = userHeart
        ? {color: "#ff527d", backgroundColor: "#545454"}
        : null;

    const selectedFire = userFire
        ? {color: "#ffc336", backgroundColor: "#545454"}
        : null;

    const showDeleteModal = () => {
        setDeleteModal(!deleteModal);
    };

    const heartClick = () => {
        const messageDoc = firestore
            .collection("channels")
            .doc(channelId)
            .collection("messages")
            .doc(msgId);
        if (userHeart) {
            return firestore
                .runTransaction((transaction) => {
                    // This code may get re-run multiple times if there are conflicts.
                    return transaction.get(messageDoc).then((doc) => {
                        if (!doc) {
                            console.log("doc not found");
                            return;
                        }

                        let newHeartCount = doc.data().heartCount - 1;
                        let newHeart = doc.data().heart ? doc.data().heart : {};
                        newHeart[senderUid] = false;

                        transaction.update(messageDoc, {
                            heartCount: newHeartCount,
                            heart: newHeart,
                        });
                    });
                })
                .then(() => {
                    console.log("Disiked");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            return firestore
                .runTransaction((transaction) => {
                    // This code may get re-run multiple times if there are conflicts.
                    return transaction.get(messageDoc).then((doc) => {
                        if (!doc) {
                            console.log("doc not found");
                            return;
                        }

                        let newHeartCount = doc.data().heartCount + 1;
                        let newHeart = doc.data().heart ? doc.data().heart : {};
                        newHeart[senderUid] = true;

                        transaction.update(messageDoc, {
                            heartCount: newHeartCount,
                            heart: newHeart,
                        });
                    });
                })
                .then(() => {
                    console.log("Liked");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const fireClick = () => {
        const messageDoc = firestore
            .collection("channels")
            .doc(channelId)
            .collection("messages")
            .doc(msgId);
        if (userFire) {
            return firestore
                .runTransaction((transaction) => {
                    // This code may get re-run multiple times if there are conflicts.
                    return transaction.get(messageDoc).then((doc) => {
                        if (!doc) {
                            console.log("doc not found");
                            return;
                        }

                        let newFireCount = doc.data().fireCount - 1;
                        let newFire = doc.data().fire ? doc.data().fire : {};
                        newFire[senderUid] = false;

                        transaction.update(messageDoc, {
                            fireCount: newFireCount,
                            fire: newFire,
                        });
                    });
                })
                .then(() => {
                    console.log("Disiked");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            return firestore
                .runTransaction((transaction) => {
                    // This code may get re-run multiple times if there are conflicts.
                    return transaction.get(messageDoc).then((doc) => {
                        if (!doc) {
                            console.log("doc not found");
                            return;
                        }

                        let newFireCount = doc.data().fireCount + 1;
                        let newFire = doc.data().fire ? doc.data().fire : {};
                        newFire[senderUid] = true;

                        transaction.update(messageDoc, {
                            fireCount: newFireCount,
                            fire: newFire,
                        });
                    });
                })
                .then(() => {
                    console.log("Liked");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const likeClick = () => {
        const messageDoc = firestore
            .collection("channels")
            .doc(channelId)
            .collection("messages")
            .doc(msgId);
        if (userLiked) {
            return firestore
                .runTransaction((transaction) => {
                    // This code may get re-run multiple times if there are conflicts.
                    return transaction.get(messageDoc).then((doc) => {
                        if (!doc) {
                            console.log("doc not found");
                            return;
                        }

                        let newLikeCount = doc.data().likeCount - 1;
                        let newLikes = doc.data().likes ? doc.data().likes : {};
                        newLikes[senderUid] = false;

                        transaction.update(messageDoc, {
                            likeCount: newLikeCount,
                            likes: newLikes,
                        });
                    });
                })
                .then(() => {
                    console.log("Disiked");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            return firestore
                .runTransaction((transaction) => {
                    // This code may get re-run multiple times if there are conflicts.
                    return transaction.get(messageDoc).then((doc) => {
                        if (!doc) {
                            console.log("doc not found");
                            return;
                        }

                        let newLikeCount = doc.data().likeCount + 1;
                        let newLikes = doc.data().likes ? doc.data().likes : {};
                        newLikes[senderUid] = true;

                        transaction.update(messageDoc, {
                            likeCount: newLikeCount,
                            likes: newLikes,
                        });
                    });
                })
                .then(() => {
                    console.log("Liked");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const deleteMsg = (id) => {
        firestore.collection("channels")
            .doc(channelId)
            .collection("messages")
            .doc(id)
            .delete()
            .then((res) => {
                console.log("deleted successfully");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const messageClass = messegerUid === senderUid ? classes.paperSent : classes.paperReceived;

    return (
        <div className={classes.root}>
            {deleteModal ? (
                <DeleteModal
                    msgId={msgId}
                    text={values.text}
                    postImg={postImg}
                    deleteMsg={deleteMsg}
                    handleModal={showDeleteModal}
                />
            ) : null}
            <div
                // className={classes.paper}
                className={messageClass}
                onMouseEnter={(e) => {
                    setStyle({display: "block"});
                }}
                onMouseLeave={(e) => {
                    setStyle({display: "none"});
                }}
            >
                <div className={classes.avatar}>
                    <IconButton
                        color="inherit"
                        component={NavLink} to={`/user/${messegerUid}`}
                    >
                        <Avatar
                            alt={values.userName}
                            src={values.userImg}
                            className={classes.purple}
                        />
                    </IconButton>
                </div>

                <div className={classes.message}>
                    <Grid item container direction="row">
                        <h6 className={classes.chatHeading}>
                            <Link
                                color="inherit"
                                component={NavLink}
                                to={`/user/${messegerUid}`}
                                underline="none"
                            >
                                {values.userName}
                            </Link>
                        </h6>
                        <p className={classes.chatTimming}>{time}</p>
                    </Grid>

                    <div className={classes.chatText}>
                        {values.text.split("\n").map((txt, idx) => (
                            <p key={idx}>
                                <Anchorme target="_blank" rel="noreferrer noopener">
                                    {txt}
                                </Anchorme>
                            </p>
                        ))}
                    </div>

                    <Grid item xs={12} md={12} style={{paddingTop: "5px"}}>
                        {postImg ? (
                            <img
                                src={postImg}
                                alt="user"
                                style={{height: "30vh", width: "auto", borderRadius: "4px"}}
                            />
                        ) : null}
                    </Grid>

                    <div style={{paddingTop: "5px", display: "flex"}}>
                        {numLikes > 0 ? (
                            <div style={{padding: "3px"}}>
                                <IconButton
                                    component="span"
                                    onClick={likeClick}
                                    className={classes.countEmojiBtn}
                                    style={selectedLike}
                                >
                                    <AiFillLike/>
                                    <div style={{paddingLeft: "2px"}}>{numLikes}</div>
                                </IconButton>
                            </div>
                        ) : null}

                        {numFire > 0 ? (
                            <div style={{padding: "3px"}}>
                                <IconButton
                                    component="span"
                                    onClick={fireClick}
                                    className={classes.countEmojiBtn}
                                    style={selectedFire}
                                >
                                    <AiFillFire/>
                                    <div style={{paddingLeft: "2px"}}>{numFire}</div>
                                </IconButton>
                            </div>
                        ) : null}

                        {numHeart > 0 ? (
                            <div style={{padding: "3px"}}>
                                <IconButton
                                    component="span"
                                    onClick={heartClick}
                                    className={classes.countEmojiBtn}
                                    style={selectedHeart}
                                >
                                    <AiFillHeart/>
                                    <div style={{paddingLeft: "2px"}}>{numHeart}</div>
                                </IconButton>
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className={classes.emojiDiv} style={style}>
                    <div className={classes.emojiDivInner}>
                        <div className={classes.allEmoji}>
                            <IconButton
                                component="span"
                                style={{padding: "4px"}}
                                onClick={likeClick}
                            >
                                <AiFillLike className={classes.emojiBtn}/>
                            </IconButton>
                            <IconButton
                                component="span"
                                style={{padding: "4px"}}
                                onClick={fireClick}
                            >
                                <AiFillFire className={classes.emojiBtn}/>
                            </IconButton>
                            <IconButton
                                component="span"
                                style={{padding: "4px"}}
                                onClick={heartClick}
                            >
                                <AiFillHeart className={classes.emojiBtn}/>
                            </IconButton>
                            {senderUid === messegerUid ? (
                                <IconButton
                                    component="span"
                                    style={{padding: "4px"}}
                                    onClick={showDeleteModal}
                                >
                                    <AiFillDelete
                                        className={classes.emojiBtn}
                                        color="#c3c3c3f0"
                                    />
                                </IconButton>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Messages;
