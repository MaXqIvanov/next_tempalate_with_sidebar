import styles from '../../scss/MainScreen.module.scss';
import TextField from '@mui/material/TextField';
import {useState, useEffect} from 'react'
import delete_img from '../../icons/nomenclature/delete_img.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setIsVisibleSidebarEdit, getHistoryRequestResults } from '../../store/historyRequestSlice';

  export const SidebarEdit = (props) => {
    const {count_page_results, current_page_results} = useSelector((state)=> state.history_request)
    const [search_history_request_results, setSearchHistoryRequestResults] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
      // dispatch(getNomenclatureKeys(nomenclature_edit.id))   
      dispatch(getHistoryRequestResults({search: search_history_request_results}))   
    }, [count_page_results])
    
    return (
    <>
    <div className={`custom_sidebar_w60`}>
        <div className={`nomenclature_detail_w60`}>Детали запроса</div>

    </div>
    <div onClick={()=> props.setIsVisibleSidebarEdit(false)} className={`custom_zagl`}>
    </div>
    </>
  )};
  