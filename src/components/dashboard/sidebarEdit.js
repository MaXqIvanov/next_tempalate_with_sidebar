import styles from '../../scss/MainScreen.module.scss';
import TextField from '@mui/material/TextField';
import {useState, useEffect} from 'react'
import delete_img from '../../icons/nomenclature/delete_img.svg';
import { useDispatch, useSelector } from 'react-redux';
import { changeNomenclatureKeys, createNomenclatureKeys, deleteNomenclatureKeys, deleteNomenclatureTree, editNomenclatureTree, getNomenclatureKeys, setNomenclatureEdit, setNomenclatureKeys } from '../../store/nomenclatureSlice';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

  export const SidebarEdit = (props) => {
    const {nomenclature_edit, nomenclature_keys} = useSelector((state)=> state.nomenclature)
    const [code, setCode] = useState(nomenclature_edit.code)
    const [name, setName] = useState(nomenclature_edit.name)
    const [key_name, setKeyName] = useState('')
    const [type_key, setTypeKey] = useState('')
    const dispatch = useDispatch()
    const [article_search, setArticleSearch] = useState(nomenclature_keys)
    useEffect(() => {
      dispatch(getNomenclatureKeys(nomenclature_edit.id))
      // return () => {
      //   dispatch(setNomenclatureEdit(''))
      //   dispatch(setNomenclatureKeys(''))
      // }
      
    }, [])
    useEffect(() => {
        setArticleSearch(nomenclature_keys)
    }, [nomenclature_keys])
    

    const changeName = ({elem, value})=>{

    Object.freeze(article_search);

    const arrCopy = [...article_search]; // 👈️ create copy
    arrCopy[value] = {id: arrCopy[value].id, string: `${elem}`, nomenclature: arrCopy[value].nomenclature, type: arrCopy[value].type};
      setArticleSearch([...arrCopy])
    }
    const deleteNomenclature = ()=> {
      if(confirm('Вы уверены, что хотите удалить номенклатуру?')){
        dispatch(deleteNomenclatureTree({id: nomenclature_edit.id, nav: props.setIsVisibleSidebarEdit}))
      }
    }

    const handleChange = ({event, value}) => {
      console.log(event);
      console.log(value);

      // setAge(event.target.value);
      Object.freeze(article_search);

      const arrCopy = [...article_search]; // 👈️ create copy
      arrCopy[value] = {id: arrCopy[value].id, string: arrCopy[value].string, nomenclature: arrCopy[value].nomenclature, type: `${event.target.value}`};
      setArticleSearch([...arrCopy])
    };
  

    return (
    <>
    <div className={`custom_sidebar`}>
        <div className={`nomenclature_detail`}>Детали номенклатуры</div>
        <TextField value={code} onChange={(e)=> setCode(e.target.value)} id="standard-basic" label="Артикул" variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
        <TextField value={name} onChange={(e)=> setName(e.target.value)} id="standard-basic" label="Название" variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>

        <div className={`btn_group`}>
          <div className={`btn_group_wrapper`}>
            <div onClick={()=> props.setIsVisibleSidebarEdit(false)} className={`btn_cancel`}><span>Отмена</span></div>
            <div onClick={()=> deleteNomenclature()} className={`btn_delete`}><span>Удалить</span></div>
            <div onClick={()=> dispatch(editNomenclatureTree({id: nomenclature_edit.id, name: name, code: code}))} className={`btn_save`}><span>Сохранить</span></div>
          </div>
        </div>

        <div className={`nomenclature_detail`}>Параметры поиска</div>
        <div className={`parametr_search_group`}>
          <TextField id="standard-basic" label="" value={key_name} onChange={(e)=> setKeyName(e.target.value)} variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
          <div onClick={()=> dispatch(createNomenclatureKeys({id: nomenclature_edit.id, string: key_name, type: type_key}))} className={`btn_save btn_add`}>Добавить +</div>
        </div>
        <select value={type_key} onChange={(e)=> setTypeKey(e.target.value)} className={`select_sidebar_edit_custom_v2`}>
              <option value={'both'}>оба</option>
              <option value={'name'}>имя</option>
              <option value={'code'}>артикул</option>
        </select>
        <div className={`article_search_block`}>
          {article_search && article_search.map((elem, index)=>
          <div key={elem.id} className='article_search'>
              <div className={`article_search_name`}>
                <TextField id="standard-basic" label="Название" value={elem.string} onChange={(e)=>changeName({elem: e.target.value, value: index})} variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
              </div> 
              <select value={elem.type} onChange={(e)=> handleChange({event: e, value: index})} className={`select_sidebar_edit_custom`}>
                <option value={'both'}>оба</option>
                <option value={'name'}>имя</option>
                <option value={'code'}>артикул</option>
              </select>
              {/* {index === 0 && <FormControl fullWidth>
                <InputLabel id={`demo-simple-select-label${elem.id}`}>Тип ключа</InputLabel>
                <Select
                  labelId={`demo-simple-select-label${elem.id}`}
                  id={`demo-simple-select${elem.id}`}
                  value={type_key}
                  label="Тип ключа"
                  onChange={handleChangeSelect}
                >
                  <MenuItem value={`10${index}`}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl> } */}
              <div onClick={()=> dispatch(changeNomenclatureKeys({id: elem.id, nomenclature: nomenclature_edit.id, string: elem.string, type: elem.type}))} title={`Сохранить изменения`} className={`article_search_btn_save`}></div>
              <div onClick={()=> dispatch(deleteNomenclatureKeys({id: elem.id}))} title={`Удалить изменения`} className={`article_search_btn_change`}></div>
          </div>)}
        </div>
        {/* <div className={`btn_wrapper`}><div className={`btn_save_change`}>Сохранить изменения</div></div> */}
    </div>
      <div onClick={()=> {
        props.setIsVisibleSidebarEdit(false)
        dispatch(setNomenclatureEdit(''))
        dispatch(setNomenclatureKeys(''))
      }} className={`custom_zagl`}>
    </div>
    </>
  )};
  