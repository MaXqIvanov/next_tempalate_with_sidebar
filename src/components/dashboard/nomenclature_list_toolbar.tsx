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
import useDebounce from '../../hooks/use-debounce';

export const NomenclatureList = (props) => {
  const dispatch = useDispatch()
  const nav_elem = [
    {
      id: 1,
      title: 'Таблица'
    },
    {
      id: 2,
      title: 'Дерево'
    }
  ]
  const [search_nomenclature, setSearchNomenclature] = useState<string>('')
  const debouncedSearchTerm = useDebounce(search_nomenclature, 300);
  

  
  
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
        Номенклатура
      </Typography>
      <Box sx={{ m: 1 }}>

        <Button
          sx={{m: 1}}
          color="primary"
          variant="contained"
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
              autoComplete='off'
              value={search_nomenclature}
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
              placeholder="Поиск по номенклатуре"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>

)};
