import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICar } from 'src/models/product';

export default function useDetails() {
    const { car_id } = useParams();
    const [car, setCar] = useState<ICar>({
        car_id: 0,
        plate:"",
        manufacture:"",
        image:"",
        model:"",
        type:"",
        description:"",
        transmission:"",
        capacity: 0,
        rentPerDay:"",
        availableAt:"",
        available: false,
        year: 0,
        options: {},
        specs: {},
        created_by: 0,
        updated_by: 0,
    });
    const [optionsInputFields, setOptionsInputFields] = useState<
        { option: string }[]
    >([{ option: "" }]);
    const [specsInputFields, setSpecsInputFields] = useState<
        { spec: string }[]
    >([{ spec: "" }]);
    {
        const fetchCarData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/cars/${car_id}`,
                    {
                        headers: {
                            Authorization: localStorage.getItem("token"),
                        },
                    }
                );
                const bookData = response.data.data;
                setCar(bookData);
                setOptionsInputFields(bookData.options.optionsInputFields);
                setSpecsInputFields(bookData.specs.specsInputFields);
            } catch (error) {
                console.log("error > ", error);
            }
        };

        return {
            fetchCarData,
            setCar,
            car,
            optionsInputFields,
            specsInputFields
        };
    }
}
