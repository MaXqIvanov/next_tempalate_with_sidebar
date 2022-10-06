import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/history_request/history_request-list-results';
import { CustomerListToolbar } from '../components/history_request/history_request-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';

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
        <CustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          <CustomerListResults customers={customers} />
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
