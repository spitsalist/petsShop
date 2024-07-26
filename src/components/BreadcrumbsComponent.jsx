import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from '@mui/system';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: 'none',

    '&:hover': {
        textDecoration: 'underline',
        color: '#8B8B8B',
    },

}));

const StyledBreadcrumbTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    color: '#8B8B8B',
    border: '1px solid #ddd',
    padding: '4px 8px',
    borderRadius: '8px',
}));

const BreadcrumbsComponent = ({ breadcrumbs }) => {
    return (
        <Breadcrumbs aria-label="breadcrumb" separator=""> 
            {breadcrumbs.map((breadcrumb, index) => {
                return (
                    <StyledNavLink key={index} to={breadcrumb.path} aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}> 
                        <StyledBreadcrumbTitle>
                            {breadcrumb.title}
                        </StyledBreadcrumbTitle>
                    </StyledNavLink>
                );
            })}
        </Breadcrumbs>
    );
}

export default BreadcrumbsComponent;