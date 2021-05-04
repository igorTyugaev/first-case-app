import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Card from "components/Card/Card.js";
import styles from './HomePage.styles'

const useStyles = makeStyles(styles)

function MainPage() {
    const classes = useStyles()

    return (
        <Grid item container xs={12} sm={12} md={10} lg={8} className={classes.root}>
            <Card>
                <Typography variant="h3" component="h3" gutterBottom>
                    Home Page
                </Typography>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum magnam modi quae saepe vel. Atque
                    beatae cupiditate enim id illum, iste magnam obcaecati quod sequi suscipit tempore veniam!
                    Aspernatur, velit?
                </p>
            </Card>
        </Grid>
    )
}

export default MainPage
