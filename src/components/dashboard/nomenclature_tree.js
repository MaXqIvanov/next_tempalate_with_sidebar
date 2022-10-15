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
    // const [page, setPage] = useState(1);
    const [rows, setRows] = useState([]);
    const {nomenclature_tree, count_page, current_page} = useSelector((state)=> state.nomenclature)

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
        {nomenclature_tree && nomenclature_tree.map((elem)=>
        <TreeItem nodeId={elem.id} key={elem.id} label={`"${elem.code}"  /  ${elem.name}`}>
          {elem.keys && elem.keys.map((elem2, index)=>
           <div className={`nomenclature_tree_key`} key={`${elem.id}${index}`}>{elem2}</div>
           )}
        </TreeItem>)}


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
            count={count_page}
            size="small"
            page={current_page}
            onChange={handleChange}
          />
        </Box>
    </Box>
  
  )};
  