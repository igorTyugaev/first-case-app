import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

export default function MakeRating(props) {
    const {disabled, value, onChange} = props;
    return (
        <div style={{padding: "25px"}}>
            <div>
                <Typography component="legend">Рейтинг</Typography>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />
            </div>
        </div>
    );
};


