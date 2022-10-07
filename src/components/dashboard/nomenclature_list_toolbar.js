import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography,
} from '@mui/material';
import {useState} from 'react'
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import { useDispatch, useSelector } from 'react-redux';
import {changeNomenclature} from '../../store/nomenclatureSlice';

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
  const {nomenclature_nav} = useSelector((state)=> state.nomenclature)
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
        {nav_elem && nav_elem.map((elem)=>
                <Button
                onClick={()=> dispatch(changeNomenclature(elem.id))}
                key={elem.TextField}
                sx={{m: 1}}
                color={`${elem.id === nomenclature_nav ? 'secondary' : 'primary'}`}
                variant="contained"
              >
                {elem.title}
              </Button>
        )}
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
