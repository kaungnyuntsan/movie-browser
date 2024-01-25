const movies = [
  "Iron man",
  "Spider man",
  "Tom and Jerry",
  "Batman",
  "John Wick",
  "Scream",
  "Halloween",
  "Captain America",
  "Mission Impossible",
  "Terminator",
  "Matrix",
  "Toy Story",
  "Die Hard",
  "Fast and Furious",
  "Rush Hour",
  "Jaws",
  "X-men",
  "Pirates of the Caribbean",
  "The Mummy",
  "Saw",
  "The Conjuring",
];

export const getRandomInt = (max: number, min = 0) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

export const randomMovies = () => {
  const arr = [];
  while (arr.length < 3) {
    const num = getRandomInt(movies.length);
    const movie = movies[num];
    if (arr.indexOf(movie) === -1) arr.push(movie);
  }
  return arr;
};
