import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import {firestore} from "../../firebase";
import {useHistory} from "react-router-dom";
import {Box} from "@material-ui/core";
import PropTypes from "prop-types";
import CardHeader from "../../components/Card/CardHeader";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        marginTop: theme.spacing(12),
    },
    heading: {
        fontSize: "2.2em",
        fontWeight: "700",
    },
    subHeading: {
        fontSize: "1.6em",
    },
    channelDiv: {
        padding: "15px",
    },
    channelContent: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        padding: "20px",
        alignItems: "center",
    },
    square: {
        height: "80px",
        width: "80px",
        backgroundColor: "#8fabbd66",
        borderRadius: "50%",
        fontSize: "2rem",
    },
    rootChannel: {
        height: "calc(100vh - 185px)",
        position: "relative",
        padding: "15px",
        overflowY: "scroll",
    },
    channelText: {
        paddingTop: theme.spacing(2),
        fontSize: "1.2rem",
    },
    channelCard: {},
}));

function Dialogs() {
    const classes = useStyles();
    const [channels, setChannels] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = firestore.collection("channels")
            .orderBy("channelName", "asc")
            .onSnapshot((snapshot) => {
                setChannels(
                    snapshot.docs.map((channel) => ({
                        channelName: channel.data().channelName,
                        id: channel.id,
                    }))
                );
            });
        return () => unsubscribe();
    }, []);

    const goToChannel = (id) => {
        history.push(`/dialog/${id}`);
    };

    return (
        <Grid item container xs={12} sm={12} md={10} lg={8} className={classes.root}>
            <Card>
                <CardHeader color="success">
                    <Typography color="initial" variant="h4" component="h4" align="left">
                        Ваши беседы
                    </Typography>
                </CardHeader>
                <Box>
                    <Grid container className={classes.rootChannel}>
                        {channels.map((channel) => (
                            <Grid
                                item
                                xs={6}
                                md={3}
                                className={classes.channelDiv}
                                key={channel.id}
                            >
                                <Card className={classes.channelCard}>
                                    <CardActionArea
                                        style={{display: "flex"}}
                                        onClick={() => goToChannel(channel.id)}
                                    >
                                        <CardContent className={classes.channelContent}>
                                            <Avatar
                                                variant="square"
                                                className={classes.square}
                                                style={{backgroundColor: "#6a9ec066"}}
                                            >
                                                {channel.channelName.substr(0, 1).toUpperCase()}
                                            </Avatar>
                                            <Typography className={classes.channelText}>
                                                {channel.channelName}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Card>
        </Grid>
    );
}

Dialogs.propTypes = {
    // Custom Properties
    theme: PropTypes.object.isRequired,

    // Custom Functions
    openSnackbar: PropTypes.func.isRequired,
};
export default Dialogs;
