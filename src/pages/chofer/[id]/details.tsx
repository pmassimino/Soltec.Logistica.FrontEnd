import { useRouter } from 'next/router';
import { withAuth } from '@/componets/withAuth/withAuth';
import ChoferDetails from '../details';

const ChoferDetailsPage = () => {
  const router = useRouter();
  const id = router.query.id?.[0];

  if (!id) {
    return <div>Cargando...</div>;
  }

  return <ChoferDetails id={id} />;
};

export default withAuth(ChoferDetailsPage);
