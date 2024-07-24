import {Box, Typography} from "@mui/material";
import React from "react";
import {styled} from "@mui/system";

const HeaderBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(4),
}));

const VerticalTitle = ({ title }) => {
    return (
        <HeaderBox>
            <Typography variant="h4" component="h2" sx={{ whiteSpace: 'nowrap', mt: 5, fontWeight: 'bold' }}>
                {title}
            </Typography>
        </HeaderBox>
    );
}

export default VerticalTitle;