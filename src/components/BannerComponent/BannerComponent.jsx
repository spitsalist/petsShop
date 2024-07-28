import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { Banner, BannerText, BannerButton } from "./BannerStyles";

const BannerComponent = () => {
  return (
    <Banner sx={{ margin: "0 -40px" }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
          justifyContent: "center",
          height: "100%",
        }}
      >
        <BannerText variant="h1">Amazing Discounts</BannerText>
        <BannerText variant="h1">on Pets Products!</BannerText>
        <Link to="/sales/all">
          <BannerButton variant="contained">Check out</BannerButton>
        </Link>
      </Container>
    </Banner>
  );
};

export default BannerComponent;