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

function createData(ip, data, email, searching) {
    return { ip, data, email, searching };
  }
  
  const rows = [
    createData('127.0.0.1', '01.01.2022', 'maksivanov36@ya.ru', '93'),
    createData('127.0.0.2', '02.01.2022', 'maksivanov37@ya.ru', '94'),
    createData('127.0.0.3', '03.01.2022', 'maksivanov38@ya.ru', '95'),
    createData('127.0.0.4', '04.01.2022', 'maksivanov39@ya.ru', '96'),
    createData('127.0.0.5', '05.01.2022', 'maksivanov40@ya.ru', '98'),
  ];
  
  export const UserTable = (props) => {
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
            title: 'Дата/Время'
        },
        {
          id: 3,
          title: 'Email'
        },
        {
          id: 4,
          title: '% нахождения'
        }
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
              <TableCell>{row.data}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.searching}</TableCell>
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
            count={3}
            size="small"
            page={page}
            onChange={handleChange}
          />
    </Box>
    </Box>
  
  )};
  