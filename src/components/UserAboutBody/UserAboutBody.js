import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/userAboutBody";

const useStyles = makeStyles(styles);


export default function UserAboutBody(props) {
    const classes = useStyles();
    const {...rest} = props;

    return (
        <div>
            <h3 className={classes.titleDescription}>О себе</h3>
            <div className={classes.description}>
                <p>Участник семинаров и вебинаров компании PROFI.RU:</p>
                <ul>
                    <li>
                        «Успешная первая встреча с учеником – основа долговременных плодотворных занятий»;
                    </li>
                    <li>
                        «Экспресс-подготовка к ЕГЭ по английскому языку»;
                    </li>
                    <li>
                        «Полная и эффективная подготовка к ЕГЭ по английскому языку».
                    </li>
                </ul>
            </div>

            <h3 className={classes.titleDescription}>Образование</h3>
            <div className={classes.description}>
                <ul>
                    <li>МГУ им. М.В. Ломоносова, филологический факультет, специальность – филолог,
                        преподаватель
                        английского и французского языков (1992 г.)
                    </li>
                </ul>
            </div>

            <h3 className={classes.titleDescription}>Опыт</h3>
            <div className={classes.description}>
                <ul>
                    <li>Репетиторская деятельностьс 1995 г. (26 лет)</li>
                    <li>Педагогический стаж (преподавал английский язык на филфаке МГУ; курсы английского языка,
                        курсы IELTS и TOEFL, GRE, GMAT)с 1998 г. (23 года)
                    </li>
                    <li>На сервисе с февраля 2011 г. (10 лет)</li>
                </ul>
            </div>

            <h3 className={classes.titleDescription}>Услуги и цены</h3>
            <div className={classes.description}>
                <ul>
                    <li> Английский язык 2000 ₽ / 60 мин.</li>
                    <li> IELTS 2000 ₽ / 60 мин.</li>
                    <li> TOEFL 2000 ₽ / 60 мин.</li>
                    <li> Международные экзамены по английскому 2000 ₽ / 60 мин.</li>
                    <li> Разговорный английский язык 2000 ₽ / 60 мин.</li>
                </ul>
            </div>
        </div>
    );
}
