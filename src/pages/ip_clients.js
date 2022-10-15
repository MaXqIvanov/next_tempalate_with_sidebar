import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../components/account/account-profile';
import { AccountProfileDetails } from '../components/account/account-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
// import { IPClientsList } from '../components/ip_clients/ip_clients_list_toolbar';
import {useState} from 'react'
// import { IPClientsTable } from '../components/ip_clients/ip_clients_table';

const Page = () => {
  const [isVisibleSidebar, setIsVisibleSidebar] = useState(false)
  const [isVisibleSidebarEdit, setIsVisibleSidebarEdit] = useState(false)

  const [ordering, setOrdering] = useState('ipaddr')
  const setOrderingFunc = (value)=> {
    console.log(value);
    if(ordering === value.order){
      setOrdering(`-${ordering}`)
    }else{
      setOrdering(value.order)
    }
  }

  return(
  <>
    <Head>
      <title>
        ASIST | Номенклатура
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4
      }}
    >
      <Container maxWidth={false}>
        {/* <IPClientsList setIsVisibleSidebar={setIsVisibleSidebar} ordering={ordering}/> */}
        {/* <IPClientsTable setIsVisibleSidebarEdit={setIsVisibleSidebarEdit} setOrderingFunc={setOrderingFunc}/> */}
      </Container>
    </Box>
  </>
)};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
