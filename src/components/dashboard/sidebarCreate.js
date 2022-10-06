import styles from '../../scss/MainScreen.module.scss';
import TextField from '@mui/material/TextField';

  export const Sidebar = (props) => {
    return (
    <>
    <div className={`custom_sidebar`}>
        <div className={`nomenclature_detail`}>Добавить номенклатуру</div>
        <TextField id="standard-basic" label="Артикул" variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>
        <TextField id="standard-basic" label="Название" variant="standard" sx={{mt: 1}} className={`custom_nomenclature_input`}/>

        <div className={`btn_group`}>
          <div className={`btn_group_wrapper`}>
            <div className={`btn_cancel`}><span>Отмена</span></div>
            <div className={`btn_delete`}><span>Удалить</span></div>
            <div className={`btn_save`}><span>Сохранить</span></div>
          </div>
        </div>

        <div className={`nomenclature_detail`}>Параметры поиска</div>
    </div>
    <div onClick={()=> props.setIsVisibleSidebar(false)} className={`custom_zagl`}>
        
    </div>
    </>
  )};
  