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
  import {useState} from 'react'
  import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(ip, inside, rows_allowed, blocked, comments) {
    return { ip, inside, rows_allowed, blocked, comments };
  }
  
  const rows = [
    createData('127.0.0.1', 'ДА', '4563', 'НЕТ', 'Какой-то там комментраий'),
    createData('127.0.0.2', 'ДА', '4564', 'НЕТ', 'Какой-то там комментраий2'),
    createData('127.0.0.3', 'ДА', '4565', 'НЕТ', 'Какой-то там комментраий3'),
    createData('127.0.0.4', 'ДА', '4567', 'НЕТ', 'Какой-то там комментраий4'),
    createData('127.0.0.5', 'ДА', '4568', 'НЕТ', 'Какой-то там комментраий5'),
  ];
  
  export const IPClientsTable = (props) => {
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
      setPage(value);
    };
    const table_header = [
        {
            id: 1,
            title: 'IP'
        },
        {
            id: 2,
            title: 'Внутренний'
        },
        {
          id: 3,
          title: 'Разрешено строк'
        },
        {
          id: 4,
          title: 'Заблокировано'
        },
        {
          id: 5,
          title: 'Комментарий'
        },
    ]
    return (
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
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.ip}
              </TableCell>
              <TableCell>{row.inside}</TableCell>
              <TableCell>{row.rows_allowed}</TableCell>
              <TableCell>{row.blocked}</TableCell>
              <TableCell>{row.comments}</TableCell>
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
            count={3}
            size="small"
            page={page}
            onChange={handleChange}
          />
    </Box>
    </Box>
  
  )};
  