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
import { setPage, chooseRequest } from '../../store/ipClientSlice';

function createData(ipaddr, iek_client, allow_string_count, blocked, comment) {
    return { ipaddr, iek_client, allow_string_count, blocked, comment };
  }
  
  export const IPClientsTable = (props) => {
    const [rows, setRows] = useState([]);
    const dispatch = useDispatch()
    const {current_page, count_page, ip_clients_all} = useSelector((state)=> state.ip_clients)

    useEffect(() => {
      setRows(ip_clients_all)
    }, [ip_clients_all])
    
    const handleChange = (event, value) => {
      setPage(value);
    };
    const table_header = [
        {
            id: 1,
            title: 'IP',
            order: 'ipaddr',
        },
        {
            id: 2,
            title: 'Внутренний',
            order: 'iek_client',
        },
        {
          id: 3,
          title: 'Разрешено строк',
          order: 'allow_string_count',
        },
        {
          id: 4,
          title: 'Заблокировано',
          order: 'blocked',
        },
        {
          id: 5,
          title: 'Комментарий',
          order: 'comment',
        },
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
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
            >
              <TableCell onClick={()=>{
                dispatch(chooseRequest(row))
                props.setIsVisibleSidebarEdit(true)
              }} component="th" scope="row">
                {row.ipaddr}
              </TableCell>
              <TableCell onClick={()=>{
                dispatch(chooseRequest(row))
                props.setIsVisibleSidebarEdit(true)
              }}>{row.iek_client === false ? 'Нет' : 'Да'}</TableCell>
              <TableCell onClick={()=>{
                dispatch(chooseRequest(row))
                props.setIsVisibleSidebarEdit(true)
              }}>{row.allow_string_count}</TableCell>
              <TableCell onClick={()=>{
                dispatch(chooseRequest(row))
                props.setIsVisibleSidebarEdit(true)
              }}>{row.blocked === false ? 'Нет' : 'Да'}</TableCell>
              <TableCell onClick={()=>{
                dispatch(chooseRequest(row))
                props.setIsVisibleSidebarEdit(true)
              }}>{row.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
{/* ip, inside, rows_allowed, blocked, comments */}
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
  