import CarruselImagenes from "../components/layout/CarruselImagenes";


function Home() {
  return (
    <div>

      <main style={styles.main}>

        <CarruselImagenes />
        <h1>Ya vamos a ver para que sirve esto</h1>
        <p>Todavia no se que poner aca XP</p>
      </main>
    </div>
  );
}

const styles = {
  main: {
    textAlign: "center",
  },
};

export default Home;