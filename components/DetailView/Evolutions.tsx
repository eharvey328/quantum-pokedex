import { ParsedUrlQuery } from "querystring";

import styles from "./DetailView.module.scss";
import { EvolutionItem } from "./EvolutionItem";

const sortById = (a: { id: string }, b: { id: string }) => +a.id - +b.id;

interface Evolution {
  id: string;
  name: string;
  image: string;
}

interface PokemonDeatil {
  name: string;
  image: string;
  evolutions: Evolution[];
  previousEvolutions: Evolution[];
}

export interface Evolutions {
  pokemon: PokemonDeatil;
  rewriteLink?: string;
  queryParams?: ParsedUrlQuery;
}

export const Evolutions = ({
  pokemon,
  rewriteLink,
  queryParams,
}: Evolutions) => {
  const { previousEvolutions, evolutions: nextEvolutions } = pokemon;

  if (!previousEvolutions.length && !nextEvolutions.length) {
    return <p>None</p>;
  }

  const evolutions = [
    ...[...previousEvolutions].sort(sortById),
    pokemon,
    ...[...nextEvolutions].sort(sortById),
  ];

  return (
    <ul className={styles.evolution_container}>
      {evolutions.map((evolution) => {
        const evoName = evolution.name.toLowerCase();
        return (
          <li key={evoName}>
            <EvolutionItem
              name={evoName}
              image={evolution.image}
              selected={evoName === pokemon.name.toLowerCase()}
              rewriteLink={rewriteLink}
              queryParams={queryParams}
            />
          </li>
        );
      })}
    </ul>
  );
};
