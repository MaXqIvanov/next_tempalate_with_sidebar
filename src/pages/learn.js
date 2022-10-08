import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { ProductListToolbar } from '../components/learn/learn-list-toolbar';
import { ProductCard } from '../components/learn/learn-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { DropzoneArea } from "mui-file-dropzone";

const Page = () => (
  <>
    <Head>
      <title>
        ASIST | Обучение
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
        <ProductListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            <Grid
                item
                lg={12}
                md={12}
                xs={12}
              >
              <ProductCard />
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          {/* <Pagination
            color="primary"
            count={3}
            size="small"
          /> */}
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
