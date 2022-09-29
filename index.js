const express = require('express')

const app = express()

app.use(express.json())

app.use((err, req, res, next) => {
    if(err.status === 400)
      return res.status(err.status).json({error: "Could not decode request: JSON parsing failed"})
  
    return next(err); // if it's not a 400, let the default error handling do it. 
  });

app.post('/', (req, res) => {
         try{
         const result = req.body.payload.reduce(function(pV, movie){
            if (movie.drm && movie.episodeCount) {
                pV.push({
                    image: movie.image.showImage, slug: movie.slug, title: movie.title
                }); 
            }
            return pV; 
          }, []); 
         res.status(200).json({response: result})
        } catch(error) {
            res.status(400).json({error: "Could not decode request: JSON parsing failed"})
        }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
