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
import { createUser, changeUser, deleteUser, changePassword } from '../../store/usersSlice';

  export const SidebarEdit = (props) => {
    const [isVisiblePassword, setIsVisiblePassword] = useState(false)
    const {choose_user} = useSelector((state)=> state.users)

    const dispatch = useDispatch()
    const [is_active, setChecked] = useState(choose_user.is_active);
    const [username, setUserName] = useState(choose_user.username)
    const [name, setName] = useState(choose_user.name)
    const [email, setEmail] = useState(choose_user.email)
    const [password, setPassword] = useState(choose_user.password)
    const [repeat_password, setRepeatPassword] = useState(choose_user.password)
    const [avatar, setFile] = useState(choose_user.avatar)
// errors
    const [errors, setErrors] = useState('')
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };
    const saveImage = (img) => {
      // console.log(img.target.files[0]);
      setFile(img.target.files[0])
    }

    // useEffect(() => {
    //   setFile(choose_user.avatar.)
    // }, [])
    

    useEffect(() => {
      console.log(choose_user);
    }, [choose_user])
    
    const changeUserPassword = ()=> {
      if(password !== repeat_password){
        setErrors('Пароли не совпадают')
      }else{
        setErrors('')
        dispatch(changePassword({password: password, isVisiblePassword: setIsVisiblePassword})) 
      }
    }

    const deleteUsersFunc = ()=> {
      if(confirm('Вы уверены, что хотите удалить пользователя?')){
        dispatch(deleteUser({isSidebar: props.setIsVisibleSidebarEdit}))
      }else{

      }
    }    
    return (
    <>
    <div className={`custom_sidebar`}>
        <div className={`nomenclature_detail`}>Изменить Пользователя</div>
        {
          !isVisiblePassword ? 
          <>
  <TextField onChange={(e)=> setUserName(e.target.value)} value={username} id="standard-basic" label="Логин" variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
            <TextField onChange={(e)=> setName(e.target.value)} value={name} id="standard-basic" label="Имя" variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
            <TextField onChange={(e)=>  setEmail(e.target.value)} value={email} id="standard-basic" label="Email" type={'email'} variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
            <div onClick={()=> setIsVisiblePassword(true)} className={`btn_save_change`}><span>Изменить пароль</span></div>
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
                <div  onClick={()=> props.setIsVisibleSidebarEdit(false)} className={`btn_cancel`}><span>Отмена</span></div>
                <div onClick={()=> deleteUsersFunc()} className={`btn_delete`}><span>Удалить</span></div>
                <div onClick={()=> dispatch(changeUser({
                    username: username,
                    email: email,
                    name: name,
                    avatar: avatar,
                    is_active: is_active,
                }))} className={`btn_save`}><span>Сохранить</span></div>
              </div>
            </div>
          </>
          :
          <div>
            <TextField onChange={(e)=>  setPassword(e.target.value)} value={password} id="standard-basic" label="Новый пароль" type={'password'} variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
            <TextField onChange={(e)=>  setRepeatPassword(e.target.value)} value={repeat_password} id="standard-basic" label="Повторить пароль" type={'password'} variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
            {errors.length > 0 && <div className={`errors`}>{errors}</div> }
            <div className={`btn_group`}>
              <div className={`btn_group_wrapper`}>
                <div onClick={()=> setIsVisiblePassword(false)} className={`btn_cancel`}><span>Отмена</span></div>
                <div onClick={()=> changeUserPassword()} className={`btn_save`}><span>Сохранить</span></div>
              </div>
            </div>
          </div>
        }
    </div>
      <div onClick={()=> props.setIsVisibleSidebarEdit(false)} className={`custom_zagl`}>
    </div>
    </>
  )};
  