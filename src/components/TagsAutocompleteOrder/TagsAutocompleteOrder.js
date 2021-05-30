import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import orders from "../../services/orders";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
}));

export default function TagsAutocompleteOrder({handleChange}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Autocomplete
                multiple
                id="tags-standard"
                options={topTags}
                getOptionLabel={(option) => option}
                onChange={(event, value) => handleChange(value, "tags")}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        placeholder="python"
                    />
                )}
            />
        </div>
    );
}

const topTags = [
    'react',
    'javascript',
    'python',
    'vue',
    'postgres',
    'kotlin',
    'swift',
    'frontend',
    'backend',
    'django',
    'php',
    'css',
    'joomla',
    'wordpress',
    'bitrix',
    'photoshop',
    'illustrator',
    'java',
    'coreldraw',
    'api telegram',
    'flask',
    'jquery',
    'vanilla js',
    'flutter',
    'git',
    'mysql',
];
