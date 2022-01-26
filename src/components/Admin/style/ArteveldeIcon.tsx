import * as React from 'react';
import Box from '@mui/material/Box';
import { createSvgIcon } from '@mui/material/utils';


const Icon = createSvgIcon(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73.5 73.52">
        <path d="M132.71 119.31a36.76 36.76 0 0 0 0 73.52h36.75v-36.76a36.75 36.75 0 0 0-36.75-36.76m12.25 49h-12.25A12.25 12.25 0 1 1 145 156.07Z" transform="translate(-95.96 -119.31)"/>
        </svg>
    ,'Artevelde',
);

export default function ArteveldeIcon() {
  return (
    <Box
            sx={{
                '& > :not(style)': {
                    color: '#FFF',
                    paddingTop: 1,
                    mr: 1
                },
            }}
        >
            <Icon />
        </Box>
  );
}