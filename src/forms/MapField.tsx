import { useFormikContext } from "formik";
import coordinateDTO from "../utilis/coordinates.model"
import Map from "../utilis/Map";

export default function MapField(props: mapFieldProps) {

    const { values } = useFormikContext<any>(); // l'oggetto qui dentro è un form per il movie theater

    function handleMapClick(coordinates: coordinateDTO) {
        // ...
        values[props.latField] = coordinates.lat;
        values[props.lngField] = coordinates.lng;
    }

    return (
        <Map
            coordinates={props.coordinates}
            handleMapClick={handleMapClick}
        />
    )
}

interface mapFieldProps {
    coordinates: coordinateDTO[];
    latField: string;
    lngField: string;
}

MapField.defaultProps = {
    coordinates: []
}