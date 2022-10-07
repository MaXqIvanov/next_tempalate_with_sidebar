import PropTypes from 'prop-types';
import { Card } from '@mui/material';
import { DropzoneArea } from "mui-file-dropzone";

export const ProductCard = ({...rest }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <DropzoneArea filesLimit={2} onChange={(files) => console.log('Files:', files)} className={`drop_zone_area`}/>
  </Card>
);

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};
