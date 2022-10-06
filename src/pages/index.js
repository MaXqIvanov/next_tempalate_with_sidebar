import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { NomenclatureList } from '../components/dashboard/nomenclature_list_toolbar';
import { NomenclatureTable } from '../components/dashboard/nomenclature_table_toolbar';

const Page = () => (
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
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <NomenclatureList />
        <NomenclatureTable />
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
