import { useRouter } from 'next/router'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import FormCreateConsultation from 'src/views/forms/form-layouts/FormCreateConsultation'

const CreateConsultation = () => {
  const router = useRouter()
  const userId = router.query.userId

  return (
    <DatePickerWrapper>
      <FormCreateConsultation userId={userId} />
    </DatePickerWrapper>
  )
}

export default CreateConsultation
