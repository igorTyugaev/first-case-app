import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/editProfile.js";
// core components
import Header from "../../components/Header/Header";
import HeaderLinksProfile from "../../components/Header/HeaderLinksProfile";
import classNames from "classnames";
import Footer from "../../components/Footer/Footer";
import StudentItem from "../../components/RecommendationsItem/StudentItem";
import {v4 as uuid} from "uuid";
import profile from "../../assets/img/faces/christian.jpg";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import List from "@material-ui/core/List";
import {ListItem} from "@material-ui/core";
import MentorItem from "../../components/RecommendationsItem/MentorItem";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

const students = [
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

export default function StudentList(props) {
    const classes = useStyles();
    const {...rest} = props;

    return (
        <GridItem xs={12} sm={12} md={10} lg={8} className={classNames(classes.inner)}>
            <Card>
                <CardHeader color="success">
                    <h4 className={classes.cardTitleWhite}>Выберите студента</h4>
                    <p className={classes.cardCategoryWhite}>
                        Выберите подходящего для вас наставника и нажмите "ПРИНЯТЬ"
                    </p>
                </CardHeader>
                <List>
                    {students.map((student, i) => (
                        <ListItem
                            divider={i < students.length - 1}
                            key={student.id}>
                            <StudentItem student={student}/>
                        </ListItem>
                    ))}
                </List>
            </Card>
        </GridItem>
    );
}