import { Helmet } from "react-helmet-async";
import { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import PageTitle from "../../../../../components/PageTitle";
import PageTitleWrapper from "../../../../../components/PageTitleWrapper";
import Footer from "../../../../../components/Footer";

import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { CloudUpload } from "@mui/icons-material";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

import { VisuallyHiddenInput } from "./createForm.styled";
import useAction from "./createForm.hooks";

function Forms() {
  const {
    handleSubmit,
    handleUploadCover,
    setFormValues,
    handleOptionsFormChange,
    handleSpecsFormChange,
    addOptionFields,
    addSpecFields,
    formValues,
    loadingCover,
    loadingSubmit,
    fileItem,
    optionsInputFields,
    specsInputFields
  } = useAction();

  return (
    <>
      <Helmet>
        <title>Create - Binar Car Rental Admin</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Create New Car"
          subHeading="Components that are used to build interactive placeholders used for data collection from users."
          docs="/management/products"
          actionElement={
            <LoadingButton
              type="submit"
              variant="contained"
              loading={loadingSubmit}
              startIcon={<AddTwoToneIcon fontSize="small" />}
              onClick={handleSubmit}
            >
              Submit
            </LoadingButton>
          }
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Cars Details" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Box
                    sx={{
                      flex: "1",
                      "& .MuiTextField-root": { m: 1 },
                    }}
                  >
                    <TextField
                      id="outlined-helperText"
                      name="plate"
                      label="Plate"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          plate: e.target.value,
                        })
                      }
                      value={formValues?.plate}
                    />
                    <TextField
                      id="outlined-input"
                      name="manufacture"
                      label="Manufacture"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          manufacture: e.target.value,
                        })
                      }
                    />
                    <TextField
                      id="outlined-input"
                      name="model"
                      label="Model"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          model: e.target.value,
                        })
                      }
                    />
                    <TextField
                      id="outlined-input"
                      name="type"
                      label="Type"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          type: e.target.value,
                        })
                      }
                    />
                    <TextField
                      id="outlined-input"
                      name="description"
                      label="Description"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          description: e.target.value,
                        })
                      }
                    />
                    <TextField
                      id="outlined-input"
                      name="transmission"
                      label="Transmission"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          transmission: e.target.value,
                        })
                      }
                    />
                    <TextField
                      id="outlined-input"
                      name="capacity"
                      label="Capacity"
                      type="number"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          capacity: Number(e.target.value),
                        })
                      }
                    />
                    <TextField
                      id="outlined-input"
                      name="rentPerDay"
                      label="Rent /Day"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          rentPerDay: e.target.value,
                        })
                      }
                    />
                    <Box>
                      <div>AVailable At: </div>
                      <DateTimePicker
                        onChange={(newValue) =>
                          setFormValues({
                            ...formValues,
                            availableAt: newValue || "",
                          })
                        }
                      />
                    </Box>
                    <Box>
                      <Stack direction={"row"} alignItems={"center"}>
                        <div>AVailable</div>
                        <Switch
                          name="available"
                          title="Available"
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              available: e.target.checked,
                            })
                          }
                        />
                      </Stack>
                    </Box>
                    <TextField
                      id="outlined-input"
                      name="year"
                      label="Year"
                      type="number"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          year: Number(e.target.value),
                        })
                      }
                    />
                  </Box>
                  <Box
                    sx={{
                      flex: "1", // Adjusted to take up remaining space equally
                      alignItems: "center",
                      alignContent: "center",
                      "& .MuiTextField-root": { m: 1, width: "45%" },
                    }}
                  >
                    <Box>
                      {optionsInputFields.map((input, index) => {
                        return (
                          <div key={index}>
                            <TextField
                              id="outlined-input"
                              name="option"
                              label="Option"
                              size="small"
                              placeholder="Example Option"
                              value={input.option}
                              onChange={(e) =>
                                handleOptionsFormChange(index, e)
                              }
                            />
                          </div>
                        );
                      })}
                      <Stack direction={"row"} alignItems={"center"}>
                        <Button onClick={addOptionFields}>Add More..</Button>
                      </Stack>
                    </Box>
                    <Box>
                      {specsInputFields.map((input, index) => {
                        return (
                          <div key={index}>
                            <TextField
                              id="outlined-input"
                              name="spec"
                              label="Spec"
                              size="small"
                              placeholder="Example Spec"
                              value={input.spec}
                              onChange={(e) => handleSpecsFormChange(index, e)}
                            />
                          </div>
                        );
                      })}
                      <Stack direction={"row"} alignItems={"center"}>
                        <Button onClick={addSpecFields}>Add More..</Button>
                      </Stack>
                    </Box>
                    <LoadingButton
                      component="label"
                      variant="contained"
                      startIcon={<CloudUpload />}
                      sx={{ mb: 3 }}
                      loading={loadingCover}
                    >
                      Upload Book Cover
                      <VisuallyHiddenInput
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleUploadCover}
                      />
                    </LoadingButton>
                    {fileItem && fileItem.url && (
                      <Box>
                        <img
                          src={fileItem.secure_url}
                          alt="preview"
                          style={{ width: "100%", objectFit: "cover" }}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Forms;
