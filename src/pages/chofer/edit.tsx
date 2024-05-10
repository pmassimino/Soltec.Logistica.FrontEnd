import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ApiService from "../../services/apiService";
import { Chofer, Plan } from '../../models/model';
import Layout from '@/componets/Layout';
import BackEndError, { ErrorItem } from '@/utils/errors';
import ChoferForm from '../../componets/chofer/forms';

interface EditProps {
  id: string;
}

const ChoferEdit = ({ id }: EditProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialValues, setInitialValues] = useState<Chofer>();
  const [errorList, setErrorList] = useState<ErrorItem[]>([]);

  useEffect(() => {
    const apiUrl = process.env.API_URL ?? '';
    const apiService = new ApiService(apiUrl);

    const fetchEntity = async () => {
      try {
        const plan = await apiService.get<Chofer>(`/chofer/${id}`);
        setInitialValues(plan);
      } catch (error) {
        if (error instanceof BackEndError)            
      setErrorList(error.errors);  
      }
    };
    fetchEntity();
  }, [id]);

  const handleSubmit = async (entity: Chofer) => {
    const apiUrl = process.env.API_URL ?? '';
    setIsSubmitting(true);

    const apiService = new ApiService(apiUrl);
    try {
      await apiService.put<Plan>(`/chofer/${id}`, entity);
      router.push(`/chofer/`);
    } catch (error) {
      // Manejo del error
      console.error(error);
    }
    setIsSubmitting(false);
  };
  const handleCancel = async () => {   
    router.push(`/chofer/`);   
};
  

  if (!initialValues) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Layout title='Editar chofer'>
        <h1>Editar chofer</h1>
        <ChoferForm entity={initialValues} onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={isSubmitting} errorList={errorList} />
      </Layout>
    </>
  );
};

export default ChoferEdit;
