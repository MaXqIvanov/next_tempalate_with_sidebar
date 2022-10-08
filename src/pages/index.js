import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { NomenclatureList } from '../components/dashboard/nomenclature_list_toolbar';
import { NomenclatureTable } from '../components/dashboard/nomenclature_table_toolbar';
import { useSelector } from 'react-redux';
import { NomenclatureTree } from '../components/dashboard/nomenclature_tree';
import {useState} from 'react'
import { SidebarCreate } from '../components/dashboard/sidebarCreate';
import styles from '../scss/MainScreen.module.scss';
import { SidebarEdit } from '../components/dashboard/sidebarEdit';

const Page = () =>{
  const {nomenclature_nav} = useSelector((state)=> state.nomenclature)
  const [isVisibleSidebar, setIsVisibleSidebar] = useState(false)
  const [isVisibleSidebarEdit, setIsVisibleSidebarEdit] = useState(false)
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
        <NomenclatureList setIsVisibleSidebar={setIsVisibleSidebar}/>
        {nomenclature_nav === 1 ? 
          <NomenclatureTable setIsVisibleSidebarEdit={setIsVisibleSidebarEdit}/>
         :<NomenclatureTree setIsVisibleSidebarEdit={setIsVisibleSidebarEdit}/>}
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
