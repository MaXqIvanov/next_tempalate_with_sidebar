import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip, TextField} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Bell as BellIcon } from '../icons/bell';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import { Users as UsersIcon } from '../icons/users';
import { AccountPopover } from './account-popover';
import not_user_img from '../icons/header/user.svg';
import Button from '@mui/material/Button';
import { changeIsVisibleProfile, changeProfile, changePassword } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import loadingScreen from '../icons/preload.json';
import Lottie from 'lottie-react';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const dispatch = useDispatch()
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const { onSidebarOpen, ...other } = props;
  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);
  const {user, isVisibleProfile, loadingProfile, secondeLoadProfile} = useSelector((state)=> state.auth)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [avatar, setFile] = useState('')
  const [errors,setErrors] = useState('')

  const [password, setPassword] = useState('')
  const [repeat_password, setRepeatPassword] = useState('')

  const saveImage = (img) => {
    setFile(img.target.files[0])
  }
  useEffect(() => {
    setName(user.name)
    setEmail(user.email)
  }, [isVisibleProfile])
  

  const changeUserPassword = ()=> {
    if(password !== repeat_password){
      setErrors('Пароли не совпадают')
    }else{
      setErrors('')
      dispatch(changePassword({password: password, isVisiblePassword: setIsVisiblePassword})) 
    }
  }

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
{isVisibleProfile &&
    <>
     <div className={`custom_sidebar`}>
        <div sx={{color: 'black'}} className={`nomenclature_detail`}>Изменить Пользователя</div>
        {
          !isVisiblePassword ? 
          <>
            <TextField onChange={(e)=> setName(e.target.value)} value={name} id="standard-basic12" label="Имя" variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
            <TextField onChange={(e)=> setEmail(e.target.value)} value={email} id="standard-basic13" label="Email" variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>  
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
            <div onClick={()=> setIsVisiblePassword(true)} className={`btn_save_change`}><span>Изменить пароль</span></div>
            <div className={`btn_group`}>
              <div className={`btn_group_wrapper`}>
                <div  onClick={()=> dispatch(changeIsVisibleProfile())} className={`btn_cancel`}><span>Отмена</span></div>
                <div onClick={()=> dispatch(changeProfile({
                    email: email,
                    name: name,
                    avatar: avatar,
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
          <div onClick={()=> dispatch(changeIsVisibleProfile())} className={`custom_zagl`}>
        </div>
        </>
    }

          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar
            onClick={() => setOpenAccountPopover(true)}
            ref={settingsRef}
            sx={{
              cursor: 'pointer',
              height: 40,
              width: 40,
              ml: 1
            }}
            // src="/static/images/avatars/avatar_1.png"
            src={user.avatar ? `${user.avatar}` : `${not_user_img}`}
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
      <AccountPopover
        setOpenAccountPopover={setOpenAccountPopover}
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      />

      {loadingProfile &&
      !secondeLoadProfile &&
      <div className='loading'><Lottie className='spinner_app' animationData={loadingScreen} /></div>
      }
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
