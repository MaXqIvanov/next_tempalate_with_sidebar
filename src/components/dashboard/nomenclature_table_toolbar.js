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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 'DIN-рейка (100см) оцинкованная DIN-рейка (100см) оцинкованная DIN-рейка (100см) оцинкованная '),
    createData('Ice cream sandwich', 'DIN-рейка (100см) оцинкованная 2'),
    createData('Eclair', 'DIN-рейка (100см) оцинкованная 3'),
    createData('Cupcake', 'DIN-рейка (100см) оцинкованная 4'),
    createData('Gingerbread', 'DIN-рейка (100см) оцинкованная 5'),
  ];
  
  export const NomenclatureTable = (props) => {
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
      setPage(value);
    };
    return (
    <Box {...props}>
      <TableContainer component={Paper} className={`custom_table`}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Артикул</TableCell>
            <TableCell>Название</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.calories}</TableCell>
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
  