// ** React Imports
import { ReactNode } from 'react'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type CourseStatsProps = {
  courseId: string;
  title: string;
  image: string;
  category: string;
  description: string;
  value:number;
};
