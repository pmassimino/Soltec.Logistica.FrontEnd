import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ApiService from "@/services/apiService";
import { Chofer } from '@/models/model';
import Layout from '@/componets/Layout';
import BackEndError, { ErrorItem } from '@/utils/errors';
import ErrorList from '@/componets/errorList';

type Props = {
  id: string;
};

const ChoferDetails = ({ id }: Props) => {
  const router = useRouter();
  const [entity, setEntity] = useState<Chofer | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);  
  const [errorList, setErrorList] = useState<ErrorItem[]>([]);
 

  const handleDelete = async () => {
    const apiUrl = process.env.API_URL ?? '';

    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este plan?');
    if (!confirmDelete) {
      return;
    }

    const apiService = new ApiService(apiUrl);
    try {
      await apiService.delete(`/chofer/${id}`,null);
      router.push('/chofer');
    } catch (error) {     
      if (error instanceof BackEndError)            
      setErrorList(error.errors);  
      
      console.error(error);
    }
  };
  const handleEdit = async () => {
    router.push(`/chofer/${id}`);
  };

  useEffect(() => {
    const apiUrl = process.env.API_URL ?? '';

    const apiService = new ApiService(apiUrl);
    apiService.get<Chofer>(`/Chofer/${id}`).then((fetchedEntity) => {
      setEntity(fetchedEntity);
    }).catch((error) => {
      console.error(error);
    });
  }, [id]);

  if (!entity) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Layout title={`Detalle Chofer #${entity.id}`}>       
        <h1>Chofer :{entity.id}</h1>
        <p>Nombre: {entity.nombre}</p>      
        <button onClick={handleDelete}>Eliminar</button>
        <button onClick={handleEdit}>Editar</button> 
        <ErrorList errorList={errorList}></ErrorList>      
      </Layout>
    </>
  );
};

export default ChoferDetails;
