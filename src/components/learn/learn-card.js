import PropTypes from 'prop-types';
import { Card } from '@mui/material';
import { DropzoneArea } from "mui-file-dropzone";
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getLearn } from '../../store/learnSlice';

export const LearnCard = ({...rest }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    let myClasses = document.querySelectorAll("p.MuiTypography-root");
    // document.getElementById('personlist').getElementsByTagName('option')
    for (var i = 0; i < myClasses.length; i++) {
      myClasses[i].innerHTML = "Выберите или перетащите обучающий файл";
      }
  }, [])
  
  return(
  <Card
    className={`card_learn`}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <DropzoneArea filesLimit={2} onChange={(files) => dispatch(getLearn({file: files[0]}))} className={`drop_zone_area`}/>
  </Card>
)};

LearnCard.propTypes = {
  product: PropTypes.object.isRequired
};
