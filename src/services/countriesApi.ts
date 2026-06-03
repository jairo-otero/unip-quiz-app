export interface Country {
  name: { common: string; official: string }
  capital?: string[]
  flags: { png: string; svg: string; alt?: string }
  region: string
  population: number
  cca2: string
}

export interface QuizQuestion {
  question: string
  correctAnswer: string
  options: string[]
  flagUrl: string
  countryName: string
  type: 'capital' | 'flag'
}

const API_URL = 'https://restcountries.com/v3.1/all?fields=name,capital,flags,region,population,cca2'

export async function fetchCountries(): Promise<Country[]> {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error('Error al cargar los países')
  const data: Country[] = await res.json()
  return data.filter(c => c.capital && c.capital.length > 0)
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export function buildQuestions(countries: Country[], count = 10): QuizQuestion[] {
  const pool = shuffle(countries).slice(0, count * 3)
  const questions: QuizQuestion[] = []

  for (let i = 0; i < count; i++) {
    const country = pool[i]
    const isCapitalQ = Math.random() > 0.4

    const wrongPool = pool.filter((_, idx) => idx !== i)

    if (isCapitalQ) {
      const correct = country.capital![0]
      const wrongs = shuffle(wrongPool)
        .filter(c => c.capital && c.capital[0] !== correct)
        .slice(0, 3)
        .map(c => c.capital![0])

      questions.push({
        type: 'capital',
        question: `¿Cuál es la capital de ${country.name.common}?`,
        correctAnswer: correct,
        options: shuffle([correct, ...wrongs]),
        flagUrl: country.flags.png,
        countryName: country.name.common,
      })
    } else {
      const correct = country.name.common
      const wrongs = shuffle(wrongPool).slice(0, 3).map(c => c.name.common)

      questions.push({
        type: 'flag',
        question: '¿A qué país pertenece esta bandera?',
        correctAnswer: correct,
        options: shuffle([correct, ...wrongs]),
        flagUrl: country.flags.png,
        countryName: country.name.common,
      })
    }
  }

  return questions
}
