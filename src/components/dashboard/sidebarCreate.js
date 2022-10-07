import styles from '../../scss/MainScreen.module.scss';
import TextField from '@mui/material/TextField';
import {useState} from 'react'
import delete_img from '../../icons/nomenclature/delete_img.svg';
import { useDispatch, useSelector } from 'react-redux';
import { createNomenclatureTree, deleteNomenclatureTree } from '../../store/nomenclatureSlice';

  export const SidebarCreate = (props) => {
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const {nomenclature_edit} = useSelector((state)=> state.nomenclature)
    const [article_search, setArticleSearch] = useState([
      {
        id: 1,
        title: 'YDN10-0100'
      },
      {
        id: 2,
        title: 'YDN20-0100'
      },
      {
        id: 3,
        title: 'YDN30-0100'
      },
      {
        id: 4,
        title: 'YDN30-0100'
      },
      {
        id: 5,
        title: 'YDN30-0100'
      },
    ])

    const changeName = ({elem, value})=>{
      let new_elem = article_search
      new_elem[value-1].title = elem
      setArticleSearch([...new_elem])
    }
    return (
    <>
    <div className={`custom_sidebar`}>
        <div className={`nomenclature_detail`}>Добавить номенклатуру</div>
        <TextField value={code} onChange={(e)=> setCode(e.target.value)} id="standard-basic" label="Артикул" variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
        <TextField value={name} onChange={(e)=> setName(e.target.value)} id="standard-basic" label="Название" variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>

        <div className={`btn_group`}>
          <div className={`btn_group_wrapper`}>
            <div onClick={()=> props.setIsVisibleSidebar(false)} className={`btn_cancel`}><span>Отмена</span></div>
            <div onClick={()=> dispatch(deleteNomenclatureTree({id: nomenclature_edit.id, nav: props.setIsVisibleSidebar}))} className={`btn_delete`}><span>Удалить</span></div>
            <div onClick={()=> dispatch(createNomenclatureTree({name: name, code: code}))} className={`btn_save`}><span>Сохранить</span></div>
          </div>
        </div>

        <div className={`nomenclature_detail`}>Параметры поиска</div>
        <div className={`parametr_search_group`}>
          <TextField id="standard-basic" label="" variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
          <div className={`btn_save btn_add`}>Добавить +</div>
        </div>
        
        <div className={`article_search_block`}>
          {article_search && article_search.map((elem)=>
          <div className='article_search'>
              <div className={`article_search_name`}>
                <TextField id="standard-basic" label="Название" value={elem.title} onChange={(e)=>changeName({elem: e.target.value, value: elem.id})} variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
              </div> 
              <div title={`Сохранить изменения`} className={`article_search_btn_save`}></div>
              <div className={`article_search_btn_change`}></div>
          </div>)}
        </div>
        {/* <div className={`btn_wrapper`}><div className={`btn_save_change`}>Сохранить изменения</div></div> */}
    </div>
      <div onClick={()=> props.setIsVisibleSidebar(false)} className={`custom_zagl`}>
    </div>
    </>
  )};
  