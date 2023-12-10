import axios from 'axios';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { ICar } from './products.types';
import { IApiResponse, IMeta, IParams } from '../../../services/types';
import { useNavigate } from 'react-router-dom';

export default function useList() {
  const navigate = useNavigate();
  const [params, setParams] = useState<IParams>({
    page: 1,
    size: 10,
  });
  const [meta, setMeta] = useState<IMeta>();
  const [loading, setLoading] = useState<boolean>(false);
  const [cars, setCars] = useState<ICar[]>([]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setParams({
      ...params,
      search: value,
    });
    console.log(params)
  };

  const handleRemove = async (
    e: MouseEvent<HTMLButtonElement>,
    record: ICar
  ) => {
    e.stopPropagation();
    const confirmed = confirm('Are you sure want to delete?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/cars/${record?.car_id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        await fetchBooks();
      } catch (error) {
        console.log('error > ', error);
      }
    }
  };

  const handleRemoveMultiple = async (
    e: MouseEvent<HTMLButtonElement>,
    carIds: number[]
  ) => {
    e.stopPropagation();
    const confirmed = confirm('Are you sure want to delete?');
    if (confirmed) {
      try {
        const deletePromises = carIds.map(async (carId) => {
          await axios.delete(`http://localhost:8000/api/cars/${carId}`, {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          });
        });
        console.log(deletePromises);
        await Promise.all(deletePromises);
        await fetchBooks(); // Assuming fetchBooks fetches the updated list
      } catch (error) {
        console.log('error > ', error);
      }
    }
  };

  const handleEdit = (e: MouseEvent<HTMLButtonElement>, record: ICar) => {
    e.stopPropagation();
    navigate(`/form/update-form/${record.car_id}`);
  };

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get<IApiResponse<ICar[]>>(
        'http://localhost:8000/api/cars',
        {
          params,
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      console.log(response.data.data);
      setCars(response?.data?.data);
      setMeta(response.data.meta);
    } catch (error) {
      console.log('error > ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [params]);

  return {
    cars,
    params,
    setParams,
    loading,
    meta,
    handleEdit,
    handleRemove,
    handleRemoveMultiple,
    handleSearch,
  };
}
