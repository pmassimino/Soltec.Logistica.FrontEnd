import { useEffect, useState } from "react";
import ApiService from "../../services/apiService";
import { Chofer, RegistroView, Viaje } from "@/models/model";
import { withAuth } from "@/componets/withAuth/withAuth";
import Layout from "@/componets/Layout";
import Link from "next/link";
import BackEndError, { ErrorItem } from "@/utils/errors";
import ErrorList from "@/componets/errorList";
import router from "next/router";
import { formatearFecha, formatearHora } from "@/services/herlperCommon";


const RegistroIndex = () => {
  const [entities, setEntities] = useState<RegistroView[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorList, setErrorList] = useState<ErrorItem[]>([]);
  const [selectedEstados, setSelectedEstados] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem("selectedEstados");      
      return savedState ? JSON.parse(savedState) : [];
    } else {
      return [];
    }
  });// Estados seleccionados por el usuario
  const apiUrl = process.env.API_URL ?? '';
  const apiService = new ApiService(apiUrl);

  const filteredEntities = entities.filter((p) =>
    p.nombreChofer && p.nombreChofer.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedEstados.length === 0 || selectedEstados.includes(p.estado))); // Aplicar filtro de estado si están seleccionados


  const handleSearchFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Función para manejar el cambio en el checkbox de estado
  const handleEstadoCheckboxChange = (estado: string) => {
    if (selectedEstados.includes(estado)) {
      setSelectedEstados(selectedEstados.filter(item => item !== estado));
    } else {
      setSelectedEstados([...selectedEstados, estado]);
    }
  };

  useEffect(() => {
    localStorage.setItem("selectedEstados", JSON.stringify(selectedEstados));
  }, [selectedEstados]);

  const handleDelete = async (data: RegistroView) => {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta cuenta?');
    if (!confirmDelete) {
      return;
    }
    try {
      await apiService.delete<Chofer>('/registro/' + data.id, null);
      fetchEntity();
    } catch (error) {
      if (error instanceof BackEndError)
        setErrorList(error.errors);
    }
  };
  const handleAddViaje = async (entity: RegistroView, idTipo: number = 1) => {
    router.push(`/viaje/create?idChofer=${entity.idChofer}&idTipo=${idTipo}`);
  };
  const handleFinishViaje = async (entity: RegistroView) => {
    const apiUrl = process.env.API_URL ?? '';
    const apiService = new ApiService(apiUrl);
    try {
      await apiService.put<Viaje>(`/viaje/finish/${entity.id}`, null);
      fetchEntity();
    } catch (error) {
      // Manejo del error
      console.error(error);
    }
  };


  const fetchEntity = (() => {
    apiService.get<RegistroView[]>("/registro/view").then((data) => setEntities(data));
  });

  useEffect(() => {
    fetchEntity();
    const storedSearchValue = localStorage.getItem("searchTerm");
    if (storedSearchValue) {
      setSearchTerm(storedSearchValue);
    }
  }, []);
  //cuando cambia actualizar busqueda
  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  

  return (
    <Layout title='Registro'>
      <h5>Registro de Viajes</h5>
      <div className="row pt-2"> 
      <div className="col-1">
        <a className='btn btn-outline' href="/registro/create">
        <i className="bi bi-file-earmark-plus"></i>Nuevo
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
      <div className="col-3">
        Filtrar:
        <label>
          <input className="form-check-input"
            type="checkbox"
            value="EnViaje"
            checked={selectedEstados.includes("EnViaje")}
            onChange={() => handleEstadoCheckboxChange("EnViaje")}
          />
          En Viaje
        </label>
        <label>
          <input
            className="form-check-input"
            type="checkbox"
            value="Disponible"
            checked={selectedEstados.includes("Disponible")}
            onChange={() => handleEstadoCheckboxChange("Disponible")}
          />
          Disponible
        </label>
        <label>
          <input
            className="form-check-input"
            type="checkbox"
            value="NoDisponible"
            checked={selectedEstados.includes("NoDisponible")}
            onChange={() => handleEstadoCheckboxChange("NoDisponible")}
          />
          No Disponible
        </label>
      </div>
      </div>
      <div className="row pt-1">
     
      </div>   
      <div className="table-container">       
      <table className="table table-hover table-sm">
        <thead className="sticky-header">
          <tr>
            <th>Fecha-Hora</th>
            <th>Nombre Chofer</th>
            <th>Patente</th>
            <th>Patente Acoplado</th>
            <th>Estado</th>
            <th>Viajes Cortos</th>
            <th>Viajes Largos</th>
            <th>Puntos</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredEntities.map((entity) => (
            <tr key={entity.id}>
              <td>{formatearFecha(entity.fecha)} {formatearHora(entity.fecha)}</td>
              <td>{entity.nombreChofer}</td>
              <td>{entity.patente}</td>
              <td>{entity.patenteAcoplado}</td>
              <td>{entity.estado}</td>
              <td>{entity.cantidadCorto}</td>
              <td>{entity.cantidadLargo}</td>
              <td>{entity.puntos}</td>                            
              <td><div className="btn-group">
                <button type="button" className="btn btn-sm"><i className="bi bi-three-dots-vertical"></i></button>
                <button type="button" className="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li>{entity.estado === "Disponible" ?
                    (<a className="dropdown-item" onClick={() => handleAddViaje(entity)} href="#">Nuevo Corta</a>) : (
                      <span className="dropdown-item disabled">Nuevo Corta</span>)}
                  </li>
                  <li>{entity.estado === "Disponible" ?
                    (<a className="dropdown-item" onClick={() => handleAddViaje(entity,2)} href="#">Nuevo Larga</a>) : (
                      <span className="dropdown-item disabled">Nuevo Larga</span>)}
                  </li>
                  <li>{entity.estado === "EnViaje" ?
                    (<a className="dropdown-item" onClick={() => handleFinishViaje(entity)} href="#">Finalizar Viaje</a>) : (
                      <span className="dropdown-item disabled">Finalizar</span>)}
                  </li>
                  <li>{entity.estado != "EnViaje" ?
                    (<a className="dropdown-item" href={`/registro/${entity.id}`}>Editar Registro</a>) : (
                      <span className="dropdown-item disabled">Editar Registro</span>)}
                  </li>
                  <li>{entity.cantidadCorto + entity.cantidadLargo == 0 ?
                    (<a className="dropdown-item" onClick={() => handleDelete(entity)} href="#">Eliminar Registro</a>) : (
                      <span className="dropdown-item disabled">Eliminar Registro</span>)}
                  </li>
                </ul>
              </div></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <ErrorList errorList={errorList}></ErrorList>
    </Layout>
  );
};

export default withAuth(RegistroIndex);
