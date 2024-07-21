import { useState, useEffect } from 'react';
import { useGetJugadorByEmailQuery, useGetEntrenadorByEmailQuery, useGetDelegadoByEmailQuery } from '../../../server/servicesFireBase/services.js';

export const useBusquedaXmail = (email) => {
    const { data: JugadorEmail, isSuccess: JugadorEmailSuccess } = useGetJugadorByEmailQuery(email);
    const { data: EntrenadorEmail, isSuccess: EntrenadorEmailSuccess } = useGetEntrenadorByEmailQuery(email);
    const { data: DelegadoEmail, isSuccess: DelegadoEmailSuccess } = useGetDelegadoByEmailQuery(email);
    
    const [datosJugadoresEmail, setDatosJugadoresEmail] = useState(null);
    const [datosEntrenadoresEmail, setDatosEntrenadoresEmail] = useState(null);
    const [datosDelegadosEmail, setDatosDelegadosEmail] = useState(null);

    useEffect(() => {
        if (JugadorEmailSuccess && JugadorEmail) {
            const jugador = Object.values(JugadorEmail)[0];
            setDatosJugadoresEmail(jugador);
        }
        if (EntrenadorEmailSuccess && EntrenadorEmail) {
            const entrenador = Object.values(EntrenadorEmail)[0];
            setDatosEntrenadoresEmail(entrenador);
        }
        if (DelegadoEmailSuccess && DelegadoEmail) {
            const delegado = Object.values(DelegadoEmail)[0];
            setDatosDelegadosEmail(delegado);
        }
    }, [JugadorEmailSuccess, EntrenadorEmailSuccess, DelegadoEmailSuccess, JugadorEmail, EntrenadorEmail, DelegadoEmail]);

    const usuario = datosJugadoresEmail || datosEntrenadoresEmail || datosDelegadosEmail;

    return usuario;
}
