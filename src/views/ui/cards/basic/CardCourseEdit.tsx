// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { CourseStatsProps } from './types'
import router, { useRouter } from "next/router";
import Rating from '@mui/material/Rating'
import React, { useState } from 'react'


const CoursePreviewEdit = (props: CourseStatsProps) => {
  // ** Props
  const { courseId, image, title, category, description, value } = props;
  const [data, setData] = useState('');
  
  function handleClick() {
    router.push(`/editCourse?courseId=${courseId}`);
    //alert(`El valor enviado es ${id}`)
  }


  return (
    <Card>
      <CardMedia sx={{ height: 140 }} image={image} />
      <CardContent sx={{ p: theme => `${theme.spacing(4, 5)} !important` }}>
        <Typography variant='h6' sx={{ mb: 2 }} textAlign={"center"}>{title}</Typography>
        <Typography sx={{ mb: 2 }}>{category}</Typography>
        <Typography sx={{ height: 40 }} variant='body2'>{description}</Typography>
        <Rating name="read-only" value={value} readOnly />
      </CardContent>
      <Button  onClick={handleClick}  size='large' variant='contained' sx={{ width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
        Editar Curso
      </Button>
    </Card>
  )
}


export default CoursePreviewEdit

