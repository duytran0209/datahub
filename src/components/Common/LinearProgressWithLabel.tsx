import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number; total?: number }
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          value={props.total ? (props.value / props.total) * 100 : props.value}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        {!props.total && (
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        )}
        {props.total && (
          <Typography
            variant="body2"
            color="text.secondary"
          >{`${props.value}/${props.total}`}</Typography>
        )}
      </Box>
    </Box>
  );
}
