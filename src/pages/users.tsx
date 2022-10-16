import Head from 'next/head';
import { Box, Container } from '@mui/material';
// import { UserTable } from '../components/users/users_table';
// import { UserListToolbar } from '../components/users/users-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import {useState} from 'react'

const Page = () => {

  const [ordering, setOrdering] = useState('username')
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
        Пользователи
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
        <Box sx={{ mt: 3 }}>
          UserPage
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
