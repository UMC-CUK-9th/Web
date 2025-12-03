// import React, { useState, useMemo, ChangeEvent } from 'react';

// const findPrimesUpTo = (n: number): number[] => {
//   const limit = Math.floor(n);
//   if (limit < 2) return [];

//   const isPrime: boolean[] = new Array(limit + 1).fill(true);
//   isPrime[0] = isPrime[1] = false;

//   for (let p = 2; p * p <= limit; p++) {
//     if (isPrime[p]) {
//       for (let i = p * p; i <= limit; i += p) {
//         isPrime[i] = false;
//       }
//     }
//   }

//   const primes: number[] = [];
//   for (let p = 2; p <= limit; p++) {
//     if (isPrime[p]) primes.push(p);
//   }

//   return primes;
// };

// const UseMemoPage: React.FC = () => {
//   const [numberInput, setNumberInput] = useState<number>(100);
//   const [otherInput, setOtherInput] = useState<string>('');

//   const primeList = useMemo(() => {
//     return findPrimesUpTo(numberInput);
//   }, [numberInput]);

//   const handleNumberInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.replace(/[^0-9]/g, '');
//     setNumberInput(Number(value) || 0);
//   };

//   const handleOtherInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setOtherInput(e.target.value);
//   };

//   return (
//     <div className="w-full p-4 sm:p-8 font-sans">
//       <div className="w-full max-w-lg mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-2xl border border-gray-100 text-center">

//         {/* 헤더 */}
//         <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 text-center">
//           같이 배우는 리액트 JaeBeom: <span className="text-indigo-600">useMemo편</span>
//         </h1>

//         {/* 소수 입력 */}
//         <div className="mb-8 p-4 bg-indigo-50 rounded-lg text-center">
//           <label 
//             htmlFor="number-input" 
//             className="block text-lg font-medium text-gray-700 mb-2 text-center"
//           >
//             숫자 입력 (소수 찾기):
//           </label>
//           <input
//             id="number-input"
//             type="text"
//             value={numberInput === 0 ? '' : numberInput.toString()}
//             onChange={handleNumberInputChange}
//             className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-xl font-mono transition shadow-inner"
//             placeholder="소수를 찾을 상한 값 입력"
//           />
//         </div>

//         {/* 소수 리스트 */}
//         <div className="mb-8 text-center">
//           <h2 className="text-xl font-semibold text-gray-800 mb-3 text-center">
//             소수 리스트 ({primeList.length}개):
//           </h2>
//           <div className="p-4 bg-gray-100 rounded-lg border border-gray-300 h-40 overflow-y-auto text-sm leading-relaxed whitespace-pre-wrap font-mono text-gray-900 shadow-inner text-left">
//             {primeList.length > 0
//               ? primeList.join(' ')
//               : numberInput > 1 
//               ? '소수를 찾지 못했습니다.'
//               : '2 이상의 숫자를 입력해주세요.'}
//           </div>
//         </div>

//         {/* 다른 입력 */}
//         <div className="p-4 bg-green-50 rounded-lg text-center">
//           <h2 className="text-xl font-semibold text-gray-800 mb-3 text-center">
//             다른 입력 테스트:
//           </h2>
//           <p className="text-sm text-gray-600 mb-2 text-center">
//             여기에 입력해도 소수 계산은 재실행되지 않습니다.
//           </p>

//           <input
//             type="text"
//             value={otherInput}
//             onChange={handleOtherInputChange}
//             className="w-full p-3 border-2 border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-xl transition shadow-inner"
//             placeholder="여기에 입력해보세요."
//           />

//           <p className="mt-3 text-sm text-gray-700 text-center">
//             현재 다른 입력 값: <span className="font-bold">{otherInput}</span>
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default UseMemoPage;
