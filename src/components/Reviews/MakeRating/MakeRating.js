import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

export default function MakeRating(props) {
    const {disabled, value, onChange, readOnly} = props;

    const StyledRating = withStyles({
        iconFilled: {
            color: '#ff6d75',
        },
        iconHover: {
            color: '#ff3d47',
        },
    })(Rating);

    return (
        <div style={{padding: "25px"}}>
            <div>
                <Typography component="legend">Рейтинг</Typography>
                <StyledRating
                    name="simple-controlled"
                    value={+value}
                    onChange={onChange}
                    size="large"
                    // disabled={disabled}
                />
            </div>
        </div>
    );
};


