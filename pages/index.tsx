import Head from "next/head";
import Image from "next/image";
import GradientLayout from "../components/gradientLayout";
import styles from "../styles/Home.module.css";

export const Home = () => {
  return (
    <GradientLayout
      roundImage
      color="red"
      subtitle="profile"
      title="Person Perssonen"
      description="x public playlists"
    >
      <h2>Home Page</h2>
    </GradientLayout>
  );
};

export default Home;