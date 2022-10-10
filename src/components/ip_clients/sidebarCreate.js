import styles from '../../scss/MainScreen.module.scss';
import TextField from '@mui/material/TextField';
import {useState} from 'react'
import delete_img from '../../icons/nomenclature/delete_img.svg';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { createIpClient } from '../../store/ipClientSlice';

  export const SidebarCreate = (props) => {
    const [isInside, setIsInside] = useState(false)
    const [isBlocked, setIsBlocked] = useState(false)
    const [ipaddr, setIpaddr] = useState('')
    const [allowed_string, setAllowedString] = useState('')
    const [comments, setComments] = useState('')

    const handleChangeInside = (event) => {
      setIsInside(event.target.checked);
    };
    const handleChangeBlocked = (event) => {
      setIsBlocked(event.target.checked);
    };

    const dispatch = useDispatch()

    const changeName = ({elem, value})=>{
      let new_elem = article_search
      new_elem[value-1].title = elem
      setArticleSearch([...new_elem])
    }
    return (
    <>
    <div className={`custom_sidebar`}>
        <div className={`nomenclature_detail`}>Добавить IP-Клиента</div>
        <TextField onChange={(e)=> setIpaddr(e.target.value)} value={ipaddr} id="standard-basic" label="IP" variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
        <TextField onChange={(e)=> setAllowedString(e.target.value)} value={allowed_string} id="standard-basic" label="Разрешено строк" variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
        <TextField onChange={(e)=> setComments(e.target.value)} value={comments} id="standard-basic" label="Комментарий" variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`} multiline rows={3}/>
        <FormControlLabel
          sx={{mt: 2}}
          control={
          <Switch checked={isInside} onChange={handleChangeInside} name="gilad" />
          }
          label="Активный"
        />
         <FormControlLabel
          sx={{mt: 2}}
          control={
          <Switch checked={isBlocked} onChange={handleChangeBlocked} name="gilad" />
          }
          label="Активный"
        />
        <div className={`btn_group`}>
          <div className={`btn_group_wrapper`}>
            <div onClick={()=> props.setIsVisibleSidebar(false)} className={`btn_cancel`}><span>Отмена</span></div>
            <div onClick={()=> dispatch(createIpClient({
                  ipaddr: ipaddr,
                  allow_string_count: allowed_string,
                  iek_client: isInside,
                  blocked: isBlocked,
                  comment: comments
            }))} className={`btn_save`}><span>Добавить</span></div>
          </div>
        </div>
    </div>
      <div onClick={()=> props.setIsVisibleSidebar(false)} className={`custom_zagl`}>
    </div>
    </>
  )};
  