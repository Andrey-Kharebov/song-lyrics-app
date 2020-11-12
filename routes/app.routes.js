const { Router } = require('express');
const router = Router();
const Band = require('../models/band');

router.get('/', (req, res) => {
  try {
    const game = 'Resident Evil 3: Nemesis';

  } catch (e) {
    res.status(500).json({ message: `Что-то пошло не так. Попробуйте снова.`})
  }
})

router.post('/band', async (req, res) => {
  try {
    const { title } = req.body;

    console.log(title);

    // const candidate = await Band.findOne({ title });

    // if (candidate) {
    //  return res.status(400).json({ message: `Такая группа уже существует` }); 
    // }

    // const band = new Band({ title });

    // await band.save();

    // res.status(201).json({ message: `Группа ${ title } была добавлена в список групп.`});
  } catch (e) {
    res.status(500).json({ message: `Что-то пошло не так. Попробуйте снова.`});
  }
})

module.exports = router;
