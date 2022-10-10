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
import { getNomenclature, setNomenclatureEdit, setPage } from '../../store/nomenclatureSlice';

function createData(name, code) {
    return { code, name };
  }
  
  
  export const NomenclatureTable = (props) => {
    // const [page, setPage] = useState(1);
    const [rows, setRows] = useState([]);
    const {nomenclature_all, count_page, change_nomenclature , current_page} = useSelector((state)=> state.nomenclature)
    const dispatch = useDispatch()

    useEffect(() => {
      setRows(nomenclature_all)
    }, [nomenclature_all])
    

    const handleChange = (event, value) => {
      dispatch(setPage(value));
    };
    const table_header = [
        {
            id: 1,
            title: 'Артикул',
            order: 'code'
        },
        {
            id: 2,
            title: 'Название',
            order: 'name',
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
                }} key={elem.id} className={current_table_header === elem.id ? 'choose_header' : 'header_not'} sx={{cursor: 'pointer'}}>{elem.title}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
            >
              <TableCell onClick={()=>{
                props.setIsVisibleSidebarEdit(true)
                dispatch(setNomenclatureEdit(row))
              }} component="th" scope="row">
                {row.code}
              </TableCell>
              <TableCell onClick={()=>{
                props.setIsVisibleSidebarEdit(true)
                dispatch(setNomenclatureEdit(row))
              }}>{row.name}</TableCell>
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
  