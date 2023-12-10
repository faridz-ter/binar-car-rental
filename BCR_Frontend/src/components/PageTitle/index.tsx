import { FC } from "react";
import PropTypes from "prop-types";
import { Typography, Box, Grid } from "@mui/material";
import { ReactNode } from 'react';

interface PageTitleProps {
  heading?: string;
  subHeading?: string;
  docs?: string;
  actionElement?: ReactNode;
}

const PageTitle: FC<PageTitleProps> = ({
  heading = "",
  subHeading = "",
  docs = "",
  actionElement,
  ...rest
}) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      {...rest}
    >
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {heading}
        </Typography>
        <Typography variant="subtitle2">{subHeading}</Typography>
      </Grid>
      <Grid item>
        <Box>{actionElement}</Box>
      </Grid>
    </Grid>
  );
};

PageTitle.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  docs: PropTypes.string,
};

export default PageTitle;
