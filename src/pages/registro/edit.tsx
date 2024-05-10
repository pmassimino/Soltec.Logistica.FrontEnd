import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ApiService from "../../services/apiService";
import { Chofer, Plan, Registro } from '../../models/model';
import Layout from '@/componets/Layout';
import BackEndError, { ErrorItem } from '@/utils/errors';
import ChoferForm from '../../componets/chofer/forms';
import RegistroForm from '@/componets/registro/forms';

interface EditProps {
  id: string;
}

const RegistroEdit = ({ id }: EditProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [entity, setInitialValues] = useState<Registro>();
  const [choferes, setChoferes] = useState<Chofer[]>(); 
  const [errorList, setErrorList] = useState<ErrorItem[]>([]);

  useEffect(() => {
    const apiUrl = process.env.API_URL ?? '';
    const apiService = new ApiService(apiUrl);

    const fetchEntity = async () => {
      try {
        const entity = await apiService.get<Registro>(`/registro/${id}`);
        entity.fecha= new Date().toISOString().split('T')[0];
        setInitialValues(entity);
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
    fetchChofer();    
    fetchEntity();
  }, [id]);

  const handleSubmit = async (entity: Registro) => {
    const apiUrl = process.env.API_URL ?? '';
    setIsSubmitting(true);

    const apiService = new ApiService(apiUrl);
    try {
      await apiService.put<Plan>(`/registro/${id}`, entity);
      router.push(`/registro/`);
    } catch (error) {
      // Manejo del error
      console.error(error);
    }
    setIsSubmitting(false);
  };
  const handleCancel = async () => {   
    router.push(`/registro/`);   
};

  if (!entity) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Layout title='Editar registro'>
        <h3>Editar registro</h3>
        <RegistroForm entity={entity} choferes={choferes} onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={isSubmitting} errorList={errorList} />
      </Layout>
    </>
  );
};

export default RegistroEdit;
