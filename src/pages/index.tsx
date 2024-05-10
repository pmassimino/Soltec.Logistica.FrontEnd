import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { withAuth } from '@/componets/withAuth/withAuth'
import Layout from '@/componets/Layout'

const inter = Inter({ subsets: ['latin'] })

const Home = () => (
  <Layout title="Home">
    
  </Layout>
);
export default withAuth(Home);
