import { CategorySeed } from "./category.seed"

const categorySeeds = CategorySeed;

const hairCat = categorySeeds.find(f => f.name === 'cabello');
const hairCatIndex = categorySeeds.indexOf(hairCat) + 1;

export const ServiceHairSeed = [
  { name: 'corte_hombre', displayName: 'Corte Hombre', categoryId: hairCatIndex },
  { name: 'corte_mujer', displayName: 'Corte Mujer', categoryId: hairCatIndex },
  { name: 'corte_nino', displayName: 'Corte Niño', categoryId: hairCatIndex },
  { name: 'corte_nina', displayName: 'Corte Niña', categoryId: hairCatIndex },
]

const unasCat = categorySeeds.find(f => f.name === 'uñas');

const unasCatIndex = categorySeeds.indexOf(unasCat) + 1;

export const ServiceUnasSeed = [
  { name: 'shellac', displayName: 'Shellac', categoryId: unasCatIndex },
  { name: 'manicura', displayName: 'Manicura', categoryId: unasCatIndex },
]
