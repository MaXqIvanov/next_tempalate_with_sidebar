import { useContext, useState, useEffect } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Box, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { AuthContext } from '../contexts/auth-context';
import { auth, ENABLE_AUTH } from '../lib/auth';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// changeProfile

export const AccountPopover = (props) => {
  const dispatch = useDispatch()
  const { anchorEl, onClose, open, ...other } = props;
  const authContext = useContext(AuthContext);
  // const [user_name, setUserName] = useState('Макс Иванов')
  const handleSignOut = async () => {
    Router
      .push('/sign-in')
      .catch(console.error);
  };

  

  return (
    <>
     <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: '300px' }
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline" sx={{cursor: 'pointer'}}>
          Аккаунт
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
          sx={{cursor: 'pointer'}}
        >
          any_name_user
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          '& > *': {
            '&:first-of-type': {
              borderTopColor: 'divider',
              borderTopStyle: 'solid',
              borderTopWidth: '1px'
            },
            padding: '12px 16px'
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Выход
        </MenuItem>
      </MenuList>
    </Popover>
    </>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
