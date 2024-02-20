import { Card } from '@mui/material';

import useAction from "./products.hooks";
import ProductsTable from './ProductsTable';

function Products() {
  const {
    cars,
    loading,
    setParams,
    params,
    meta,
    handleEdit,
    handleRemove,
    handleRemoveMultiple,
    handleSearch,
  } = useAction();

  console.log(cars);

  return (
    <Card>
      <ProductsTable 
        cars={cars} 
        handleEdit={handleEdit} 
        handleRemove={handleRemove} 
        handleSearch={handleSearch}
        handleRemoveMultiple={handleRemoveMultiple} 
      />
    </Card>
  );
}

export default Products;
