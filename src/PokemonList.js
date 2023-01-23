import { useEffect, useState } from "react";
import { Card, HStack, CardHeader, Heading, Box, Button, SimpleGrid, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
const Pagination = () => {
  // use search params untuk mengambil query string page
  const [searchParams, setsearchParams] = useSearchParams();
  const [halaman, setHalaman] = useState(1);
  const changePage = (direct) => {
    if (direct === "prev") {
      setsearchParams({
        page: halaman - 1,
      });
      setHalaman(halaman - 1);
    }
    if (direct === "next") {
      setsearchParams({
        page: halaman + 1,
      });
      setHalaman(halaman + 1);
    }
  };
  useEffect(() => {
    const page = parseInt(searchParams.get("page") || 1);
    setHalaman(page);
  }, [searchParams]);

  return (
    <HStack display={"flex"} justify="center">
      {halaman === 1 ? <Button disabled>Prev</Button> : <Button onClick={() => changePage("prev")}>Prev</Button>}
      <Button onClick={() => changePage("next")}>Next </Button>
    </HStack>
  );
};

const PokemonList = ({ pokemons }) => {
  return (
    pokemons &&
    pokemons.length > 0 && (
      <Box role="pokemon-list">
        {pokemons.map((pokemon) => (
          <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
            <Card boxShadow={"xl"} mb={10} padding={[2, 4]}>
              <CardHeader>
                <Heading textAlign={"center"} as="h3" size="md">
                  {pokemon.name}
                </Heading>
              </CardHeader>
              <SimpleGrid columns={[1, 2, 4]}>
                <Image w="100%" src={pokemon.sprites.front_default} alt="Front Default" />
                <Image w="100%" src={pokemon.sprites.back_default} alt="Back Default" />
                <Image w="100%" src={pokemon.sprites.front_shiny} alt="Front Shiny" />
                <Image w="100%" src={pokemon.sprites.back_shiny} alt="Back Shiny" />
              </SimpleGrid>
              <Box display={"flex"} justifyContent="center">
                {pokemon.types.map((tipe, index) => (
                  <Text bg={"gray.200"} px={2} py={1} fontWeight="medium" borderRadius={15} mr={2} key={index}>
                    {tipe.type.name}
                  </Text>
                ))}
              </Box>
            </Card>
          </Link>
        ))}
      </Box>
    )
  );
};
const Pokemon = () => {
  //get list
  const fetchPokemons = async (page) => {
    //get pokemon list with image
    const displayPerPage = 20;
    const offset = (page - 1) * 20;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${displayPerPage}&offset=${offset}`;

    const response = await fetch(url);
    const data = await response.json();

    const pokemonList = data.results.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
      return pokemonData;
    });

    //set pokemonList to state
    setPokemons(await Promise.all(pokemonList));
  };

  const [pokemons, setPokemons] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || 1);
    fetchPokemons(page);
  }, [searchParams]);

  return (
    <>
      <Heading textAlign={"center"} as="h2" size="lg">
        Pokemon List
      </Heading>
      <Pagination />
      <PokemonList pokemons={pokemons} />
    </>
  );
};

export default Pokemon;
