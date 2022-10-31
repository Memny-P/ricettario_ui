import { useFormikContext } from "formik";
import { ChangeEvent, useState } from "react";

export default function ImageField(props: imageFieldProps) {
    const [imageBase64, setImageBase64] = useState("");// mostro immagine ( usando state )
    const [imageURL, setImageURL] = useState(props.imageURL);
    // voglio un modo per portare l'informazione fuori
    const { values } = useFormikContext<any>();

    const divStyle = { marginTop: '10px' };
    const imgStyle = { width: '450px' };

    const handleOnChange = (eventArgs: ChangeEvent<HTMLInputElement>) => {
        if (eventArgs.currentTarget.files) {
            const file = eventArgs.currentTarget.files[0];
            if (file) {
                // trasformo il file in base64 => display a video
                toBase64(file)
                    .then((base64Representation: string) => setImageBase64(base64Representation))
                    .catch(error => console.error(error));

                values[props.field] = file;

                setImageURL(''); // rimuovo l'immagine che c'era prima
            } else {
                setImageBase64('');
            }

        }
    }

    // async operation
    const toBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        })
    }

    return (
        <div className="mb-3">
            <label>{props.displayName}</label>
            <div>
                <input type="file" accept=".jpg,.jpeg,.png" onChange={handleOnChange} />
            </div>
            {imageBase64 ?
                <div>
                    <div style={divStyle}>
                        <img style={imgStyle} src={imageBase64} alt="selected image" />
                    </div>
                </div> : null}
            {imageURL ?
                <div>
                    <div style={divStyle}>
                        <img style={imgStyle} src={imageURL} alt="selected image" />
                    </div>
                </div> : null}
        </div>
    )
}

interface imageFieldProps {
    displayName: string;
    imageURL: string;
    field: string;
}

ImageField.defaultProps = {
    imageURL: ''
}