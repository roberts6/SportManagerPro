import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';

function Estadisticas({ jugador }) {
    const [accion, setAccion] = useState({
        Nueve: 0,
        NueveArquero: 0,
        NueveAfuera: 0,
        Seis: 0,
        SeisArquero: 0,
        SeisAfuera: 0,
        penal: 0,
        penalAfuera: 0,
        penalArquero: 0,
        pases: 0,
        paseErrado: 0,
        perdidas: 0,
        recuperaciones: 0,
        faltas: 0,
        amarilla: 0,
        dosMinutos: 0,
        roja: 0,
        azul: 0,
    });

    const [lanzamientosTotales, setLanzamientosTotales] = useState(0);
    const [porcentajeLanzamientos, setPorcentajeLanzamientos] = useState(0);
    const [penales, setPenales] = useState(0);
    const [pasesTotales, setPasesTotales] = useState(0)
    const [porcentajePenal, setPorcentajePenal] = useState(0);
    const [porcentajePases, setPorcentajePases] = useState(0);
    const [recuperacion, setRecuperacion] = useState(0);
    const [totalGoles, setTotalGoles] = useState(0);
    const [totalGolPenal, setTotalGolPenal] = useState(0);
    const [pasesCompletos, setPasesCompletos] = useState(0)

    useEffect(() => {
        const totalLanzamientos = accion.Nueve + accion.Seis + accion.NueveAfuera + accion.NueveArquero + accion.SeisAfuera + accion.SeisArquero; 
        setLanzamientosTotales(totalLanzamientos);

        const totalPenales = accion.penal + accion.penalArquero + accion.penalAfuera;
        setPenales(totalPenales);

        setRecuperacion(accion.recuperaciones);

        setPasesCompletos(accion.pases)

        const goles = accion.Nueve + accion.Seis;
        setTotalGoles(goles)

        setTotalGolPenal(accion.penal)

        const pases = accion.paseErrado + accion.pases
        setPasesTotales(pases)
        
        setPorcentajeLanzamientos(totalLanzamientos > 0 ? Math.floor((accion.Nueve + accion.Seis) / totalLanzamientos * 100) : 0); 

        const penalesLanzados = accion.penal + accion.penalAfuera + accion.penalArquero;
        setPorcentajePenal(penalesLanzados > 0 
            ? Math.floor((accion.penal / penalesLanzados) * 100)
            : 0);

            const pasesTotales = accion.paseErrado + accion.pases;
    setPorcentajePases(pasesTotales > 0
        ? Math.floor((accion.pases / pasesTotales) * 100)
        : 0);
    }, [accion]);

    const handleSuma = (key) => {
        setAccion((prevState) => {
            if (prevState.roja === 1 && key !== 'roja' && key !== 'azul') {
                return prevState; // No permitir sumar si 'roja' es igual a 1
            }

            // No permite que '2 minutos' exceda 3
            if (key === 'dosMinutos' && prevState[key] >= 3) {
                return prevState;
            }

            // No permite que 'roja' exceda 1
            if (key === 'roja' && prevState[key] === 1) {
                return prevState;
            }

            // No permite que 'azul' exceda 1
            if (key === 'azul' && prevState[key] === 1) {
                return prevState
            }

            // No permitir que 'amarilla' exceda 1
            if (key === 'amarilla' && prevState[key] === 1) {
                return prevState;
            }
            
            let nuevosValores = { ...prevState, [key]: prevState[key] + 1 };

            // Actualiza pases y perdidas si la acción es paseErrado
            if (key === 'paseErrado') {
                nuevosValores.perdidas = prevState.perdidas + 1;
            }

            // Verifica si se alcanza el límite de dos minutos y actualiza a roja al llegar a 3
            if (key === 'dosMinutos' && nuevosValores.dosMinutos === 3) {
                nuevosValores.roja = 1;
            }

            // si primero recibe un 2 minutos ya no puede recibir amarilla
            if (key === 'amarilla' && prevState[key] === 0 && prevState['dosMinutos'] >= 1) {
                return prevState;
            }
            return nuevosValores;
        });
    };

    const handleResta = (key) => {
        setAccion((prevState) => {

            // si tiene una roja bloquea la ejecución del resto de las acciones, menos de roja
            if (prevState.roja === 1 && key !== 'roja' && key !== 'azul') {
                return prevState;
            }

            let nuevosValores = { ...prevState, [key]: prevState[key] > 0 ? prevState[key] - 1 : 0 };

            // Actualiza pases y perdidas si la acción es paseErrado
            if (key === 'paseErrado') { 
                nuevosValores.perdidas = prevState.perdidas > 0 ? prevState.perdidas - 1 : 0;
            }

// Verifica si se alcanza el límite de dos minutos y actualiza a roja al llegar a 3
if (key === 'roja' && nuevosValores.dosMinutos === 3 ) {
    nuevosValores.dosMinutos = prevState.roja === 1 ? prevState.dosMinutos - 1 : 0;
}
            return nuevosValores;
        });
    };
    

    const nameMap = {
        Nueve: 'Nueve',
        NueveArquero: 'Nueve Arquero',
        NueveAfuera: 'Nueve Afuera',
        Seis: 'Seis',
        SeisArquero: 'Seis Arquero',
        SeisAfuera: 'Seis Afuera',
        penal: 'Penal',
        penalAfuera: 'Penal Afuera',
        penalArquero: 'Penal Arquero',
        pases: 'Pases',
        paseErrado: 'Pase Errado',
        perdidas: 'Pérdidas',
        recuperaciones: 'Recuperaciones',
        faltas: 'Faltas',
        amarilla: 'Amarilla',
        dosMinutos: 'Dos Minutos',
        roja: 'Roja',
        azul: 'Azul'
    };

    return (
        <ScrollView>
             <View style={styles.container}>
            <Text style={styles.title}>Estadísticas 📈 {jugador && jugador.nombre}</Text>
            <View style={accion.roja === 1 ?  styles.contenedorEstadisticasRoja : styles.contenedorEstadisticas}>
                <View style={ styles.statRow }>
                    <Text style={[
                        accion.roja === 1 ? styles.statTextRoja : styles.statText]}>
                        Lanzamientos: {lanzamientosTotales} - Gol: {totalGoles} ({porcentajeLanzamientos}%)
                    </Text>
                </View>
                <View style={ styles.statRow }>
                    <Text style={[
                        accion.roja === 1 ? styles.statTextRoja : styles.statText]}>
                        Penales: {penales} - Gol: {totalGolPenal} ({porcentajePenal}%)
                    </Text>
                </View>
                <View style={ styles.statRow }>
                    <Text style={[
                        accion.roja === 1 ? styles.statTextRoja : styles.statText]}>
                        Pases: {pasesTotales} - Correctos: {pasesCompletos} ({porcentajePases}%)
                    </Text>
                </View>
                <View style={{ display: accion.azul === 1 ? styles.statRow : 'none' }}>
                    <Text style={[
                        accion.roja === 1 ? styles.statTextRoja : styles.statText]}>🟦 <Text style={{ fontWeight: 'bold' }}>(informe)</Text></Text>
                </View>
            </View>
                
                {Object.keys(accion).map((key) => (
                    <View 
                        style={(key === 'dosMinutos' || key === 'amarilla' || key === 'roja' || key === 'faltas' || key === 'azul') 
                            ? styles.backGroundSanciones 
                            : (key.includes('Nueve') || key === 'NueveAfuera' || key === 'NueveArquero') ? styles.backGroundNueve :
                              (key.includes('Seis') || key === 'SeisAfuera' || key === 'SeisArquero') ? styles.backGroundSeis : (key === 'penal' || key === 'penalAfuera' || key === 'penalArquero') 
                            ? styles.backGroundPenal 
                            : (key === 'perdidas' || key === 'recuperaciones') 
                            ? styles.backGroundErrores 
                            : styles.backGroundPases} 
                        key={key}>
                        <View style={styles.statRow}>
                            <View style={styles.buttonContainer}>
                                <Button title="➖" onPress={() => handleResta(key)} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.statText}>{nameMap[key]}: {accion[key]}</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button 
                                    title={((key === "roja") ? "🟥" 
                                        : (key === "amarilla") ? "🟨"
                                        : (key === "azul") ? "🟦" 
                                        : (key === "dosMinutos") ? '✌️' :
                                        (key === "faltas") ? '👊' 
                                        : (key === 'SeisArquero' || 
                                        key === 'SeisAfuera' 
                                        || key === 'NueveArquero' 
                                        || key === 'NueveAfuera' 
                                        || key === 'penalArquero' 
                                        || key === 'penalAfuera' 
                                        || key === 'paseErrado' 
                                        || key === 'perdidas') ? '🚫' 
                                        : '⚽️')} 
                                    onPress={() => handleSuma(key)} />
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    contenedorEstadisticas:{
        width:'95%',
        color: 'black',
        backgroundColor: '#D7DBDD',
        padding: 10,
        width: '95%',
        marginBottom: 15,
    },
    contenedorEstadisticasRoja:{
        width:'95%',
        backgroundColor: 'red',
        color: 'white',
        padding: 10,
        width: '95%',
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        alignContent: 'center'
    },
    statText: {
        flex: 1,
        fontSize: 15,
        textAlign: 'center',
    },
    statTextRoja: {
        flex: 1,
        fontSize: 15,
        textAlign: 'center',
        color:'white'
    },
    textContainer: {
        marginHorizontal: 3,
        padding: 5
    },
    buttonContainer: {
        width: 40,
    },
    backGroundSanciones: {
        backgroundColor: '#D2B4DE',
        width: '95%',
        alignItems: 'center',
    },
    backGroundNueve: {
        backgroundColor: '#D5F5E3',
        width: '95%',
        alignItems: 'center',
    },
    backGroundSeis: {
        backgroundColor: '#A9DFBF',
        width: '95%',
        alignItems: 'center',
    },
    backGroundPenal: {
        backgroundColor: '#17A589',
        width: '95%',
        alignItems: 'center',
    },
    backGroundPases: {
        backgroundColor: '#2E86C1',
        width: '95%',
        alignItems: 'center',
    },
    backGroundErrores: {
        backgroundColor: '#A9CCE3',
        width: '95%',
        alignItems: 'center',
    }
});

export default Estadisticas;