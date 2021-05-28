import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import AddIcon from "@material-ui/icons/Add";
import {firestore} from "../../firebase";
import {useHistory} from "react-router-dom";
import {IoMdChatboxes} from "react-icons/io";
import {BiHash} from "react-icons/bi";
import CreateRoom from "./CreateRoom";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: "#c4c4c4",
        margin: "0 auto",
        marginTop: theme.spacing(8),
    },

    nested: {
        paddingLeft: theme.spacing(4),
    },
    iconDesign: {
        fontSize: "1.5em",
    },
    primary: {},
}));

function DialogBar(props) {
    // Styling
    const classes = useStyles();

    // Custom Properties
    const {theme} = props;
    const {user} = props;

    const [open, setOpen] = React.useState(true);
    const [channelList, setChannelList] = useState([]);
    const [showCreateRoom, setShowCreateRoom] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = firestore.collection("channels")
            .orderBy("channelName", "asc")
            .onSnapshot((snapshot) => {
                setChannelList(
                    snapshot.docs.map((channel) => ({
                        channelName: channel.data().channelName,
                        id: channel.id,
                    }))
                );
            });
        return () => unsubscribe();
    }, []);

    const handleClick = () => {
        setOpen(!open);
    };

    const goToChannel = (id) => {
        history.push(`/dialog/${id}`);
    };

    return (
        <List component="nav">
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <IoMdChatboxes className={classes.iconDesign}/>
                </ListItemIcon>
                <ListItemText primary="Диалоги"/>
                {open ? (
                    <ExpandLess className={classes.primary}/>
                ) : (
                    <ExpandMore className={classes.primary}/>
                )}
            </ListItem>

            <Collapse in={open} timeout="auto">
                <List component="div" disablePadding>
                    {channelList.map((channel) => (
                        <ListItem
                            key={channel.id}
                            button
                            className={classes.nested}
                            onClick={() => goToChannel(channel.id)}
                        >
                            <ListItemIcon style={{minWidth: "30px"}}>
                                <BiHash
                                    className={classes.iconDesign}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={channel.channelName}
                            />
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </List>
    );
}

export default DialogBar;
