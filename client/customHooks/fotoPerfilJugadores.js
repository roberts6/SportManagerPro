import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetFotoPerfilQuery } from "../../server/servicesFireBase/services";

const useFotoPerfilJugadores = (localId) => {
  
    const { data: imageFromDataBase } = useGetFotoPerfilQuery(localId);

    const base64Image = useMemo(() => {
        return imageFromDataBase?.Image;
    }, [imageFromDataBase]);

    const isBase64 = (str) => {
        if (typeof str !== 'string') {
            return false;
        }
        const base64Pattern = /^data:image\/(jpeg|png);base64,/;
        return base64Pattern.test(str);
    };

    const profileImageURI = useMemo(() => {
        return base64Image && isBase64(base64Image) ? base64Image : null;
    }, [base64Image]);

    return profileImageURI;
};

export default useFotoPerfilJugadores;
