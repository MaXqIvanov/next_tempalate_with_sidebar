import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/history_request/history_request-list-results';
import { HistoryRequestListToolbar } from '../components/history_request/history_request-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { HistoryRequestTable } from '../components/history_request/history_request_table';
import { SidebarEdit } from '../components/history_request/sidebarEdit';
import {useState} from 'react'

const Page = () => {
  const [isVisibleSidebarEdit, setIsVisibleSidebarEdit] = useState(false)

return (
  <>
    <Head>
      <title>
        ASIST | ИСТОРИЯ ЗАПРОСОВ
      </title>
    </Head>
    <Box
      className={isVisibleSidebarEdit ? 'page_visible' : 'page'}
      component="main"
      sx={{
        flexGrow: 1,
        py: 4
      }}
    >
      <Container maxWidth={false}>
        <HistoryRequestListToolbar />
        <Box sx={{ mt: 3 }}>
          <CustomerListResults />
        </Box>
        <Box sx={{ mt: 3 }}>
          <HistoryRequestTable setIsVisibleSidebarEdit={setIsVisibleSidebarEdit}/>
        </Box>
      </Container>
    </Box>
    {isVisibleSidebarEdit && <SidebarEdit setIsVisibleSidebarEdit={setIsVisibleSidebarEdit}/> }
  </>
)};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
