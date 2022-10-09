import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { UserTable } from '../components/users/users_table';
import { UserListToolbar } from '../components/users/users-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import {useState} from 'react'
import { SidebarCreate } from '../components/users/sidebarCreate';
import { SidebarEdit } from '../components/users/sidebarEdit';

const Page = () => {
  const [isVisibleSidebar, setIsVisibleSidebar] = useState(false)
  const [isVisibleSidebarEdit, setIsVisibleSidebarEdit] = useState(false)

return(
  <>
    <Head>
      <title>
        ASIST | Пользователи
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
        <UserListToolbar setIsVisibleSidebar={setIsVisibleSidebar}/>
        <Box sx={{ mt: 3 }}>
          <UserTable setIsVisibleSidebarEdit={setIsVisibleSidebarEdit}/>
        </Box>
      </Container>
    </Box>
    {isVisibleSidebar && <SidebarCreate setIsVisibleSidebar={setIsVisibleSidebar}/>}
    {isVisibleSidebarEdit && <SidebarEdit setIsVisibleSidebarEdit={setIsVisibleSidebarEdit}/> }
  </>
)};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
