const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const repos = repositories

  response.json(repos)
  
});

app.post("/repositories", (request, response) => {
  const { title, url , techs} = request.body

  const repository = {
    id:uuid(),
    title,
    url,
    techs,
    likes:0,
  }
  
 repositories.push(repository)

  
  return response.json(repository)


});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const repoIndex = repositories.findIndex(repository => repository.id===id)

  if(repoIndex===-1){
    return response.status(400).json({error:" Repository dows not exits"})
  }

  const repository = {
      id,
      title,
      url,
      techs,
      likes: repositories[repoIndex].likes,     
    };

    repositories[repoIndex] = repository

   return response.json(repository)
  } 

);

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repoIndex = repositories.findIndex(repository => repository.id === id);

  if (repoIndex >= 0){
    repositories.splice(repoIndex,1)
    }else{
      return response.status(400).json({error:"Repository not found"})
    }
  

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params
  const repoIndex = repositories.findIndex(repository => repository.id===id)
  if(repoIndex===-1){
    return response.status(400).json({error:" Repository dows not exits"})
  }
  repositories[repoIndex].likes+=1;
  
  return response.json(repositories[repoIndex]);

});

module.exports = app;
