import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../components/account/account-profile';
import { AccountProfileDetails } from '../components/account/account-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
import { IPClientsList } from '../components/ip_clients/ip_clients_list_toolbar';
import {useState} from 'react'
import { SidebarCreate } from '../components/ip_clients/sidebarCreate';
import { IPClientsTable } from '../components/ip_clients/ip_clients_table';

const Page = () => {
  const [isVisibleSidebar, setIsVisibleSidebar] = useState(false)

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
        <IPClientsList setIsVisibleSidebar={setIsVisibleSidebar}/>
        <IPClientsTable />
      </Container>
    </Box>
    {isVisibleSidebar && <SidebarCreate setIsVisibleSidebar={setIsVisibleSidebar}/>}
  </>
)};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
