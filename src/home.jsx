import './main.css';
import React from 'react';
import {DenseAppBar} from './header';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Pagination from "@mui/material/Pagination";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 1,
  px: 2,
  pb: 0,
};

function ActionAreaCard({characterDetails}) {
  const [open, setOpen] = React.useState(false);
  const [origininfo, setOrigininfo] = React.useState({residents: []});
  const [locationinfo, setLocationinfo] = React.useState({residents: []});
  const [episodeList,setEpisodeList] = React.useState([])

  const handleOpen = () => {
    setOpen(true);
    fetch(characterDetails.origin.url)
    .then(x => x.json())
    .then(function(backend_output){
      setOrigininfo(backend_output)  
    })

    fetch(characterDetails.location.url)
    .then(x => x.json())
    .then(function(backend_output){
      setLocationinfo(backend_output)
      
    })
    if (characterDetails.episode.length> 0){
      const episode_api = "https://rickandmortyapi.com/api/episode/[" + characterDetails.episode.map(x => x.split("/").pop()).join(",")+"]"

      fetch(episode_api)
      .then(x => x.json())
      .then(function(backend_output){
        console.log("backend_output===", backend_output)
        setEpisodeList(backend_output) 
      })
    } 
    
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="col-lg-4 col-sm-6 col-xs-12" style={{textAlign:"center"}}>
      <div className='card_layout'>
        <Card className='card_radius' sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            image={characterDetails.image}
            alt="green iguana"
          />
          <CardContent style={{textAlign:"left",}}>
            <Typography gutterBottom variant="h6" component="div" className='character_name'>
              {characterDetails.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <div className='content_dives'>
                <span class="material-icons pointer" style={{color : (characterDetails.status == "Dead" ? "rgb(214, 61, 46)" :"rgb(85, 204, 68)" )}}>
                fiber_manual_record
                </span>
                <span className='title_in_card'> {characterDetails.status} - </span>
                <span className='title_in_card' >
                  {characterDetails.species} ({characterDetails.gender})
                </span>
              </div>
              <div className='content_dives'>
                <span className='title_in_card' >Origin : </span>
                <span  className='color_change' style={{}} >{characterDetails.origin.name}</span>
              </div>
              <div className='content_dives'>
                <span className='title_in_card'>Location : </span>
                <span className='color_change'  style={{}} >{characterDetails.location.name}</span>
              </div>

              <div className='moredetails' onClick={handleOpen}>See more... </div>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <div>
                  <Box sx={{ ...style, width: 500, borderRadius:"5px"}}>
                    <div className='popup'  >
                      <div className='title_in_pop'> Origin Dimension</div>
                      <div className='subdetails'>{origininfo.dimension}</div>
                      <div className='title_in_pop' > Residents Amount Of Origin </div>
                      <div className='subdetails'>{origininfo.residents.length}</div>
                      <div className='title_in_pop'>Location Dimension</div>
                      <div className='subdetails'>{locationinfo.dimension}</div>
                      <div className='title_in_pop'> Residents Amount Of Location </div>
                      <div className='subdetails'>{locationinfo.residents.length}</div>
                      
                      <div className='episode_name_title'> Episode Names</div>
                      <hr></hr> 
                      <div className='episode_names_list'>
                        {episodeList.map((x, index)=>(
                          <div className='all_episode_name' >{index+1}. {x.name}</div>
                        ))}
                      </div> 
                    </div>
                  </Box>
                </div>
              </Modal>                
            </Typography>
          </CardContent>
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

