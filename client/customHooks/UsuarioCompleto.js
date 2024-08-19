import { useSelector } from 'react-redux';
import { useBusquedaXmail } from './busquedaXmail';
import { useGetDireccionQuery } from '../../server/servicesFireBase/services';
import useFotoPerfil from './traeFotoPerfilDesdeDB';
import Avatar from '../imagenes/avatarX.png'


const useUsuarioCompleto = (email) => {
    const usuarioDatos = useBusquedaXmail(email); 
    const usuarioConKey = useSelector((state) => state.auth.value.localId) 
  
    console.log("INICIO",usuarioConKey)
  
    // console.log("KEY en INICIO",key)
  
    const {localId} = useSelector((state) => state.auth.value)
  
    const { data: direccionData } = useGetDireccionQuery(localId);
  
    // console.log("Local ID en Inicio:", localId);  // OK
    // console.log("Direccion Data:", direccionData.direccion); // OK
  
    const direccionDefinitiva = direccionData ? direccionData.direccion : usuarioDatos?.direccion || ''; 
  
    const profileImageURI = useFotoPerfil();
  
    // le agrega a los datos de la BD foto y dirección si es que hay en firebase
    const completeUsuarioDatos = { 
      ...usuarioDatos, 
      direccion: direccionDefinitiva, 
      profileImageURI: profileImageURI || Avatar 
    };

    return completeUsuarioDatos
}

export default useUsuarioCompleto;
