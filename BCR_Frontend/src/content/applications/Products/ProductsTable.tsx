import { FC, ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import numeral from "numeral";
import PropTypes from "prop-types";
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  Stack,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Label from "../../../components/Label";
import { ICar } from "./products.types";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import BulkActions from "./BulkActions";
import { format, parseISO } from "date-fns";

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

interface ProductsTableProps {
  className?: string;
  cars: ICar[];
  handleEdit: (event: React.MouseEvent<HTMLButtonElement>, car: ICar) => void;
  handleRemove: (event: React.MouseEvent<HTMLButtonElement>, car: ICar) => void;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveMultiple: (
    event: React.MouseEvent<HTMLButtonElement>,
    carIds: number[]
  ) => void;
}

type BoolCarStatus = boolean;

interface Filters {
  status?: string;
}

const getStatusLabel = (boolCarStatus: BoolCarStatus): JSX.Element => {
  const map = {
    false: {
      text: "Unavailable",
      color: "error",
    },
    true: {
      text: "Available",
      color: "success",
    },
  };

  const { text, color }: any = map[boolCarStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (cars: ICar[], filters: Filters): ICar[] => {
  if (filters.status === "all") {
    return cars;
  }

  return cars.filter((car) => {
    const carStatus = car.available ? "available" : "unavailable";
    let matches = false;

    if (carStatus === filters.status) {
      matches = true;
    } else {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (cars: ICar[], page: number, limit: number): ICar[] => {
  return cars.slice(page * limit, page * limit + limit);
};

const ProductsTable: FC<ProductsTableProps> = ({
  cars,
  handleEdit,
  handleRemove,
  handleRemoveMultiple,
  handleSearch,
}) => {
  const navigate = useNavigate();
  const [selectedcars, setSelectedcars] = useState<number[]>([]);
  const selectedBulkActions = selectedcars.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({ status: "all" });

  console.log(cars);

  const statusOptions = [
    {
      id: "all",
      name: "All",
      value: "all",
    },
    {
      id: "available",
      name: "Available",
      value: "available",
    },
    {
      id: "unavailable",
      name: "Unavailable",
      value: "unavailable",
    },
  ];

  const handleStatusChange = (e: ChangeEvent<{ value: unknown }>): void => {
    const value = e.target.value;
    console.log("value >>>", value);
    const selectedOption = statusOptions.find((option) => option.id === value);

    if (selectedOption) {
      console.log("Selected Option:", selectedOption.value);
      setFilters((prevFilters) => ({
        ...prevFilters,
        status: selectedOption.value,
      }));
    } else {
      console.log("No matching option found for value:", selectedOption?.value);
    }
  };

  const handleSelectAllCars = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedcars(event.target.checked ? cars.map((car) => car.car_id) : []);
    console.log(selectedcars);
  };

  const handleSelectOnecar = (
    event: ChangeEvent<HTMLInputElement>,
    car_id: number
  ): void => {
    if (!selectedcars.includes(car_id)) {
      setSelectedcars((prevSelected) => [...prevSelected, car_id]);
    } else {
      setSelectedcars((prevSelected) =>
        prevSelected.filter((id) => id !== car_id)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredcars = applyFilters(cars, filters);
  const paginatedcars = applyPagination(filteredcars, page, limit);
  const selectedSomecars =
    selectedcars.length > 0 && selectedcars.length < cars.length;

  const selectedAllcars = selectedcars.length === cars.length;

  const theme = useTheme();

  return (
    <Card>
      <CardHeader
        action={
          <Box sx={{ width: "100%" }}>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{
                height: "100%",
              }}
              gap={1}
            >
              <TextField
                name="search"
                label="Search"
                placeholder="Search"
                onChange={handleSearch}
              />
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Box>
        }
        title="Cars List"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Manufacture Details</TableCell>
              <TableCell>Plate</TableCell>
              <TableCell>Available At</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Rent Rp/Day</TableCell>
              <TableCell align="right">Available</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedcars.map((car) => {
              const iscarselected = selectedcars.includes(car.car_id);
              return (
                <TableRow
                  hover
                  key={car.car_id}
                  selected={iscarselected}
                  onClick={() => navigate(`/detail/${car.car_id}`)}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {car.manufacture}
                    </Typography>
                    <Stack
                      direction={"row"}
                      justifyContent={"start"}
                      alignItems={"start"}
                      sx={{
                        height: "100%",
                      }}
                      gap={1}
                    >
                      <Typography variant="body2" color="text.secondary" noWrap>
                        Model:
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {car.model}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {car.plate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                      noWrap
                    >
                      {format(parseISO(car.availableAt), "MMMM dd yyyy")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" >
                      {car.description}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {numeral(car.rentPerDay).format(`Rp 0,0.00`)}
                    </Typography>
                    <Stack
                      direction={"row"}
                      justifyContent={"end"}
                      alignItems={"end"}
                      sx={{
                        height: "100%",
                      }}
                      gap={1}
                    >
                      <Typography variant="body2" color="text.secondary" noWrap>
                        Capacity:
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="text.secondary"
                        noWrap
                      >
                        {car.capacity}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(car.available)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          "&:hover": {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={(e) => handleEdit(e, car)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          "&:hover": { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={(e) => handleRemove(e, car)}
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredcars.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

ProductsTable.propTypes = {
  cars: PropTypes.array.isRequired,
};

ProductsTable.defaultProps = {
  cars: [],
};

export default ProductsTable;
