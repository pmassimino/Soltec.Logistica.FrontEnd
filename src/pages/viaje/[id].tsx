
import { useRouter } from 'next/router';
import { withAuth } from '@/componets/withAuth/withAuth';
import ViajeEdit from './edit';

const ViajeEditPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  if (!id) {
    return <div>Cargando...</div>;
  }

  return <ViajeEdit id={id} />;
};

export default withAuth(ViajeEditPage);
