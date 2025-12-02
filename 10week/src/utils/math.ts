const findPrimesUpTo = (n: number): number[] => {
  const limit = Math.floor(n);
  if (limit < 2) return [];

  const isPrime: boolean[] = new Array(limit + 1).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let p = 2; p * p <= limit; p++) {
    if (isPrime[p]) {
      for (let i = p * p; i <= limit; i += p) {
        isPrime[i] = false;
      }
    }
  }

  const primes: number[] = [];
  for (let p = 2; p <= limit; p++) {
    if (isPrime[p]) {
      primes.push(p);
    }
  }

  return primes;
};