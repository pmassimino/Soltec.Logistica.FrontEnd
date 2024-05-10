import { useState } from 'react';
import { useRouter } from 'next/router';
import ApiService from "../../services/apiService";
import { Chofer, Registro } from '../../models/model';
import Layout from '@/componets/Layout';
import { withAuth } from '@/componets/withAuth/withAuth';
import BackEndError, { ErrorItem } from '@/utils/errors';
import ChoferForm from '../../componets/chofer/forms';


const ChoferCreate = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorList, setErrorList] = useState<ErrorItem[]>([]);

  const handleSubmit = async (entity: Chofer) => {
    const apiUrl = process.env.API_URL ?? '';
    setIsSubmitting(true);

    const apiService = new ApiService(apiUrl);
    let newEntity: Chofer;
    try {
      newEntity = await apiService.post<Chofer>("/chofer", entity);
      const newRegistro: Registro = { 
        id:0,
        fecha:new Date().toISOString().split('T')[0],              
        idChofer: newEntity.id,
        estado: 'Disponible'
      };
      let registro = await apiService.post<Registro>("/registro", newRegistro);
      router.push(`/chofer/`);
    } catch (error) {
      if (error instanceof BackEndError)            
      setErrorList(error.errors);  
    }
    setIsSubmitting(false);
  };
  const handleCancel = async () => {   
    router.push(`/chofer/`);   
};

  return (
    <>
    <Layout title='Crear Nuevo Chofer'>
      <h1>Crear nuevo chofer</h1>
      <ChoferForm onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={isSubmitting} errorList={errorList} />      
      </Layout>
    </>
  );
};

export default withAuth(ChoferCreate);
