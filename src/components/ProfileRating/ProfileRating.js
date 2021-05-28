import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

export default function ProfileRating(props) {
    const {rating} = props;
    return (
        <div>
            <Typography component="legend">Рейтинг</Typography>
            <Rating name="read-only" value={+rating} readOnly/>
        </div>
    );
}