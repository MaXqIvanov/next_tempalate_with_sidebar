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
import { getNomenclatureTree, setPage, sendLearn } from '../../store/learnSlice';
import { useDispatch, useSelector } from 'react-redux';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  export const LearnTree = (props) => {
    // const [page, setPage] = useState(1);
    const [rows, setRows] = useState([]);
    const {learn_all} = useSelector((state)=> state.learn)

    const dispatch = useDispatch()
    useEffect(() => {
      setRows(learn_all)
    }, [learn_all])
    const learn_btn = [
      {
        id: 1,
        title: `новые`
      },
      {
        id: 2,
        title: `было в базе`
      },
      {
        id: 3,
        title: `не загружено`
      }
    ]
    const [learn_btn_active, setLearnBtnActive] = useState('01')
    const handleChange = (event, value) => {
      dispatch(setPage(value));
    };

    const changeName = ({elem, value, value3, elem3})=>{
      console.log(value);
      console.log(elem);
      console.log(value3);
      let btn_two_number = learn_btn_active.split('')
      if(`0${btn_two_number[1]}` === '01'){
        Object.freeze(rows);
        const arrCopy = [...rows]; // 👈️ create copy
        const arrNewUp = [...arrCopy[value].new_uploaded]
        console.log(arrNewUp);
        console.log(arrCopy);
        arrNewUp[value3] = {...elem3, key: `${elem}`}
        setElem(elem)
        setValue3(value3)
        arrCopy[value] = {...arrCopy[value], 'new_uploaded' : arrNewUp};
        setRows([...arrCopy])
        console.log(`standard-basic${elem}${value3}`);
      }else if(`0${btn_two_number[1]}` === '02'){
        Object.freeze(rows);
        const arrCopy = [...rows]; // 👈️ create copy
        const arrNewUp = [...arrCopy[value].already_uploaded]
        console.log(arrNewUp);
        console.log(arrCopy);
        arrNewUp[value3] = {...elem3, key: `${elem}`}
        setElem(elem)
        setValue3(value3)
        arrCopy[value] = {...arrCopy[value], 'already_uploaded' : arrNewUp};
        setRows([...arrCopy])
        console.log(`standard-basic${elem}${value3}`);
      }
      else{
        Object.freeze(rows);
        const arrCopy = [...rows]; // 👈️ create copy
        const arrNewUp = [...arrCopy[value].not_uploaded]
        console.log(arrNewUp);
        console.log(arrCopy);
        arrNewUp[value3] = {...elem3, key: `${elem}`}
        setElem(elem)
        setValue3(value3)
        arrCopy[value] = {...arrCopy[value], 'not_uploaded' : arrNewUp};
        setRows([...arrCopy])
        console.log(`standard-basic${elem}${value3}`);
      }
      }
      
      useEffect(() => {
        if(elem.length > 0){
          document.getElementById(`standard-basic${elem}${value3}`).focus();
        }
      }, [rows])
      useEffect(() => {
        setElem('')
        setValue3('')
      }, [learn_btn_active])
      
      const [elem, setElem] = useState('')
      const [value3, setValue3] = useState('')
      const deleteElem = ({value, value3, elem3})=> {
        console.log(value);
        console.log(value3);
        let btn_two_number = learn_btn_active.split('')
        if(`0${btn_two_number[1]}` === '01'){
          Object.freeze(rows);
          const arrCopy = [...rows]; // 👈️ create copy
          const arrNewUp = [...arrCopy[value].new_uploaded]
          console.log(arrNewUp);
          console.log(arrCopy);
          arrNewUp[value3] = {...elem3, delete: true}
          arrCopy[value] = {...arrCopy[value], 'new_uploaded' : arrNewUp};
          setRows([...arrCopy])
        }else if(`0${btn_two_number[1]}` === '02'){
          Object.freeze(rows);
          const arrCopy = [...rows]; // 👈️ create copy
          const arrNewUp = [...arrCopy[value].already_uploaded]
          console.log(arrNewUp);
          console.log(arrCopy);
          arrNewUp[value3] = {...elem3, delete: true}
          arrCopy[value] = {...arrCopy[value], 'already_uploaded' : arrNewUp};
          setRows([...arrCopy])
        }
        else{
          Object.freeze(rows);
          const arrCopy = [...rows]; // 👈️ create copy
          const arrNewUp = [...arrCopy[value].not_uploaded]
          console.log(arrNewUp);
          console.log(arrCopy);
          arrNewUp[value3] = {...elem3, delete: true}
          arrCopy[value] = {...arrCopy[value], 'not_uploaded' : arrNewUp};
          setRows([...arrCopy])
        }
      }

      const returnElem = ({value, value3, elem3})=> {
        console.log(value);
        console.log(value3);
        let btn_two_number = learn_btn_active.split('')
        if(`0${btn_two_number[1]}` === '01'){
          Object.freeze(rows);
          const arrCopy = [...rows]; // 👈️ create copy
          const arrNewUp = [...arrCopy[value].new_uploaded]
          console.log(arrNewUp);
          console.log(arrCopy);
          arrNewUp[value3] = {...elem3, delete: false}
          arrCopy[value] = {...arrCopy[value], 'new_uploaded' : arrNewUp};
          setRows([...arrCopy])
        }else if(`0${btn_two_number[1]}` === '02'){
          Object.freeze(rows);
          const arrCopy = [...rows]; // 👈️ create copy
          const arrNewUp = [...arrCopy[value].already_uploaded]
          console.log(arrNewUp);
          console.log(arrCopy);
          arrNewUp[value3] = {...elem3, delete: false}
          arrCopy[value] = {...arrCopy[value], 'already_uploaded' : arrNewUp};
          setRows([...arrCopy])
        }
        else{
          Object.freeze(rows);
          const arrCopy = [...rows]; // 👈️ create copy
          const arrNewUp = [...arrCopy[value].not_uploaded]
          console.log(arrNewUp);
          console.log(arrCopy);
          arrNewUp[value3] = {...elem3, delete: false}
          arrCopy[value] = {...arrCopy[value], 'not_uploaded' : arrNewUp};
          setRows([...arrCopy])
        }
      }
    return (
        <Box {...props} className={`custom_box`}>
        <TreeView
        className={`custom_tree`}
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
        {rows && rows.map((elem, index)=>
        <TreeItem onClick={()=> {
          setLearnBtnActive(`${index}1`)
          setElem('')
          setValue3('')
          }} nodeId={elem.code} key={elem.code} label={`${elem.code}`}>
          <div className={`learn_group_btn`}>
            {learn_btn.map((elem2)=> <div onClick={()=> setLearnBtnActive(`${index}${elem2.id}`)} key={elem2.id} className={`${index}${elem2.id}` === learn_btn_active ? `learn_btn_active` : `learn_btn`}>
              {elem2.title}{`${index}${elem2.id}` === `${index}1` && `(${elem.new_uploaded.length})`}
              {`${index}${elem2.id}` === `${index}2` && `(${elem.already_uploaded.length})`}
              {`${index}${elem2.id}` === `${index}3` && `(${elem.not_uploaded.length})`}
            </div>)}
          </div>
          {learn_btn_active === `${index}1` && elem.new_uploaded.length > 0 && elem.new_uploaded.map((elem3, index3)=>
              // <div key={`${elem3.key}${elem3.id}`} className={`learn_tree_key`} >{elem3.key}</div>
              <div key={`${elem3.key}${elem3.id}`} className={`learn_tree_key`}>
                <div className={`article_search_name`}>
                  <TextField id={`standard-basic${elem3.key}${index3}`} value={elem3.key} onChange={(e)=>changeName({elem: e.target.value, value: index, value3: index3, elem3: elem3})} variant="standard" sx={{mt: 1}} style={{opacity: !elem3.delete ? 1 : 0.4}} className={`custom_nomenclature_input`}/>
                </div> 
                <div onClick={()=> elem3.delete ? returnElem({value: index, value3: index3, elem3: elem3}) : deleteElem({value: index, value3: index3, elem3: elem3})} title={`Удалить изменения`} className={!elem3.delete ? `article_search_btn_change` : `article_back_btn_delete`}></div>
              </div>
            )}

            {learn_btn_active === `${index}2` && elem.already_uploaded.length > 0 && elem.already_uploaded.map((elem3, index3)=>
              // <div key={`${elem3.key}${elem3.id}`} className={`learn_tree_key`} >{elem3.key}</div>
              <div key={`${elem3.key}${elem3.id}`} className={`learn_tree_key`}>
                <div className={`article_search_name`}>
                  <TextField id={`standard-basic${elem3.key}${index3}`} value={elem3.key} onChange={(e)=>changeName({elem: e.target.value, value: index, value3: index3, elem3: elem3})} variant="standard" sx={{mt: 1}} style={{opacity: !elem3.delete ? 1 : 0.4}} className={`custom_nomenclature_input`}/>
                </div> 
                <div onClick={()=> elem3.delete ? returnElem({value: index, value3: index3, elem3: elem3}) : deleteElem({value: index, value3: index3, elem3: elem3})} title={`Удалить изменения`} className={!elem3.delete ? `article_search_btn_change` : `article_back_btn_delete`}></div>
              </div>
            )}

            {learn_btn_active === `${index}3` && elem.not_uploaded.length > 0 && elem.not_uploaded.map((elem3, index3)=>
              // <div key={`${elem3.key}${elem3.id}`} className={`learn_tree_key`} >{elem3.key}</div>
              <div key={`${elem3.key}${elem3.id}`} className={`learn_tree_key`}>
                <div className={`article_search_name`}>
                  <TextField id={`standard-basic${elem3.key}${index3}`} value={elem3.key} onChange={(e)=>changeName({elem: e.target.value, value: index, value3: index3, elem3: elem3})} variant="standard" sx={{mt: 1}} style={{opacity: !elem3.delete ? 1 : 0.4}} className={`custom_nomenclature_input`}/>
                </div> 
                <div onClick={()=> elem3.delete ? returnElem({value: index, value3: index3, elem3: elem3}) : deleteElem({value: index, value3: index3, elem3: elem3})}title={`Удалить изменения`} className={!elem3.delete ? `article_search_btn_change` : `article_back_btn_delete`}></div>
              </div>
            )}
          {elem.keys && elem.keys.map((elem2, index)=>
           <div className={`nomenclature_tree_key`} key={`${elem.id}${index}`}>{elem2}</div>
           )}
        </TreeItem>)}
        </TreeView>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <div onClick={()=> dispatch(sendLearn(rows))} className={`btn_send_learning`}>Подтвердить и завершить обучение</div>
        </Box>
    </Box>
  
  )};
  