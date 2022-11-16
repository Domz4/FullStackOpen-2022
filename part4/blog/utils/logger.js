const info = (...params) => {
<<<<<<< HEAD
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};

const error = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(...params);
  }
};

module.exports = { info, error };
=======
  console.log(...params);
};

const error = (...params) => {
  console.error(...params);
};

module.exports = {
  info,
  error,
};
>>>>>>> 916c54219680dfb64e3f87aafe43fc3595966509
