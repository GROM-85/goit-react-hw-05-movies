import { MovieGallery } from 'components/MovieGallery';

const Home = () => {
  return (
    <main>
      <h3>Trending movies for the upcoming day</h3>
      <MovieGallery />
    </main>
  );
};

export default Home;