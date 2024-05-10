import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ApiService from "../../services/apiService";
import { Chofer, Registro } from '../../models/model';
import Layout from '@/componets/Layout';
import { withAuth } from '@/componets/withAuth/withAuth';
import BackEndError, { ErrorItem } from '@/utils/errors';
import RegistroForm from '@/componets/registro/forms';

const RegistroCreate = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorList, setErrorList] = useState<ErrorItem[]>([]);
  const [choferes, setChoferes] = useState<Chofer[]>(); 
  
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
    fetchChofer();    
  },[]); 

  const handleSubmit = async (entity: Registro) => {
    const apiUrl = process.env.API_URL ?? '';
    setIsSubmitting(true);

    const apiService = new ApiService(apiUrl);
    let newEntity: Registro;
    try {
      newEntity = await apiService.post<Registro>("/registro", entity);
      router.push(`/registro/`);
    } catch (error) {
      if (error instanceof BackEndError)            
      setErrorList(error.errors);  
    }
    setIsSubmitting(false);
  };
  const handleCancel = async () => {   
    router.push(`/registro/`);   
};

  const newEntityDefault: Registro = {
    id: 0,
    fecha: new Date().toISOString().split('T')[0], // Obtiene la fecha actual en formato 'YYYY-MM-DD'
    idChofer: 0,
    estado: "Disponible"
  };

  return (
    <>
    <Layout title='Crear Nuevo Registro'>
      <h1>Crear nuevo registro</h1>
      <RegistroForm onSubmit={handleSubmit} onCancel={handleCancel} entity={newEntityDefault}  isSubmitting={isSubmitting} choferes={choferes} errorList={errorList} />      
      </Layout>
    </>
  );
};

export default withAuth(RegistroCreate);
