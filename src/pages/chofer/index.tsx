import { useEffect, useState } from "react";
import ApiService from "../../services/apiService";
import { Chofer } from "@/models/model";
import { withAuth } from "@/componets/withAuth/withAuth";
import Layout from "@/componets/Layout";
import Link from "next/link";
import BackEndError, { ErrorItem } from "@/utils/errors";
import ErrorList from "@/componets/errorList";


const ChoferIndex = () => {
  const [entities, setEntities] = useState<Chofer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorList, setErrorList] = useState<ErrorItem[]>([]);
  const apiUrl = process.env.API_URL ?? '';
  const apiService = new ApiService(apiUrl);

  const filteredEntities = entities.filter((p) =>
    p.nombre && p.nombre.toLowerCase().includes(searchTerm.toLowerCase()));


  const handleSearchFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleDelete = async (data: Chofer) => {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta cuenta?');
    if (!confirmDelete) {
      return;
    }
    try {
      await apiService.delete<Chofer>('/chofer/' + data.id, null);
      fetchEntity();
    } catch (error) {
      if (error instanceof BackEndError)
        setErrorList(error.errors);
    }
  };

  const fetchEntity = (() => {
    apiService.get<Chofer[]>("/chofer").then((data) => setEntities(data));
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
    <Layout title='Choferes'>
      <div className="pb-5">
      <h3>Choferes</h3>
      <div className="row">
      <div className="col-1">
        <Link className="btn btn-outline" href="/chofer/create">
          <i className="bi bi-file-earmark-plus"></i>
          Nuevo
        </Link>
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
      </div>
      <div className="table-container">     
      <table className="table table-hover table-sm">
        <thead className="sticky-header">
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {filteredEntities.map((entity) => (
            <tr key={entity.id}>
              <td>{entity.id}</td>
              <td>{entity.nombre}</td>
              <td><Link className="btn" href={`/chofer/${entity.id}`}><i className="bi bi-pencil-square"></i></Link></td>
              <td><button className="btn" onClick={() => handleDelete(entity)}><i className="bi bi-trash"></i></button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <ErrorList errorList={errorList}></ErrorList>
      </div>
    </Layout>
  );
};

export default withAuth(ChoferIndex);