import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import io from 'socket.io-client';

interface Paciente {
  horaLlegada: string;
  Edad: number;
  enEspera: any;
  ID_Paciente: number;
  Nombre: string;
  timestampLlegada: string;
  // ... otros campos
}

const fetchPacientesEnEspera = async () => {
  const response = await fetch(`http://${process.env.NEXT_PUBLIC_SERVER_HOST}/paciente-en-espera`);
  if (!response.ok) {
    throw new Error(`Error al obtener pacientes en espera: ${response.statusText}`);
  }
  return response.json();
};

// ...

const TuComponente = () => {
  const queryClient = useQueryClient();

  const { data: pacientesEnEspera, isError, isLoading } = useQuery('pacientesEnEspera', fetchPacientesEnEspera);

  useEffect(() => {
    const socket = io(`http://${process.env.NEXT_PUBLIC_SERVER_HOST}`, { transports: ['websocket'] });

    socket.on('connect', () => {
      console.log('Conexión establecida con el servidor de sockets');
    });

    socket.on('enEsperaCambiado', () => {
      // Realiza una nueva llamada al endpoint para obtener los datos actualizados
      queryClient.invalidateQueries('pacientesEnEspera');
    });

    // Cierra la conexión cuando el componente se desmonte
    return () => {
      socket.disconnect();
      console.log('Conexión cerrada');
    };
  }, [queryClient]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError || !pacientesEnEspera) {
    return <div>Error al cargar datos</div>;
  }

  return (
    <div>
      <h2>Pacientes en Espera</h2>
      <table>
        <thead>
          <tr>
            <th>ID_Paciente</th>
            <th>Nombre</th>
            <th>Edad</th>
            {/* ... otros campos */}
            <th>En Espera</th>
            <th>Hora de Llegada</th>
          </tr>
        </thead>
        <tbody>
          {pacientesEnEspera.map((paciente: Paciente) => (
            <tr key={paciente.ID_Paciente}>
              <td>{paciente.ID_Paciente}</td>
              <td>{paciente.Nombre}</td>
              <td>{paciente.Edad}</td>
              {/* ... otros campos */}
              <td>{paciente.enEspera ? 'Sí' : 'No'}</td>
              <td>{paciente.horaLlegada}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TuComponente;