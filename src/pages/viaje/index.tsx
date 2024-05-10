import { useEffect, useState } from "react";
import ApiService from "../../services/apiService";
import { Chofer, Viaje } from "@/models/model";
import { withAuth } from "@/componets/withAuth/withAuth";
import Layout from "@/componets/Layout";
import Link from "next/link";
import BackEndError, { ErrorItem } from "@/utils/errors";
import ErrorList from "@/componets/errorList";
import { formatearFecha, formatearHora } from "@/services/herlperCommon";



const ViajeIndex = () => {
  const [entities, setEntities] = useState<Viaje[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorList, setErrorList] = useState<ErrorItem[]>([]);
  const [selectedEstados, setSelectedEstados] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem("selectedEstadosViaje");
      return savedState ? JSON.parse(savedState) : [];
    } else {
      return [];
    }
  });// Estados seleccionados por el usuario
  const apiUrl = process.env.API_URL ?? '';
  const apiService = new ApiService(apiUrl);

  const handleSearchFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (data: Viaje) => {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este viaje?');
    if (!confirmDelete) {
      return;
    }
    try {
      await apiService.delete<Viaje>('/Viaje/' + data.id, null);
      fetchEntity();
    } catch (error) {
      if (error instanceof BackEndError)
        setErrorList(error.errors);
    }
  };
  // Función para manejar el cambio en el checkbox de estado
  const handleEstadoCheckboxChange = (estado: string) => {
    if (selectedEstados.includes(estado)) {
      setSelectedEstados(selectedEstados.filter(item => item !== estado));
    } else {
      setSelectedEstados([...selectedEstados, estado]);
    }
  };

  const fetchEntity = async () => {
    try {
      const data = await apiService.get<Viaje[]>("/viaje");
      if (Array.isArray(data)) {
        setEntities(data);
      } else {
        console.error("La respuesta de la API no es un arreglo:", data);
      }
    } catch (error) {
      console.error("Error al obtener los datos del viaje:", error);
      // Manejar el error aquí si es necesario
    }
  };

  useEffect(() => {
    fetchEntity();
    const storedSearchValue = localStorage.getItem("searchTerm");
    if (storedSearchValue) {
      setSearchTerm(storedSearchValue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);
  useEffect(() => {
    localStorage.setItem("selectedEstadosViaje", JSON.stringify(selectedEstados));
  }, [selectedEstados]);

  //const filteredEntities = entities.filter((p) =>
  //  p.chofer.nombre && p.chofer.nombre.toLowerCase().includes(searchTerm.toLowerCase() && 
  // (selectedEstados.length === 0 || selectedEstados.includes(p.estado))));
  const filteredEntities = entities.filter((p) =>
    p.chofer.nombre && p.chofer.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedEstados.length === 0 || selectedEstados.includes(p.estado)))

  

  return (
    <Layout title='Viajes'>     
      <h3>Viajes</h3>            
      <div className="input-group mb-3">
      <div>
        <a className="btn"href="/viaje/create">
        <i className="bi bi-file-earmark-plus"></i>Crear nuevo viaje
        </a>
      </div>  
      <div className="col-3">
        <input 
          className="form-control"
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={handleSearchFilterChange}
        />
      </div>
      <div className="p-2">
        Filtrar:
        <label className="form-label">
          <input
           className="form-check-input"
            type="checkbox"
            value="EnViaje"
            checked={selectedEstados.includes("EnViaje")}
            onChange={() => handleEstadoCheckboxChange("EnViaje")}
          />
          En Viaje
        </label>
        <label className="form-label">
          <input
            className="form-check-input"
            type="checkbox"
            value="Finalizado"
            checked={selectedEstados.includes("Finalizado")}
            onChange={() => handleEstadoCheckboxChange("Finalizado")}
          />
          Finalizado
        </label>
        <label className="form-label">
          <input
            className="form-check-input"
            type="checkbox"
            value="Cancelado"
            checked={selectedEstados.includes("Cancelado")}
            onChange={() => handleEstadoCheckboxChange("Cancelado")}
          />
          Cancelado
        </label>
      </div>
      </div>      
      <div className="table-container">               
      <table className="table table-hover table-sm">
        <thead className="sticky-header">
          <tr>
            <th>Id</th>
            <th>Fecha</th>
            <th>Chofer</th>
            <th>Tipo</th>
            <th>Concepto</th>
            <th>Numero Comprobante</th>
            <th>Distancia</th>
            <th>Estado</th>
          </tr>
        </thead>        
        <tbody>        
          {filteredEntities.map((entity) => (
            <tr key={entity.id}>
              <td>{entity.id}</td>
              <td>{formatearFecha(entity.fecha)} {formatearHora(entity.fecha)}</td>
              <td>{entity.chofer.nombre}</td>
              <td>{entity.idTipo}</td>
              <td>{entity.concepto}</td>
              <td>{entity.numeroComprobante}</td>
              <td>{entity.distancia}</td>
              <td>{entity.estado}</td>
              <td>{entity.estado.trim() != "Finalizado" ? (<a className="btn"href={`/viaje/${entity.id}`}><i className="bi bi-pencil-square"></i></a>) : null}</td>
              <td>{entity.estado.trim() != "Finalizado" ? (<button className="btn " onClick={() => handleDelete(entity)}><i className="bi bi-trash"></i></button>) : null}</td>
            </tr>
          ))}          
        </tbody>       
      </table>   
      <ErrorList errorList={errorList}></ErrorList>        
      </div>
    </Layout>
  );
};

export default withAuth(ViajeIndex);
