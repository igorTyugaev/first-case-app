import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            marginTop: theme.spacing(0.5),
            marginBottom: theme.spacing(0.5),
        },
    },

    chip: {
        margin: theme.spacing(0.5),
    },
}));

export default function Chips() {
    const classes = useStyles();

    const [chipData, setChipData] = React.useState([
        {key: 0, label: 'Angular'},
        {key: 1, label: 'jQuery'},
        {key: 2, label: 'Polymer'},
        {key: 3, label: 'React'},
        {key: 4, label: 'Vue.js'},
    ]);

    return (
        <List className={classes.root}>
            {chipData.map((data) => {
                return (
                    <li key={data.key}>
                        <Chip
                            avatar={<Avatar>{data.label.slice(0, 1)}</Avatar>}
                            label={data.label}
                            className={classes.chip}
                        />
                    </li>
                );
            })}
        </List>
    );
}

