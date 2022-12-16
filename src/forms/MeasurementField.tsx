import axios, { AxiosResponse } from 'axios';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import Select, { OptionProps, SingleValue } from 'react-select';
import { urlMeasurements } from '../endpoints';
import { measurementDTO } from '../measurements/measurement.model';

export default function MeasurementField(props: MeasurementFieldProps) {

    const [measurementsDB, setMeasurementsDB] = useState<measurementDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { values } = useFormikContext<any>();

    useEffect(() => {
        setIsLoading(true);

        axios.get(`${urlMeasurements}/all`)
            .then((response: AxiosResponse<measurementDTO[]>) => {

                setMeasurementsDB(response.data);
                setIsLoading(false);
            });
    }, []);

    const handleOnChange = (mesaurement: measurementDTO) => {
        console.log(mesaurement);
        values[props.field] = mesaurement.id;
    }

    return (
        <div className="mb-3">
            <label htmlFor="mesaurement">{props.displayName}</label>
            <Select
                id='mesaurement'
                className="basic-single"
                classNamePrefix="select"
                defaultValue={measurementsDB[0]}
                name="mesaurement"
                isLoading={isLoading}
                options={measurementsDB}
                getOptionLabel={(option) => `${option.name}`}
                getOptionValue={(option) => `${option.id}`}
                onChange={value => {
                    if (value != null) handleOnChange(value)
                }}
            />
        </div>
    )
}
interface MeasurementFieldProps {
    field: string;
    displayName: string;
}