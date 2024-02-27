import axios from "axios";

const API_URL = "http://localhost:3006/api/genres";

export async function getGenre() {
  try {
    const res = await axios(API_URL);
    const { data } = res;
    return data;
  } catch (error) {
    console.error(error.message);
  }
}
export async function createGenreApi(newGenre) {
  try {
    const res = await axios(API_URL, {
      method: "POST",
      data: {
        title: newGenre.genre,
      },
    });
    console.log(res.data);
    const { data } = res;
    return data;
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 409) {
      throw new Error("Genre title already exists");
    }

    if (newGenre.genre.length < 2) {
      throw new Error("Genre title must be at least 2 characters long.");
    }
    throw new Error("Genre could not be created");
  }
}

export async function updateGenreApi(genreId, updateGenre) {
  try {
    const res = await axios(`${API_URL}/${genreId}`, {
      method: "PUT",
      data: {
        title: updateGenre.genre,
      },
    });

    const { data } = res;
    return data;
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 409) {
      throw new Error("Genre title already exists");
    }

    if (updateGenre.genre.length < 2) {
      throw new Error("Genre title must be at least 2 characters long.");
    }
    throw new Error("Genre could not be created");
  }
}
export async function deleteGenreApi(_id) {
  try {
    const res = await axios(API_URL, {
      method: "DELETE",
      data: {
        _id,
      },
    });
    // console.log(res);
    const { data } = res;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Genre could not be deleted");
  }
}
