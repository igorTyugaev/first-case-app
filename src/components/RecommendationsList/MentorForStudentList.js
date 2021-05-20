import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/executors.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import classNames from "classnames";
import List from "@material-ui/core/List";


import {v4 as uuid} from 'uuid';
import moment from 'moment';
import {
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText
} from '@material-ui/core';
import profile from "../../assets/img/faces/christian.jpg";
import MentorItem from "../Items/MentorItem";

const mentors = [
    {
        id: uuid(),
        name: 'Многопоточный парсер данных',
        imageUrl: {profile},
        message:
            "Парсер позволяет собирать: ссылки, населенный пункт, заголовок, описание, имя продавца и стоимость. Собираются данные организаций и юридических лиц. \n" +
            "Для многопоточной работы программы необходимо отдельно приобрести прокси: IP4 прокси (https или socks) \n" +
            "Для разгадывания капчи нужен ключ от сервиса распознавания. Поддерживается Рукапча."
    },
    {
        id: uuid(),
        name: 'Medium Corporation',
        imageUrl: "../../assets/img/faces/christian.jpg",
        message: "moment().subtract(2, 'hours')"
    },
    {
        id: uuid(),
        name: 'Slack',
        imageUrl: '/static/images/mentors/product_3.png',
        message: "moment().subtract(3, 'hours')"
    },
    {
        id: uuid(),
        name: 'Lyft',
        imageUrl: '/static/images/mentors/product_4.png',
        message: "moment().subtract(5, 'hours')"
    },
    {
        id: uuid(),
        name: 'GitHub',
        imageUrl: '/static/images/mentors/product_5.png',
        message: "moment().subtract(9, 'hours')"
    }
];


const dashboardRoutes = [];
const useStyles = makeStyles(styles);


export default function MentorForStudentList(props) {
    const classes = useStyles();
    const {...rest} = props;

    return (
        <GridItem xs={12} sm={12} md={10} lg={8} className={classNames(classes.inner)}>
            <Card>
                <CardHeader color="success">
                    <h4 className={classes.cardTitleWhite}>Выберите наставника</h4>
                    <p className={classes.cardCategoryWhite}>
                        Выберите подходящего для вас наставника и нажмите "ПРИНЯТЬ"
                    </p>
                </CardHeader>
                <List>
                    {mentors.map((mentor, i) => (
                        <ListItem
                            divider={i < mentors.length - 1}
                            key={mentor.id}>
                            <MentorItem mentor={mentor}/>
                        </ListItem>
                    ))}
                </List>
            </Card>
        </GridItem>
    );
}

