import { Breadcrumbs, Typography } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { styled } from "@mui/system";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",

  "&:hover": {
    textDecoration: "underline",
    color: "#ccc",
    fontWeight: "bold",
  },

  "&:active": {
    color: "#8B8B8B",
  },
}));

const StyledBreadcrumbTitle = styled(Typography)(({ theme }) => ({
  color: "#8B8B8B",
  border: "1px solid #ddd",
  padding: "4px 8px",
  borderRadius: "8px",

  "&.active": {
    color: "#918c8c",
    fontWeight: "bold",
    border: "1px solid #282828",
  },
}));

const BreadcrumbsComponent = ({ breadcrumbs }) => {
  const location = useLocation();

  return (
    <Breadcrumbs aria-label="breadcrumb" separator="›">
      {breadcrumbs.map((breadcrumb, index) => {
        const isActive = location.pathname === breadcrumb.path;
        return (
          <StyledNavLink
            key={index}
            to={breadcrumb.path}
            aria-current={isActive ? "page" : undefined}
          >
            <StyledBreadcrumbTitle className={isActive ? "active" : ""}>
              {breadcrumb.title}
            </StyledBreadcrumbTitle>
          </StyledNavLink>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;
