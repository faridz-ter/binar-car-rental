import { Typography, Button, Grid } from "@mui/material";
import { Link } from 'react-router-dom';

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

function PageHeader() {
  const user = {
    name: "Catherine Pike",
    avatar: "/static/images/avatars/1.jpg",
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Cars List
        </Typography>
        <Typography variant="subtitle2">
          These are list of Cars
        </Typography>
      </Grid>
      <Grid item>
        <Link to={"/form/create-form"}>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            Create Car
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
