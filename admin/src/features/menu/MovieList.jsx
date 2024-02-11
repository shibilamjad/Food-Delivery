import styled from "styled-components";
import { device } from "../../ui/device";
import { useMovies } from "./useMovies";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { Loader } from "../../ui/Loader";
import { useDeleteMovie } from "./useMovieDelete";
import { Empty } from "../../ui/Empty";
import ReactStars from "react-rating-stars-component";
import { useMovieUpdateContext } from "../../context/MovieUpdateContext";
import { useNavigate } from "react-router-dom";

export function MovieList() {
  const { movies, isLoading } = useMovies();
  const { deleteMovie } = useDeleteMovie();
  const { setIsEditing, setSelectedMovie, setSelectedMovieId } =
    useMovieUpdateContext();
  const navigate = useNavigate();

  function onEditMovie(movieId) {
    setIsEditing(true);
    setSelectedMovieId(movieId);
    const selected = movies.find((item) => item._id === movieId);
    setSelectedMovie(selected);
    navigate(`/movie/${movieId}`);
  }

  if (isLoading) return <Loader />;

  if (movies.length === 0) return <Empty>Please upload Menu</Empty>;
  return (
    <>
      {movies.map((movie) => (
        <Box key={movie._id}>
          <StyledCard>
            <StledContainer>
              <div>
                <Img src={movie.image} alt={movie.title} />
              </div>
              <StyledContent>
                <h2 className="card-title">{movie.title}</h2>
                <StyledGenre>
                  {movie.genre &&
                    movie.genre.map((genre) => (
                      <div key={genre._id} className="badge badge-secondary ">
                        {genre.title}
                      </div>
                    ))}
                </StyledGenre>
                <ReactStars
                  count={5}
                  size={24}
                  value={movie.ratings}
                  edit={false}
                  activeColor="#ffd700"
                />

                <StyledButton>
                  <Button onClick={() => onEditMovie(movie._id)}>
                    <HiPencil />
                  </Button>
                  <Button onClick={() => deleteMovie(movie._id)}>
                    <HiTrash />
                  </Button>
                </StyledButton>
              </StyledContent>
            </StledContainer>
          </StyledCard>
        </Box>
      ))}
    </>
  );
}
const Box = styled.div`
  width: 400px;
  background-color: #3730a3;
  border-radius: 10px;

  @media ${device.laptopL} {
    width: 400px;

    transition: all 0.5;
  }
  @media ${device.laptop} {
    width: 400px;

    transition: all 0.5;
  }
  @media ${device.tablet} {
    width: 400px;

    transition: all 0.5;
  }
  @media ${device.mobileL} {
    width: 260px;
    height: 100%;
    transition: all 0.5;
  }
  @media ${device.mobileS} {
    width: 260px;
    height: 100%;
    transition: all 0.5;
  }
`;

const StyledCard = styled.div`
  width: 100%;
  height: 290px;
  border-radius: 10px;
  transition: all 0.5s;
  img {
    width: 100%;
    height: 290px;
    border-radius: 10px 0 0 10px;
  }
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
`;
const StledContainer = styled.div`
  display: grid;
  border-radius: 10px;
  grid-template-columns: 1fr 1fr;
`;
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  /* align-items: start; */
  justify-content: space-between;
  gap: 10px;
  /* margin-top: 20px; */
`;

const StyledGenre = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: start;
`;
const StyledButton = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: end;
  gap: 20px;
  font-size: 20px;
`;
const Button = styled.button`
  padding: 5px;
  border-radius: 4px;
  &:focus,
  &:hover {
    background-color: #fff;
    color: #3730a3;
    transition: background-color 0.5s ease;
  }
`;
