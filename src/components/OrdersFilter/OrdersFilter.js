import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';


const GreenCheckbox = withStyles({
        root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
    root: {
        width: "80%",
        margin:"16px auto",
        '& > * + *': {
        marginTop: theme.spacing(3),
        },
    },
    dflex: {
        display: 'flex',
        flexDirection: 'row',
    },
}));

export default function OrdersFilter() {

    const classes = useStyles();
    const [state, setState] = React.useState({
        checkedA: true,
    });
    const handleChangeChecked = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    return (
        <div className={classes.root}>
            <Autocomplete
                multiple
                id="tags-standard"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Теги"
                    placeholder="Выберите теги"
                />
                )}
            />
            <div className={classes.dflex}>  
                <InputLabel htmlFor="date">Срок до</InputLabel>
                <Input
                    id="date"
                />
                <InputLabel htmlFor="d">Стоимость от</InputLabel>
                <Input
                    id="d"
                />
                <InputLabel htmlFor="da">Стоимость до</InputLabel>
                <Input 
                    id="da"
                />    
            </div>    
            <FormControlLabel
                control={<GreenCheckbox checked={state.checkedA} onChange={handleChangeChecked} name="checkedA" />}
                label="Показать только мои специальности"
            />

        </div>
    );
    }

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
];