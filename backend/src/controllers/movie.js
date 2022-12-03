const { Movie } = require('../models');

const updateMovieById = async (req, res) => {
  try {
    const { userId } = res.locals;
    const { movieId } = req.params;

    const updatingMovie = await Movie.findOne({
      where: { id: movieId },
      attribute: ['userId']
    });

    if (updatingMovie.userId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const [_, movie] = await Movie.update(
      req.body,
      {
        where: { id: movieId },
        returning: true,
        plain: true
      }
    );
    res.json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
}

const deleteMovieById = async (req, res) => {
  try {
    const { userId } = res.locals;
    const { movieId } = req.params;

    const deletingMovie = await Movie.findOne({
      where: { id: movieId },
      attribute: ['userId']
    });

    if(!deletingMovie) {
      return res.status(404).json({ message: 'Not found' })
    }

    if (deletingMovie.userId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await Movie.destroy({ where: { id: movieId } });
    const movies = await Movie.findAll({
      order: [
        ['release_date', 'DESC']
      ],
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json(error);
  }
}

const getMovieById = async (req, res) => {
  try {
    const { userId } = res.locals;
    const { movieId } = req.params;
    const movie = await Movie.findOne({ where: { id: movieId } });
    if(!movie) {
      return res.status(404).json({ message: 'Not found' })
    }
    if (movie.userId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
}

const getAllMovies = async (req, res) => {
  try {
    const { userId } = res.locals;
    const movies = await Movie.findAll({
      where: { userId },
      order: [
        ['release_date', 'DESC']
      ],
      attributes: {
        exclude: ['userId']
      },
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json(error);
  }
}

const addMovie = async (req, res) => {
  try {
    const { userId } = res.locals;
    const movie = await Movie.create({
      userId,
      name: req.body.name,
      rate: req.body.rate,
      trailerSrc: req.body.trailerSrc,
      description: req.body.description,
      releaseDate: req.body.releaseDate,
      thumbnailSrc: req.body.thumbnailSrc,
    });
    res.json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  addMovie,
  getMovieById,
  getAllMovies,
  deleteMovieById,
  updateMovieById
}
