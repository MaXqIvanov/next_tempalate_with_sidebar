import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography,
} from '@mui/material';
import {useState, useEffect} from 'react'
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import { useDispatch, useSelector } from 'react-redux';
import {changeNomenclature} from '../../store/nomenclatureSlice';
import { setPage, getIpCLient } from '../../store/ipClientSlice';

export const IPClientsList = (props) => {
  const dispatch = useDispatch()
  const [search_ip_client, setSearchIpClient] = useState('')

  const {current_page, changed_ip_clients} = useSelector((state)=> state.ip_clients)

  useEffect(() => {
    dispatch(getIpCLient({search: search_ip_client}))
  }, [search_ip_client, current_page, changed_ip_clients])

  useEffect(() => {
    dispatch(setPage(1));
  }, [search_ip_client])

  return (
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
        IP-Клиенты
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
              onChange={(e)=> setSearchIpClient(e.target.value)}
              value={search_ip_client}
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
              placeholder="Поиск по ip-клиентам"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>

)};
