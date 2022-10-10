import styles from '../../scss/MainScreen.module.scss';
import {useState, useEffect} from 'react'
import delete_img from '../../icons/nomenclature/delete_img.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setIsVisibleSidebarEdit, getHistoryRequestResults, setPageResults } from '../../store/historyRequestSlice';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography,
  Pagination
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { Search as SearchIcon } from '../../icons/search';
// import debounce from 'debounce'
import useDebounce from '../../hooks/use-debounce';

function createData(input_code, input_name, output_code, output_name) {
  return { input_code, input_name, output_code, output_name };
}

  export const SidebarEdit = (props) => {
    const {count_page_results, current_page_results, choose_request, history_request_results} = useSelector((state)=> state.history_request)

    const [search_history_request_results, setSearchHistoryRequestResults] = useState('')
    const debouncedSearchTerm = useDebounce(search_history_request_results, 300);

    const dispatch = useDispatch()
    useEffect(() => {
      // dispatch(getNomenclatureKeys(nomenclature_edit.id))  
      dispatch(getHistoryRequestResults({search: search_history_request_results}))
    }, [current_page_results, debouncedSearchTerm])
    
    const table_header = [{
      id: 1,
      title: 'Искомый артикул'
    },
    {
      id: 2,
      title: 'Искомое название'
    },
    {
      id: 3,
      title: 'Артикул IEK'
    },
    {
      id: 4,
      title: 'Название IEK'
    }]

    useEffect(() => {
      setRows(history_request_results)
    }, [history_request_results])

    const handleChange = (event, value) => {
      dispatch(setPageResults(value));
    };

    useEffect(() => {
      dispatch(setPageResults(1));
    }, [debouncedSearchTerm])

    const [rows, setRows] = useState([]);
    
    return (
    <>
    <div className={`custom_sidebar_w60`}>
        <div className={`nomenclature_detail_w60`}>Детали запроса</div>
        <div className={`nomenclature_detail_title`}>IP</div>
        <div className={`nomenclature_detail_text`}>{choose_request.ip_client}</div>
        <div className={`nomenclature_detail_title`}>Дата/Время</div>
        <div className={`nomenclature_detail_text`}>{choose_request.created}</div>
        <div className={`nomenclature_detail_title`}>Email</div>
        <div className={`nomenclature_detail_text`}>{choose_request.email}</div>
        <div className={`nomenclature_detail_title`}>% Нахождения</div>
        <div className={`nomenclature_detail_text`}>{choose_request.successful_search_percent}</div>
        <div className={`nomenclature_detail_w60`}>Результаты поиска</div>
        <Box sx={{ maxWidth: 500 }}>
            <TextField
              value={search_history_request_results}
              onChange={(e)=> setSearchHistoryRequestResults(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Поиск"
              variant="outlined"
            />
          </Box>

          <Box {...props}>
            <TableContainer component={Paper} className={`custom_table`}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  {table_header && table_header.map((elem)=> 
                      <TableCell key={elem.id}>{elem.title}</TableCell>)}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows && rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell onClick={()=>{
                      props.setIsVisibleSidebarEdit(true)
                      dispatch(setNomenclatureEdit(row))
                    }} component="th" scope="row">
                      {row.input_code}
                    </TableCell>
                    <TableCell onClick={()=>{
                      props.setIsVisibleSidebarEdit(true)
                      dispatch(setNomenclatureEdit(row))
                    }}>{row.input_name}</TableCell>
                    <TableCell onClick={()=>{
                      props.setIsVisibleSidebarEdit(true)
                      dispatch(setNomenclatureEdit(row))
                    }}>{row.output_code}</TableCell>
                    <TableCell onClick={()=>{
                      props.setIsVisibleSidebarEdit(true)
                      dispatch(setNomenclatureEdit(row))
                    }}>{row.output_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Box>
          <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
              <Pagination
                color="primary"
                count={count_page_results}
                size="small"
                page={current_page_results}
                onChange={handleChange}
              />
        </Box>
          {/*   return { input_code, input_name, output_code, output_name }; */}
    </div>
    <div onClick={()=> props.setIsVisibleSidebarEdit(false)} className={`custom_zagl`}>
    </div>
    </>
  )};
  