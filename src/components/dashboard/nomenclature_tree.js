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
  import TreeView from '@mui/lab/TreeView';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  import ChevronRightIcon from '@mui/icons-material/ChevronRight';
  import TreeItem from '@mui/lab/TreeItem';

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
  
  export const NomenclatureTree = (props) => {
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
      setPage(value);
    };
    return (
        <Box {...props} className={`custom_box`}>
        <TreeView
        className={`custom_tree`}
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
        <TreeItem nodeId="1" label="Applications">
            <TreeItem nodeId="2" label="Calendar" />
        </TreeItem>
        <TreeItem nodeId="5" label="Documents">
            <TreeItem nodeId="10" label="OSS test test test" />
        </TreeItem>
        </TreeView>
    </Box>
  
  )};
  