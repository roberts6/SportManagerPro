import { createSlice } from "@reduxjs/toolkit";

export const planillaJugadoresSlice = createSlice({
    name: 'planillaJugadores',
    initialState: {
        value: {
            user: 'userLogged',
            total: null,
            jugadores: []
        }
    },
    reducers: {
        agregarJugador: (state, action) => {
            const jugador = action.payload;
            const jugadorExistente = state.value.jugadores.find(j => j.id === jugador.id);
    
            if (!jugadorExistente) {
                state.value.jugadores.push(jugador);
            } else {
                alert("El jugador ya fue agregado en la planilla");
            }
        },
        quitarJugador: (state, action) => {
            const jugadorId = action.payload;
            state.value.jugadores = state.value.jugadores.filter(jugador => jugador.id !== jugadorId);
        }
    }
    
});

export const { agregarJugador, quitarJugador } = planillaJugadoresSlice.actions;

export default planillaJugadoresSlice.reducer;


// ahora tengo que agregar este reducer al store