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
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
});

const roles = [
    {
        img: require("illustrations/student.svg"),
        title: "Студент",
        label: "Student",
        txtBtn: "Найти наставника",
        description:
            "Выберете профиль студента, если вы хотите найти опытного наставника,\n" +
            "который научит Вас тому, чего Вы желаете, а так же покажет как работать с \n" +
            "настоящей задачей и живым заказчиком. ",
    },

    {
        img: require("illustrations/teaching.svg"),
        title: "Ментор",
        label: "Mentor",
        txtBtn: "Найти студента",
        description:
            "Выберете профиль Наставника, если вы хотите найти желающих получать\n" +
            "знания студентов, а также интересные заказы, которыми Вы сможете пополнять\n" +
            "своё портфолио.",
    },

    {
        img: require("illustrations/business_deal.svg"),
        title: "Заказчик",
        label: "Customer",
        txtBtn: "Создать заказ",
        description:
            "Выберете профиль заказчика, если вы хотите разместить задачу, которую\n" +
            "решит студент, под опытным наблюдением наставника.",
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
