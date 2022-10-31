import { MapContainer, TileLayer, useMapEvent, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import coordinateDTO from "./coordinates.model";
import { useState } from "react";

let defaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [16, 37]
});
L.Marker.prototype.options.icon = defaultIcon;

export default function Map(props: mapProps) {
    const [coordinates, setCoordinates] = useState<coordinateDTO[]>(props.coordinates);

    return (
        <MapContainer
            center={[45.521677, 9.323936]}
            zoom={14}
            style={{ height: props.height }}>

            {/* attribution = Nome_applicazione */}
            <TileLayer attribution="React Movies"
                url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {props.readOnly ? null :
                <MapClick setCoordinates={coordinates => {
                    setCoordinates([coordinates])
                    props.handleMapClick(coordinates);  // to parent component
                }} />
            }
            {coordinates.map((coordinate, index) =>
                <Marker position={[coordinate.lat, coordinate.lng]} key={index} >
                    {coordinate.name ? <Popup>
                        {coordinate.name}
                    </Popup> : null}
                </Marker>
            )}

        </MapContainer>
    )
}


interface mapProps {
    height: string;
    coordinates: coordinateDTO[];
    handleMapClick(coordinates: coordinateDTO): void;
    readOnly: boolean;
}

Map.defaultProps = {
    height: '500px',
    handleMapClick: () => { },    // empty function
    readOnly: false
}


// Funzionalità mappa
function MapClick(props: mapClickProps) {
    // é capital letter perchè è un component

    // utilizzo un hook speciale della libreria
    useMapEvent('click', eventArgs => {
        props.setCoordinates(
            { lat: eventArgs.latlng.lat, lng: eventArgs.latlng.lng });
    })
    return null;
}
interface mapClickProps {
    setCoordinates(coordinates: coordinateDTO): void;    // voglio passare le coordinate al parent component
}