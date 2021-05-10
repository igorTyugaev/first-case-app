import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

const roles = [
    {
        img: require("illustrations/student.svg"),
        title: "Студент",
        label: "Student",
        txtBtn: "Найти наставника",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n" +
            "ducimus eum facilis hic illo inventore magni nemo officiis porro, quos repellendus unde",
    },

    {
        img: require("illustrations/teaching.svg"),
        title: "Ментор",
        label: "Mentor",
        txtBtn: "Взять заказ",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n" +
            "ducimus eum facilis hic illo inventore magni nemo officiis porro, quos repellendus unde",
    },

    {
        img: require("illustrations/business_deal.svg"),
        title: "Заказчик",
        label: "Customer",
        txtBtn: "Опубликовать заказ",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n" +
            "ducimus eum facilis hic illo inventore magni nemo officiis porro, quos repellendus unde",
    }
]

function RoleCard({role, handleFormNext, setRoleForm}) {
    const classes = useStyles();

    const handleClick = (event) => {
        if (!event) {
            return;
        }

        handleFormNext();
        setRoleForm(roles[role].label)
    };

    return (
        <Card className={classes.root}>

            <CardMedia
                component="img"
                height="140"
                image={roles[role].img}
                alt={roles[role].title}
                title={roles[role].title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2" align="center">
                    {roles[role].title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {roles[role].description}
                </Typography>
            </CardContent>

            <CardActions>
                <Button color="primary" variant="contained" fullWidth onClick={handleClick}>
                    {roles[role].txtBtn}
                </Button>
            </CardActions>

        </Card>
    );
}

RoleCard.propTypes = {
    role: PropTypes.number.isRequired,
    handleFormNext: PropTypes.func.isRequired,
    setRoleForm: PropTypes.func.isRequired,
}

export default RoleCard;
