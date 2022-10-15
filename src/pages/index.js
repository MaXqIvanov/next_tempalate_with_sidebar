import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { NomenclatureList } from '../components/dashboard/nomenclature_list_toolbar';
import { NomenclatureTable } from '../components/dashboard/nomenclature_table_toolbar';
import { useSelector } from 'react-redux';
import { NomenclatureTree } from '../components/dashboard/nomenclature_tree';
import {useState} from 'react'
import { SidebarCreate } from '../components/dashboard/sidebarCreate';
import { SidebarEdit } from '../components/dashboard/sidebarEdit';

const Page = () =>{
  const [isVisibleSidebar, setIsVisibleSidebar] = useState(false)
  const [isVisibleSidebarEdit, setIsVisibleSidebarEdit] = useState(false)
  const [ordering, setOrdering] = useState('code')

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
      className={isVisibleSidebar ? 'page_visible' :  isVisibleSidebarEdit ? 'page_visible' : 'page'}
      component="main"
      sx={{
        flexGrow: 1,
        py: 4
      }}
    >
      <Container maxWidth={false}>
        <NomenclatureList setIsVisibleSidebar={setIsVisibleSidebar} ordering={ordering}/>
          <NomenclatureTable setIsVisibleSidebarEdit={setIsVisibleSidebarEdit} setOrderingFunc={setOrderingFunc}/>
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
  )
export default Page;
