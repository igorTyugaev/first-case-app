import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

export default function ProfileRating() {
    const [value, setValue] = React.useState(4);

    return (
        <div>
            <Typography component="legend">Рейтинг</Typography>
            <Rating name="read-only" value={value} readOnly/>
        </div>
    );
}