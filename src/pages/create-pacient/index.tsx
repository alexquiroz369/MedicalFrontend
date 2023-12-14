// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import FormCreatePacients from 'src/views/forms/form-layouts/FormCreatePacients'

const CreatePatientForm = () => {
  return (
    <DatePickerWrapper>
          <FormCreatePacients />
    </DatePickerWrapper>
  )
}

export default CreatePatientForm
