import './main.css';
import React from 'react';
import {DenseAppBar} from './header';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Pagination from "@mui/material/Pagination";

function ActionAreaCard({characterDetails}) {
  return (
    <div className="col-lg-4 col-sm-6 col-xs-12" style={{ boxSizing:"border-box", textAlign:"center"}}>
      <div className='card_layout'>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image={characterDetails.image}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div" className='character_name'>
                Name= {characterDetails.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <p>species= {characterDetails.species}</p>
                <p>gender={characterDetails.gender}</p>
                <p>Origin={characterDetails.origin.name}</p>
                <p>Location={characterDetails.location.name}</p>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}


export function Home(){
  const [listOfCharacters, setListOfCharacters]= React.useState([])
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1)

  const handleChange = (event, value) => {
    setPage(value);
  };

  React.useEffect(()=>{
    fetch("https://rickandmortyapi.com/api/character/?page="+page)
      .then(x => x.json())
      .then(function(backend_output){
        setPages(backend_output.info.pages)
        setListOfCharacters(backend_output.results)
      })
  }, [page])

  return (
    <>
      <DenseAppBar/>
      <div className='main_div'>
        <div className="hsplit">
          {listOfCharacters.map((characterDetails) => (
            <ActionAreaCard key={characterDetails.id}
            characterDetails={characterDetails}/>
          ))}
        </div>
        <div className="hsplit">
          <div className="col-lg-4 col-sm-6 col-xs-12">
            <div className="pagination">
              <Pagination
                count={pages}
                variant="outlined"
                shape="rounded"
                page={page}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

