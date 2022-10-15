import Head from 'next/head';
import { Box, Container } from '@mui/material';
// import { CustomerListResults } from '../components/history_request/history_request-list-results';
// import { HistoryRequestListToolbar } from '../components/history_request/history_request-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
// import { HistoryRequestTable } from '../components/history_request/history_request_table';
import {useState} from 'react'

const Page = () => {
  const [isVisibleSidebarEdit, setIsVisibleSidebarEdit] = useState(false)

  const [ordering, setOrdering] = useState('ip_client')
  const setOrderingFunc = (value)=> {
    console.log(value);
    if(ordering === value.order){
      setOrdering(`-${ordering}`)
    }else{
      setOrdering(value.order)
    }
  }

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
        {/* <HistoryRequestListToolbar ordering={ordering}/> */}
        <Box sx={{ mt: 3 }}>
          {/* <CustomerListResults /> */}
        </Box>
        <Box sx={{ mt: 3 }}>
          {/* <HistoryRequestTable setIsVisibleSidebarEdit={setIsVisibleSidebarEdit} setOrderingFunc={setOrderingFunc}/> */}
        </Box>
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
