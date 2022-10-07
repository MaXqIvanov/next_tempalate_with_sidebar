import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/history_request/history_request-list-results';
import { HistoryRequestListToolbar } from '../components/history_request/history_request-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { HistoryRequestTable } from '../components/history_request/history_request_table';

const Page = () => (
  <>
    <Head>
      <title>
        ASIST | ИСТОРИЯ ЗАПРОСОВ
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <HistoryRequestListToolbar />
        <Box sx={{ mt: 3 }}>
          <CustomerListResults />
        </Box>
        <Box sx={{ mt: 3 }}>
          <HistoryRequestTable />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
