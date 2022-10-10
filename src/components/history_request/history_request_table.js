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
  import {useState, useEffect} from 'react'
  import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, chooseRequest } from '../../store/historyRequestSlice';

function createData(ip, data, email, successful_search_percent) {
    return { ip, data, email, successful_search_percent };
  }
  
  export const HistoryRequestTable = (props) => {
    // const [page, setPage] = useState(1);
    const [rows, setRows] = useState([]);
    const handleChange = (event, value) => {
      setPage(value);
    };
    const dispatch = useDispatch()
    const {current_page, count_page, history_request_all} = useSelector((state)=> state.history_request)
    useEffect(() => {
      setRows(history_request_all)
    }, [history_request_all])
    
    const table_header = [
        {
            id: 1,
            title: 'IP',
            order: 'ip_client',
            
        },
        {
            id: 2,
            title: 'Дата/Время',
            order: 'created'
        },
        {
          id: 3,
          title: 'Email',
          order: 'email',
        },
        {
          id: 4,
          title: '% нахождения',
          order: 'successful_search_percent'
        }
    ]
    const [current_table_header, setCurrentTableHeader] = useState(1)

    return (
    <Box {...props}>
      <TableContainer component={Paper} className={`custom_table`}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {table_header && table_header.map((elem)=> 
                <TableCell onClick={()=>{
                  props.setOrderingFunc(elem)
                  setCurrentTableHeader(elem.id)
                }} className={current_table_header === elem.id ? 'choose_header' : 'header_not'} sx={{cursor: 'pointer'}} key={elem.id}>{elem.title}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
            >
              <TableCell  onClick={()=>{
                dispatch(chooseRequest(row))
                props.setIsVisibleSidebarEdit(true)
              }} component="th" scope="row">
                {row.ip_client}
              </TableCell>
              <TableCell  onClick={()=>{
                dispatch(chooseRequest(row))
                props.setIsVisibleSidebarEdit(true)
              }}>{row.created}</TableCell>
              <TableCell  onClick={()=>{
                dispatch(chooseRequest(row))
                props.setIsVisibleSidebarEdit(true)
               }}>{row.email}</TableCell>
              <TableCell  onClick={()=>{
                dispatch(chooseRequest(row))
                props.setIsVisibleSidebarEdit(true)
               }}>{row.successful_search_percent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

     <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={count_page}
            size="small"
            page={current_page}
            onChange={handleChange}
          />
    </Box>
    </Box>
  
  )};
  