import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ApiService from "../../services/apiService";
import { Chofer, TipoViaje, Viaje } from '../../models/model';
import Layout from '@/componets/Layout';
import { withAuth } from '@/componets/withAuth/withAuth';
import BackEndError, { ErrorItem } from '@/utils/errors';
import ViajeForm from '@/componets/viaje/forms';
import chofer from '../chofer';

const ViajeCreate = () => {
  const router = useRouter();
  const idChofer = router.query.idChofer ? parseInt(router.query.idChofer as string) : 0;
  const idTipo = router.query.idTipo ? parseInt(router.query.idTipo as string) : 1;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorList, setErrorList] = useState<ErrorItem[]>([]);
  const [choferes, setChoferes] = useState<Chofer[]>();
  const [tipoviajes, setTipoViaje] = useState<TipoViaje[]>();

  useEffect(() => {
    const apiUrl = process.env.API_URL ?? '';
    const apiService = new ApiService(apiUrl);
    const fetchChofer = async () => {
      try {
        const entity = await apiService.get<Chofer[]>(`/chofer`);
        setChoferes(entity);
      } catch (error) {
        // Manejo del error        
        console.error(error);
      }
    };
    const fetchTipoViaje = async () => {
      try {
        const entity = await apiService.get<TipoViaje[]>(`/tipoviaje`);
        setTipoViaje(entity);
      } catch (error) {
        // Manejo del error        
        console.error(error);
      }
    };
    fetchChofer();
    fetchTipoViaje();
  }, []);


  const handleSubmit = async (entity: Viaje) => {
    const apiUrl = process.env.API_URL ?? '';
    setIsSubmitting(true);

    const apiService = new ApiService(apiUrl);
    let newEntity: Viaje;
    try {
      newEntity = await apiService.post<Viaje>("/viaje", entity);
      router.push(`/registro`);
    } catch (error) {
      if (error instanceof BackEndError)
        setErrorList(error.errors);
    }
    setIsSubmitting(false);
  };
  const handleCancel = async () => {
    router.push(`/registro`);
  };
  const newEntityDefault: Viaje = {
    id: 0,
    fecha: new Date().toISOString().split('T')[0], // Obtiene la fecha actual en formato 'YYYY-MM-DD'
    concepto: "",
    idTipo: idTipo,
    idChofer: idChofer,
    chofer: {id:0,nombre:"",numeroDocumento:0,telefono:"",email:"",patente:"",patenteAcoplado:""},    
    estado: "EnViaje",
    numeroComprobante: 0,
    distancia: 0
  };

  return (
    <>
      <Layout title='Crear Nuevo Viaje'>
        <h3>Crear nuevo viaje</h3>
        <ViajeForm onSubmit={handleSubmit} onCancel={handleCancel} entity={newEntityDefault} isSubmitting={isSubmitting} choferes={choferes} tipoViajes={tipoviajes} errorList={errorList} />
      </Layout>
    </>
  );
};

export default withAuth(ViajeCreate);
