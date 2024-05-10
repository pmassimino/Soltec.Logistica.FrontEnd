import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ApiService from "../../services/apiService";
import { Chofer, Plan, TipoViaje, Viaje } from '../../models/model';
import Layout from '@/componets/Layout';
import BackEndError, { ErrorItem } from '@/utils/errors';
import ChoferForm from '../../componets/chofer/forms';
import ViajeForm from '@/componets/viaje/forms';

interface EditProps {
  id: string;
}

const ViajeEdit = ({ id }: EditProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [entity, setEntity] = useState<Viaje>();
  const [choferes, setChoferes] = useState<Chofer[]>(); 
  const [tipoviajes, setTipoViaje] = useState<TipoViaje[]>(); 
  const [errorList, setErrorList] = useState<ErrorItem[]>([]);

  useEffect(() => {
    const apiUrl = process.env.API_URL ?? '';
    const apiService = new ApiService(apiUrl);

    const fetchEntity = async () => {
      try {
        const entity = await apiService.get<Viaje>(`/Viaje/${id}`);
        setEntity(entity);
      } catch (error) {
        if (error instanceof BackEndError)            
      setErrorList(error.errors);  
      }
    };
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
    fetchEntity();
  }, [id]);

  const handleSubmit = async (entity: Viaje) => {
    const apiUrl = process.env.API_URL ?? '';
    setIsSubmitting(true);

    const apiService = new ApiService(apiUrl);
    try {
      await apiService.put<Viaje>(`/viaje/${id}`, entity);
      router.push(`/registro/`);
    } catch (error) {
      // Manejo del error
      console.error(error);
    }
    setIsSubmitting(false);
  };
  const handleCancel = async () => {   
      router.push(`/viaje/`);   
  };


  if (!entity) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Layout title='Editar viaje'>
        <h1>Editar viaje</h1>
        <ViajeForm entity={entity} onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={isSubmitting} choferes={choferes} tipoViajes={tipoviajes} errorList={errorList} />
      </Layout>
    </>
  );
};

export default ViajeEdit;
