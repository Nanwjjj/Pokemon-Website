import { useEffect, useState } from "react";
import { HStack, Heading, Box, Text, Flex } from "@chakra-ui/react";

import { Image } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const Detail = ({ pokemon }) => {
  return (
    <Box>
      {pokemon && (
        <Box key={pokemon.id} role="pokemon-detail" bg={"white"} boxShadow="xl" padding={10}>
          <Heading textAlign={"center"} fontSize="3xl" as="h2" size="md">
            {pokemon.name}
          </Heading>
          <Box display={"flex"} justifyContent="center">
            {pokemon.types.map((tipe, index) => (
              <Text bg={"gray.200"} px={2} py={1} fontWeight="medium" borderRadius={15} mr={2} key={index}>
                {tipe.type.name}
              </Text>
            ))}
          </Box>
          <HStack>
            <Image src={pokemon.sprites.front_default} />
            <Image src={pokemon.sprites.back_default} />
            <Image src={pokemon.sprites.front_shiny} />
            <Image src={pokemon.sprites.back_shiny} />
          </HStack>
          <Box bg={"gray.300"} p="2" borderRadius={10}>
            <Box display={"flex"}>
              <Text fontWeight={"medium"} mr="2">
                Height
              </Text>
              <Text>{pokemon.height} </Text>
            </Box>
            <Box display={"flex"}>
              <Text fontWeight={"medium"} mr="2">
                Weight
              </Text>
              <Text>{pokemon.weight} </Text>
            </Box>
            <HStack>
              <Text fontWeight={"medium"}>Abilities:</Text>
              {pokemon.abilities.map((daya, index) => (
                <Text key={index}>{daya.ability.name}</Text>
              ))}
            </HStack>
            <Box>
              <Text fontWeight={"medium"}>Stats:</Text>
              {pokemon.stats.map((power, index) => (
                <Box key={index}>
                  <Text fontWeight={"medium"}>
                    {power.stat.name}:{power.base_stat}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
const Page = () => {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(null);

  const fetchPokemon = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await response.json();
    setPokemon(data);
  };

  useEffect(() => {
    fetchPokemon(pokemonId);
  }, [pokemonId]);

  return <Detail pokemon={pokemon} />;
};

export default Page;
