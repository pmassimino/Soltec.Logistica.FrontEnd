
import { useRouter } from 'next/router';
import { withAuth } from '@/componets/withAuth/withAuth';
import ChoferEdit from './edit';

const RegistroEditPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  if (!id) {
    return <div>Cargando...</div>;
  }

  return <ChoferEdit id={id} />;
};

export default withAuth(RegistroEditPage);
