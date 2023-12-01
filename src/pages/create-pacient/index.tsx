// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormLayoutsBasic from 'src/views/forms/form-layouts/FormLayoutsBasic'
import FormLayoutsIcons from 'src/views/forms/form-layouts/FormLayoutsIcons'
import FormLayoutsSeparator from 'src/views/forms/form-layouts/FormLayoutsSeparator'
import FormLayoutsAlignment from 'src/views/forms/form-layouts/FormLayoutsAlignment'
import FormLayoutsCollapsible from 'src/views/forms/form-layouts/FormLayoutsCollapsible'
import FormCreatePacients from 'src/views/forms/form-layouts/FormCreatePacients'

const CreatePatientForm = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={8}>
        <Grid item xs={12} md={12}>
          <FormCreatePacients />
        </Grid>
      </Grid>

    </DatePickerWrapper>
  )
}

export default CreatePatientForm
