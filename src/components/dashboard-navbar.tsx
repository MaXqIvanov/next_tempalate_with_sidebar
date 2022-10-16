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
import { useDispatch, useSelector } from 'react-redux';
import loadingScreen from '../icons/preload.json';
import Lottie from 'lottie-react';

const DashboardNavbarRoot = styled(AppBar)(({ theme }:any) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const dispatch = useDispatch()
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const { onSidebarOpen, ...other } = props;
  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState<boolean>(false);
  const [avatar, setFile] = useState('')
  const [errors,setErrors] = useState('')

  const [password, setPassword] = useState('')
  const [repeat_password, setRepeatPassword] = useState('')

  const saveImage = (img) => {
    setFile(img.target.files[0])
  }
  

  const changeUserPassword = ()=> {
    if(password !== repeat_password){
      setErrors('Пароли не совпадают')
    }else{
      setErrors('')
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
            // src={user.avatar ? `${user.avatar}` : `${not_user_img}`}
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

      {/* {loadingProfile &&
      !secondeLoadProfile &&
      <div className='loading'><Lottie className='spinner_app' animationData={loadingScreen} /></div>
      } */}
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
