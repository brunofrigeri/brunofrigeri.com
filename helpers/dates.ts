const BIRTH_DATE = { year: 1997, month: 2, day: 13 };
const CAREER_START_YEAR = 2019;

export function getAge(now: Date = new Date()): number {
  const hadBirthday =
    now.getMonth() + 1 > BIRTH_DATE.month ||
    (now.getMonth() + 1 === BIRTH_DATE.month && now.getDate() >= BIRTH_DATE.day);

  return now.getFullYear() - BIRTH_DATE.year - (hadBirthday ? 0 : 1);
}

export function getYearsOfExperience(now: Date = new Date()): number {
  return now.getFullYear() - CAREER_START_YEAR;
}
