import { Container, Box, Typography, Grid, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper'}} component="footer">
      <Box maxWidth="lg">
        <Typography variant="h4" align="left" gutterBottom>
          Contact
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Phone
              </Typography>
              <Typography variant="h6">
                +49 30 915-88492
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Socials
              </Typography>
              <Box>
                <IconButton href="https://instagram.com">
                  <InstagramIcon />
                </IconButton>
                <IconButton href="https://whatsapp.com">
                  <WhatsAppIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Address
              </Typography>
              <Typography variant="h6">
                Wallstraße 9-13, 10179 Berlin, Deutschland
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Working Hours
              </Typography>
              <Typography variant="h6">
                24 hours a day
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.558090744685!2d13.401460215886247!3d52.511268079811474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c28e3a77b9%3A0x9d5eb344c0f3b1f4!2sWallstra%C3%9Fe%209-13%2C%2010179%20Berlin%2C%20Germany!5e0!3m2!1sen!2sus!4v1591054871324!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: 8 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Maps Location"
          ></iframe>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;