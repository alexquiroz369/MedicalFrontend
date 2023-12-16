import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import io from 'socket.io-client';

interface Paciente {
  Edad: number,
  enEspera: any;
  ID_Paciente: number;
  Nombre: string;
  // ... otros campos
}

const fetchPacientesEnEspera = async () => {
  const response = await fetch('http://localhost:3000/paciente-en-espera');
  if (!response.ok) {
    throw new Error(`Error al obtener pacientes en espera: ${response.statusText}`);
  }
  return response.json();
};

const TuComponente = () => {
  const queryClient = useQueryClient();

  const { data: pacientesEnEspera, isError, isLoading } = useQuery('pacientesEnEspera', fetchPacientesEnEspera);

  useEffect(() => {
    const socket = io('http://localhost:3000', { transports: ['websocket'] });

    socket.on('connect', () => {
      console.log('Conexión establecida con el servidor de sockets');
    });

    socket.on('enEsperaCambiado', () => {
      // Invalida la caché del query cuando se emite el evento
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TuComponente;