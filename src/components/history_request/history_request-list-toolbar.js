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
import { useDispatch, useSelector } from 'react-redux';
import {useState, useEffect} from 'react'
import { getHistoryRequest, setPage } from '../../store/historyRequestSlice';
import useDebounce from '../../hooks/use-debounce';

export const HistoryRequestListToolbar = (props) => {
  const dispatch = useDispatch()
  const {current_page} = useSelector((state)=> state.history_request)
  const [search_history_request, setSearchHistoryRequest] = useState('')
  const debouncedSearchTerm = useDebounce(search_history_request, 300);
  useEffect(() => {
    dispatch(getHistoryRequest({search: search_history_request, page: current_page}))
  }, [debouncedSearchTerm, current_page])

  useEffect(() => {
    dispatch(setPage(1));
  }, [debouncedSearchTerm])

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
        История запросов
      </Typography>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              value={search_history_request}
              onChange={(e)=> setSearchHistoryRequest(e.target.value)}
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
              placeholder="Поиск по истории запросов"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
)};
