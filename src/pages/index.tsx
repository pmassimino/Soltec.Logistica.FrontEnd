import Layout from '@/componets/Layout';
import { withAuth } from '@/componets/withAuth/withAuth';
import React from 'react';

const IndexPage: React.FC = () => {
  return (
    <Layout title='Index'>
      <></>
    </Layout>
  );
};

export default withAuth(IndexPage) ;