import {Typography, Box, Divider, styled, Button} from "@mui/material"
import { NavLink } from "react-router-dom"



const StyledNavLink = styled(NavLink)(({ theme }) => ({
    color: 'rgba(40, 40, 40, 1)',
    textDecoration: 'none',
    '&:hover': {
        cursor: 'pointer',
    },
    [theme.breakpoints.up('xs')]: {
        color: 'rgba(40, 40, 40, 1)', 
        minWidth: '150px',
    },

}));

const StyledButton = styled(Button)(() => ({
    color: "rgba(139, 139, 139, 1)",
    borderColor: "rgba(139, 139, 139, 1)",
    borderRadius: "8px",
    padding: "8px 16px",
    maxWidth: 'max-content',
    textTransform: 'none',
    '&:hover': {
        color: "rgba(139, 139, 139, 1)",
    },
    '&:active': {
        transform: 'translateY(2px)',
    },
}))

const TitleDivider = ({title, buttonTitle, buttonPath}) => {
    return (
<Box sx={{display: "flex", flexDirection: "row", padding: '20px 0', alignItems: "center", marginTop: '80px', justifyContent:'space-between' }}>
    <Typography variant='h5' sx={(theme) => ({
        fontWeight: "bold",
        flexWrap: 'nowrap',
        display: 'flex',
        paddingRight: '30px',
        minWidth: {xs: '20px', md: '30px'},
        [theme.breakpoints.up('xs')]: {
            minWidth: '20px',
        },
        [theme.breakpoints.up('md')]: {
            minWidth: '30px',
        }
    })}>
        {title}
    </Typography>
    <Divider sx={{color: 'rgba(221, 221, 221, 1)',
        height: '2px',
        flexGrow: 1,
        borderColor: 'rgba(221, 221, 221, 1)',
    }}/>
    <StyledNavLink to={buttonPath}>
        <StyledButton variant="outlined" to={buttonPath}>{buttonTitle}</StyledButton>
    </StyledNavLink>
</Box>
    )
}

export default TitleDivider