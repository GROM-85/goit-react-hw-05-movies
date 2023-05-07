import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';



export const MoviePagination = ({count,onChange=()=>null,page}) =>{
  console.log('totalPages',count)
    return (
    <Stack spacing={2}>
        <Pagination
          sx={{button:{color:'white'},
          ul: {
            '& .MuiPaginationItem-root': {
               '&.Mui-selected': {
                 background: '#cd582d',
                 color: 'white',
                 borderRadius: '10%',
               },
            },
            '& .MuiPaginationItem-ellipsis':{
              color:'white',
            }
          },}}
          shape="rounded"
          count={count}
          page={page}
          onChange={onChange}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>)
}