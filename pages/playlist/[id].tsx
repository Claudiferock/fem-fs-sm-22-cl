import { redirect } from "next/dist/server/api-utils";
import GradientLayout from "../../components/gradientLayout";
import SongTable from "../../components/songsTable";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";

const getBgColor = id => {
  const colors = [
    'red',
    'green',
    'blue',
    'orange',
    'purple',
    'gray',
    'teal',
    'yellow',
  ];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
}

const Playlist = ({ playlist }) => {
  const color = getBgColor(playlist.id);
  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongTable songs={playlist.songs} />
    </GradientLayout>
  )
}

export const getServerSideProps = async ({ query, req }) => {
  let user;
  try {
    user = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      }
    }
  }
  
  const [playlist] = await prisma.playlist.findMany({
    where: {
      // the + sign converts it into a number (to fix the bug)
      id: +query.id,
      userId: user.id
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: { playlist }
  }
}
export default Playlist;