import { Box, Text, Flex } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import GradientLayout from "../components/gradientLayout";
import { useMe } from "../lib/hooks";
import prisma from "../lib/prisma";

export const Home = ({ artists }) => {
  const { user } = useMe();

  return (
    <GradientLayout
      roundImage
      color="red"
      subtitle="profile"
      title={user ? `${user.firstName} ${user.lastName}` : "Name Namesson"}
      description={`${user?.playlistsCount} public playlists`}
      image="https://raw.githubusercontent.com/Claudiferock/Claudiferock/master/IMG_20181109_090457_295(2).jpg"
    >
      <Box color="white" paddingX="40px" >
        <Box marginBottom="40px">
          <Text fontSize="2xl">Top artists this month</Text>
          <Text fontSize="md">Only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box paddingX="16px" width="20%" >
              <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
                <Image
                  src="http://placekitten.com/300/300"
                  borderRadius="100%"
                />
                <Box marginTop="20px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="sm">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

// only run on the server side
// then it'll inject them to the Home component when the page is requested
export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})

  return {
    props: { artists },
  }
};;

export default Home;