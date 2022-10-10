import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPage, getUsers } from '../../store/usersSlice';

export const UserListToolbar = (props) => {
  const dispatch = useDispatch()
  const [search_users, setSearchUsers] = useState('')
  const {current_page, change_info_user} = useSelector((state)=> state.users)

  useEffect(() => {
    dispatch(getUsers({search: search_users}))
  }, [search_users, current_page, change_info_user])

  useEffect(() => {
    dispatch(setPage(1));
  }, [search_users])

return(
  <Box {...props}>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h4"
      >
        Пользователи
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button
          sx={{m: 1}}
          color="primary"
          variant="contained"
          onClick={()=> props.setIsVisibleSidebar(true)}
        >
          Добавить+
        </Button>
      </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              value={search_users}
              onChange={(e)=> setSearchUsers(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Поиск пользователя"
              variant="outlined"
              autoComplete='false'
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
)};
