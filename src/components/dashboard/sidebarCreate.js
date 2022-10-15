import TextField from '@mui/material/TextField';
import {useState, useEffect} from 'react'
import delete_img from '../../icons/nomenclature/delete_img.svg';
import { useDispatch, useSelector } from 'react-redux';
  export const SidebarCreate = (props) => {
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const [key_name, setKeyName] = useState('')
    // const {nomenclature_edit, nomenclature_keys} = useSelector((state)=> state.nomenclature)
    const [article_search, setArticleSearch] = useState([])
    const [type_key, setTypeKey] = useState('both')

    const changeName = ({elem, value})=>{
      Object.freeze(article_search);
      const arrCopy = [...article_search];
      arrCopy[value] = {id: arrCopy[value].id, string: `${elem}`, nomenclature: arrCopy[value].nomenclature};
      setArticleSearch([...arrCopy])
      }


  const handleChange = ({event, value}) => {
    Object.freeze(article_search);

    const arrCopy = [...article_search];
    arrCopy[value] = {id: arrCopy[value].id, string: arrCopy[value].string, nomenclature: arrCopy[value].nomenclature, type: `${event.target.value}`};
    setArticleSearch([...arrCopy])
  };
    
    return (
    <>
    <div className={`custom_sidebar`}>
        <div className={`nomenclature_detail`}>Добавить номенклатуру</div>
        <TextField value={code} onChange={(e)=> setCode(e.target.value)} id="standard-basic" label="Артикул" variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
        <TextField value={name} onChange={(e)=> setName(e.target.value)} id="standard-basic" label="Название" variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>

        <div className={`btn_group`}>
          <div className={`btn_group_wrapper`}>
            <div onClick={()=> props.setIsVisibleSidebar(false)} className={`btn_cancel`}><span>Отмена</span></div>
            {/* <div onClick={()=> dispatch(deleteNomenclatureTree({id: nomenclature_edit.id, nav: props.setIsVisibleSidebar}))} className={`btn_delete`}><span>Удалить</span></div> */}
            {/* <div onClick={()=> dispatch(createNomenclatureTree({name: name, code: code}))} className={`btn_save`}><span>Сохранить</span></div> */}
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
          <div className='article_search'>
              <div className={`article_search_name`}>
                <TextField id="standard-basic" label="Название" value={elem.string} onChange={(e)=>changeName({elem: e.target.value, value: index})} variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
              </div>
              <select value={elem.type} onChange={(e)=> handleChange({event: e, value: index})} className={`select_sidebar_edit_custom`}>
                <option value={'both'}>оба</option>
                <option value={'name'}>имя</option>
                <option value={'code'}>артикул</option>
              </select>
              {/* <div onClick={()=> dispatch(changeNomenclatureKeys({id: elem.id, nomenclature: nomenclature_edit.id, string: elem.string, type: elem.type}))} title={`Сохранить изменения`} className={`article_search_btn_save`}></div> */}
              {/* <div onClick={()=> dispatch(deleteNomenclatureKeys({id: elem.id}))} title={`Удалить изменения`} className={`article_search_btn_change`}></div> */}
          </div>)}
        </div>
        {/* <div className={`btn_wrapper`}><div className={`btn_save_change`}>Сохранить изменения</div></div> */}
    </div>
      <div onClick={()=> {
        props.setIsVisibleSidebar(false)
        dispatch(setNomenclatureEdit(''))
        dispatch(setNomenclatureKeys(''))
      }} className={`custom_zagl`}>
    </div>
    </>
  )};
  