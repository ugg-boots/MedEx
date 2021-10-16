import React, {useState, useEffect} from 'react';
import { Typography,Box } from '@mui/material';
import dayjs from 'dayjs';
import columnDefinitions from './columns.js';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import '../styles.scss';
import { useSelector } from 'react-redux';

// const useStyles = makeStyles({
// 	underline: {
// 		borderBottom: '0px solid red !important',
// 		'&:hover': {
// 			borderBottom: '0px solid rgba(0,0,0,0)',
// 		},
// 	},
// });
//declared a functional component that will make a fetch request to api/inventory endpoint
const ExpirationView = () => {
  // const classes = useStyles();
    const [data, setData] = useState([]);
    const userId = useSelector((state) => state.auth.userId)
    
    const getData = () => {
        fetch(`/api/expiration/${userId}`)
        .then(res => res.json())
        .then((tableElements) => {
          if (!Array.isArray(tableElements)) tableElements = [];
          setData(tableElements);
          })
        .catch(err => console.log('Table.componentDidMount: get tableElement: ERROR: ', err));
      }
    
      useEffect(() => {
        getData();
        return undefined;
      }, [])

      const rows = [];
      const now = dayjs();
      const cutoff = now.add(3, 'months');
      data.forEach((element, index) => {
        const expyDate = dayjs(element.expiration_date);
        if (expyDate.isBefore(cutoff)) {
            element.id = index + 1; 
            rows.push(element)};
        })

    return (
			
				<div>
        <Typography variant="h5"> Expiring soon</Typography>
					<div style={{ height: 300, width: '150%' }}>
						<DataGrid rows={rows} columns={columnDefinitions.expiration} />
					</div>
				</div>
			
		);
}

export default ExpirationView