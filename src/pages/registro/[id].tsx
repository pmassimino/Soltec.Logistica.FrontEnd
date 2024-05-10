
import { useRouter } from 'next/router';
import { withAuth } from '@/componets/withAuth/withAuth';
import RegistroEdit from './edit';

const ChoferEditPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  if (!id) {
    return <div>Cargando...</div>;
  }

  return <RegistroEdit id={id} />;
};

export default withAuth(ChoferEditPage);
