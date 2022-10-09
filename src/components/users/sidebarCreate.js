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
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react'
import delete_img from '../../icons/nomenclature/delete_img.svg';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../store/usersSlice';

  export const SidebarCreate = (props) => {
    const dispatch = useDispatch()
    const [is_active, setChecked] = useState(false);
    const [username, setUserName] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeat_password, setRepeatPassword] = useState('')
    const [avatar, setFile] = useState('')

    const handleChange = (event) => {
      setChecked(event.target.checked);
    };
    const saveImage = (img) => {
      // console.log(img.target.files[0]);
      setFile(img.target.files[0])
    }

    
    return (
    <>
    <div className={`custom_sidebar`}>
        <div className={`nomenclature_detail`}>Добавить Пользователя</div>
        {
          <>
            <TextField onChange={(e)=> setUserName(e.target.value)} value={username} id="standard-basic" label="Логин" variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
            <TextField onChange={(e)=> setName(e.target.value)} value={name} id="standard-basic" label="Имя" variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
            <TextField onChange={(e)=>  setEmail(e.target.value)} value={email} id="standard-basic" label="Email" type={'email'} variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
            <TextField onChange={(e)=>  setPassword(e.target.value)} value={password} id="standard-basic" label="Новый пароль" type={'password'} variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
            <TextField onChange={(e)=>  setRepeatPassword(e.target.value)} value={repeat_password} id="standard-basic" label="Повторить пароль" type={'password'} variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
            <Box   sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              mt: 1,
            }}>
               <Button
              variant="contained"
              component="label"
              sx={{mt: 1}}
            >
              загрузить аватар
              <input
                type="file"
                hidden
                onChange={saveImage}
              />
            </Button>
            </Box>
            <FormControlLabel
              sx={{mt: 2}}
              control={
                <Switch checked={is_active} onChange={handleChange} name="gilad" />
              }
              label="Активный"
            />
            <div className={`btn_group`}>
              <div className={`btn_group_wrapper`}>
                <div className={`btn_cancel`}><span>Отмена</span></div>
                <div onClick={()=> dispatch(createUser({
                  username: username,
                  email: email,
                  name: name,
                  avatar: avatar,
                  is_active: is_active,
                  password: password,
                }))} className={`btn_save`}><span>добавить</span></div>
              </div>
            </div>
          </>
        }
    </div>
      <div onClick={()=> props.setIsVisibleSidebar(false)} className={`custom_zagl`}>
    </div>
    </>
  )};
  