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
  import TreeView from '@mui/lab/TreeView';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  import ChevronRightIcon from '@mui/icons-material/ChevronRight';
  import TreeItem from '@mui/lab/TreeItem';
import { useDispatch, useSelector } from 'react-redux';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  export const NomenclatureTree = (props) => {
    const [rows, setRows] = useState([]);

    const dispatch = useDispatch()
    // useEffect(() => {
    //   return () => {
    //     dispatch(setPage(1));
    //   }
    // }, [])

    return (
        <Box {...props} className={`custom_box`}>
        <TreeView
        className={`custom_tree`}
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
        {/* <TreeItem nodeId="1" label="Applications">
            <TreeItem nodeId="2" label="Calendar" />
        </TreeItem>
        <TreeItem nodeId="5" label="Documents">
            <TreeItem nodeId="10" label="OSS test test test" />
        </TreeItem> */}
        </TreeView>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={1}
            size="small"
            page={1}
            // onChange={handleChange}
          />
        </Box>
    </Box>
  
  )};
  