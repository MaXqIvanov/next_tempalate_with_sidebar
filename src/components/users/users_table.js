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
import { setPage, chooseRequest } from '../../store/usersSlice';
import { useDispatch, useSelector } from 'react-redux';

function createData(username, name, email, is_active) {
    return { username, name, email, is_active };
  }
  
  export const UserTable = (props) => {
    const [rows, setRows] = useState([]);
    const handleChange = (event, value) => {
      setPage(value);
    };
    const dispatch = useDispatch()
    const {current_page, count_page, users_all} = useSelector((state)=> state.users)
    
    useEffect(() => {
      setRows(users_all)
    }, [users_all])
{/*     return { username, name, email, is_active }; */}
    const table_header = [
        {
            id: 1,
            title: 'Логин',
            order: 'username',
        },
        {
            id: 2,
            title: 'Имя',
            order: 'name',
        },
        {
          id: 3,
          title: 'Email',
          order: 'email',
        },
        {
          id: 4,
          title: 'Активный',
          order: 'is_active',
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
              <TableCell onClick={()=>{
                dispatch(chooseRequest(row))
                props.setIsVisibleSidebarEdit(true)
              }} component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell onClick={()=>{
                dispatch(chooseRequest(row))
                props.setIsVisibleSidebarEdit(true)
              }}>{row.name}</TableCell>
              <TableCell onClick={()=>{
                dispatch(chooseRequest(row))
                props.setIsVisibleSidebarEdit(true)
              }}>{row.email}</TableCell>
              <TableCell onClick={()=>{
                dispatch(chooseRequest(row))
                props.setIsVisibleSidebarEdit(true)
              }}>{row.is_active ? 'Да' : 'Нет'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
{/*     return { username, name, email, is_active }; */}
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
  