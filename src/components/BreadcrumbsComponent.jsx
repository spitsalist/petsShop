import {Breadcrumbs, Link} from "@mui/material";
import React from "react";
import {NavLink} from "react-router-dom";

const BreadcrumbsComponent = ({ breadcrumbs }) => {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            {breadcrumbs.map((breadcrumb, index) => {
                 return (
                    <NavLink key={index} color="textPrimary" aria-current="page" to={breadcrumb.path}>
                        {breadcrumb.title}
                    </NavLink>
                );

            })}
        </Breadcrumbs>
    );
}

export default BreadcrumbsComponent;