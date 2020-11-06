// Mock storage for our es data
const db = {
  results: 0,
  values: [],
};

const indexPost = ({ text, id, title, published, author }) => {
  db.values.push({
    index: 'posts',
    type: 'post',
    id,
    body: {
      text,
      title,
      published,
      author,
    },
    score: 10,
  });
  db.results = db.values.length;
  return Promise.resolve();
};

const deletePost = (postId) => {
  db.values = db.values.filter((value) => Object.values(value).includes(postId));
  db.results = db.values.length;
  return Promise.resolve();
};

const search = (keyword = '') => {
  const filtered = db.values.filter((value) => value.body.text.includes(keyword));
  return Promise.resolve({
    results: filtered.length,
    values: filtered.map((value) => ({ id: value.id })),
  });
};

const checkConnection = () => Promise.resolve();

const waitOnReady = () => Promise.resolve();

module.exports = {
  // Expose the internal db for testing
  db,
  indexPost,
  deletePost,
  checkConnection,
  search,
  waitOnReady,
};
