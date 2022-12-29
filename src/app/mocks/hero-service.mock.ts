import {Observable, of} from "rxjs";
import {HEROES} from "../mock-heroes";
import {Hero} from "../hero";

let heroesCopy = [...HEROES];
export class HeroServiceMock{
  getHeroes ():Observable<Hero[]> { return of(heroesCopy)}
  addHero (hero: Hero):Observable<Hero>  {
  hero.id = heroesCopy.length + 1;
  // heroesCopy.push(hero);
  return of(hero);
};
deleteHero (heroId: number):Observable<Hero[]> {
  let heroIndexToDelete = heroesCopy.findIndex((hero) =>{
    return heroId === hero.id;
  });
  heroesCopy.splice(heroIndexToDelete, 1);
  return of(heroesCopy);
}
}
export function resetHeroes()
{
  heroesCopy = [...HEROES];
}
