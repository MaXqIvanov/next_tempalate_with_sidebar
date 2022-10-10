import styles from '../../scss/MainScreen.module.scss';
import TextField from '@mui/material/TextField';
import {
  Box,
  Card,
  CardContent,
  InputAdornment,
  SvgIcon, Typography,
} from '@mui/material';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useState, useEffect} from 'react'
import delete_img from '../../icons/nomenclature/delete_img.svg';
import { useDispatch, useSelector } from 'react-redux';
import { changeIpClient, deleteIpClient } from '../../store/ipClientSlice';

  export const SidebarEdit = (props) => {
    const [isVisiblePassword, setIsVisiblePassword] = useState(false)
    const {choose_ip_clients} = useSelector((state)=> state.ip_clients)

    const dispatch = useDispatch()

    const [isInside, setIsInside] = useState(choose_ip_clients.iek_client)
    const [isBlocked, setIsBlocked] = useState(choose_ip_clients.blocked)
    const [ip, setIp] = useState(choose_ip_clients.ipaddr)
    const [allowed_string, setAllowedString] = useState(choose_ip_clients.allow_string_count)
    const [comments, setComments] = useState(choose_ip_clients.comment)

    const handleChangeInside = (event) => {
      setIsInside(event.target.checked);
    };
    const handleChangeBlocked = (event) => {
      setIsBlocked(event.target.checked);
    };

    const saveImage = (img) => {
      setFile(img.target.files[0])
    }

    const deleteIpClientFunc = ()=> {
      if(confirm('Вы уверены, что хотите удалить ip-клиента?')){
        dispatch(deleteIpClient({
          isVisibleSidebar: props.setIsVisibleSidebarEdit
        }))
      }else{

      }
    }    
    return (
    <>
    <div className={`custom_sidebar`}>
         <div className={`nomenclature_detail`}>Изменить IP-Клиента</div>
        <TextField onChange={(e)=> setIp(e.target.value)} value={ip} id="standard-basic" label="IP" variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
        <TextField onChange={(e)=> setAllowedString(e.target.value)} value={allowed_string} id="standard-basic" label="Разрешено строк" variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
        <TextField onChange={(e)=> setComments(e.target.value)} value={comments} id="standard-basic" label="Комментарий" variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`} multiline rows={3}/>
        <FormControlLabel
          sx={{mt: 2}}
          control={
          <Switch checked={isInside} onChange={handleChangeInside} name="gilad" />
          }
          label="Внутренний"
        />
         <FormControlLabel
          sx={{mt: 2}}
          control={
          <Switch checked={isBlocked} onChange={handleChangeBlocked} name="gilad2" />
          }
          label="Заблокированный"
        />
          <div>
            <div className={`btn_group`}>
              <div className={`btn_group_wrapper`}>
                <div onClick={()=> props.setIsVisibleSidebarEdit(false)} className={`btn_cancel`}><span>Отмена</span></div>
                <div onClick={()=> deleteIpClientFunc()} className={`btn_delete`}><span>Удалить</span></div>
                <div onClick={()=> dispatch(changeIpClient({
                    ipaddr: ip,
                    allow_string_count: allowed_string,
                    iek_client: isInside,
                    blocked: isBlocked,
                    comment: comments
                }))} className={`btn_save`}><span>Сохранить</span></div>
              </div>
            </div>
          </div>

    </div>
      <div onClick={()=> props.setIsVisibleSidebarEdit(false)} className={`custom_zagl`}>
    </div>
    </>
  )};
  