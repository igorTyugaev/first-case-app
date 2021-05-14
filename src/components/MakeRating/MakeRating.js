import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export default function MakeRating() {
    const [makeValue, setMakeValue] = React.useState(4);
    return (
        <div style={{padding: "25px"}}>
            <div>
                <Typography component="legend">Рейтинг</Typography>
                <Rating name="simple-controlled" value={makeValue} onChange={(event, newValue) => {
                                        setMakeValue(newValue);
                                    }
                                }/>
            </div>
        </div>
    );
};


