import styles from '../../scss/MainScreen.module.scss';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useState} from 'react'
import delete_img from '../../icons/nomenclature/delete_img.svg';

  export const SidebarCreate = (props) => {
    const [isVisiblePassword, setIsVisiblePassword] = useState(false)
    const [article_search, setArticleSearch] = useState([
      {
        id: 1,
        title: 'YDN10-0100'
      },
      {
        id: 2,
        title: 'YDN20-0100'
      },
      {
        id: 3,
        title: 'YDN30-0100'
      },
      {
        id: 4,
        title: 'YDN30-0100'
      },
      {
        id: 5,
        title: 'YDN30-0100'
      },
    ])

    const changeName = ({elem, value})=>{
      let new_elem = article_search
      new_elem[value-1].title = elem
      setArticleSearch([...new_elem])
    }

    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

    return (
    <>
    <div className={`custom_sidebar`}>
        <div className={`nomenclature_detail`}>Добавить Пользователя</div>
        {
          !isVisiblePassword ? 
          <>
            <TextField id="standard-basic" label="Логин" variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
            <TextField id="standard-basic" label="Имя" variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
            <TextField id="standard-basic" label="Email" type={'email'} variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
            <div onClick={()=> setIsVisiblePassword(true)} className={`btn_save_change`}><span>Изменить пароль</span></div>
            <FormControlLabel
              sx={{mt: 2}}
              control={
                <Switch checked={checked} onChange={handleChange} name="gilad" />
              }
              label="Активный"
            />
            <div className={`btn_group`}>
              <div className={`btn_group_wrapper`}>
                <div className={`btn_cancel`}><span>Отмена</span></div>
                <div className={`btn_delete`}><span>Удалить</span></div>
                <div className={`btn_save`}><span>Сохранить</span></div>
              </div>
            </div>
          </>
          :
          <div>
            <TextField id="standard-basic" label="Новый пароль" type={'password'} variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
            <TextField id="standard-basic" label="Повторить пароль" type={'password'} variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
            <div className={`btn_group`}>
              <div className={`btn_group_wrapper`}>
                <div onClick={()=> setIsVisiblePassword(false)} className={`btn_cancel`}><span>Отмена</span></div>
                <div className={`btn_save`}><span>Сохранить</span></div>
              </div>
            </div>
          </div>
        }
    </div>
      <div onClick={()=> props.setIsVisibleSidebar(false)} className={`custom_zagl`}>
    </div>
    </>
  )};
  