const axios = require('axios')
const Anime = require('../models/anime')

const animesGet = async (req, res) => {
    const { title } = req.query
    const regTitle = new RegExp(title, 'i')

    const animes = await Anime.find( {title: regTitle} )

    if (animes.length === 0) {

        // External API petition
        const responseExtApi = await axios.get('https://api.jikan.moe/v4/anime', {
            params: { q: title }
        })
          .catch(error => {
              console.error("Error consulting animes from an external API:", error)
              return res.status(500).json({
                msg: "No se pudo recuperar los animes solicitados",
                animes: [],
              });
          })

        // Creating a new array for the external animes
        const animesExtApi = responseExtApi.data.data.map(anime => {
            const { title, genres, synopsis, year, images } = anime
            return { title, genres, synopsis, year, images }
        })

        // Adding it to my DB
        Anime.insertMany(animesExtApi)
          .catch((error) => {
            console.error("Error on insert animes from external API:", error)
          })

        // Return it the data to the user
        return res.status(200).json({
            msg: 'Animes de API externa',
            animes: animesExtApi
        })
    }

    res.status(200).json({
        msg: 'Animes obtenidos',
        animes
    })
}

module.exports = {
    animesGet
}