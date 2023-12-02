// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const CardAppleWatch = () => {
  return (
    <Card>
      <CardMedia sx={{ height: 140 }} image='/images/cards/apple-watch.png' />
      <CardContent sx={{ p: theme => `${theme.spacing(4, 5)} !important` }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Titulo Curso
        </Typography>
        <Typography sx={{ mb: 2 }}>Categoria del Curso</Typography>
        <Typography variant='body2'>
          Breve descripcion del curso
        </Typography>
      </CardContent>
      <Button size='large' variant='contained' sx={{ width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
        Ver Curso
      </Button>
    </Card>
  )
}

export default CardAppleWatch
