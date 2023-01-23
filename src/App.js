import { Box, HStack, Container, Heading, Text } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Pokemon from "./PokemonList";
import { Link } from "react-router-dom";
import PokemonDetail from "./PokemonDetail";
import PokemonLegend from "./PokemonLegend";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "./Unauthorized";
import { useNavigate } from "react-router-dom";

const App = () => {
  let navigate = useNavigate();
  const enterSecretPage = () => {
    navigate("/legend?password=secret");
  };

  return (
    <Container marginTop="2">
      <Box marginBottom={5} bg="gray.500" padding={4} borderRadius={10}>
        <Heading as="h1" color="white">
          PokeDeh
        </Heading>
        <HStack spacing="2" color="white">
          <Link to="/">
            <Text _hover={{ color: "black" }}>Home</Text>
          </Link>
          <Link to="/pokemon">
            <Text _hover={{ color: "black" }}>Pokemon</Text>
          </Link>
          <Link to="/legend" onDoubleClick={enterSecretPage}>
            <Text _hover={{ color: "black" }}>Legend</Text>
          </Link>
        </HStack>
      </Box>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pokemon" element={<Pokemon />} />
        <Route path="/pokemon/:pokemonId" element={<PokemonDetail />} />
        <Route
          path="/legend"
          element={
            <ProtectedRoute>
              <PokemonLegend />
            </ProtectedRoute>
          }
        />
        <Route path="unauthorized" element={<Unauthorized />} />
      </Routes>
    </Container>
  );
};

export default App;
