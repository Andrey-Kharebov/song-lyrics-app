const { Router } = require('express');
const router = Router();
const Band = require('../models/band');
const Song = require('../models/song');
const Lyrics = require('../models/lyrics');

// GET
router.get('/bands', async (req, res) => {
  try {
    const bands = await Band.find();
    // console.log(bands);

    res.status(201).json({ bands });
  } catch (e) {
    res.status(500).json({ message: `Что-то пошло не так. Попробуйте снова.`})
  }
})

router.get('/songs/:id', async (req, res) => {
  try {
    const songs = await Song.find({ owner: req.params.id });

    res.status(201).json({ songs });
  } catch (e) {
    res.status(500).json({ message: `Что-то пошло не так. Попробуйте снова.`})
  }
})

router.get('/lyrics/:id', async (req, res) => {
  try {
    const lyrics = await Lyrics.find({ owner: req.params.id });

    res.status(201).json({ lyrics });
  } catch (e) {
    res.status(500).json({ message: `Что-то пошло не так. Попробуйте снова.`})
  }
})

// POST
router.post('/band', async (req, res) => {
  try {
    const { title } = req.body;

    console.log(title);

    const candidate = await Band.findOne({ title });

    if (candidate) {
      return res.status(400).json({ message: `Исполнитель "${ title }" уже существует` }); 
    }

    const band = new Band({ title });

    await band.save();

    res.status(201).json({ message: `Исполнитель "${ title }" был добавлен в список муз. исполнителей.`});
  } catch (e) {
    res.status(500).json({ message: `Что-то пошло не так. Попробуйте снова.`});
  }
})

router.post('/song', async (req, res) => {
  try {
    const { title, bandId } = req.body;
    
    const candidate = await Song.findOne({ title, owner: bandId });

    if (candidate) {
      return res.status(400).json({ message: `Песня "${ title }" уже существует.` }); 
    }
 
    const song = new Song({ title, owner: bandId });
 
    await song.save();
 
    res.status(201).json({ message: `Песня "${ title }" была добавлена в список песен.`});
  } catch (e) {
    res.status(500).json({ message: `Что-то пошло не так. Попробуйте снова.`});
  }
})

router.post('/lyrics', async (req, res) => {
  try {
    const { lyrics, songId } = req.body;
    
    const candidate = await Song.findOne({ owner: songId });

    if (candidate) {
      return res.status(400).json({ message: `Текст уже есть` }); 
    }
 
    const songLyrics = new Lyrics({ lyrics, owner: songId });
 
    await songLyrics.save();
 
    res.status(201).json({ message: `Текст песни был добавлен`});
  } catch (e) {
    res.status(500).json({ message: `Что-то пошло не так. Попробуйте снова.`});
  }
})

router.post('/lyrics/edit', async (req, res) => {
  const { lyricsId, lyrics } = req.body;

  await Lyrics.findByIdAndUpdate(lyricsId, { lyrics: lyrics });
  res.status(201).json({ message: `Текст песни был обновлен`});
})


module.exports = router;
