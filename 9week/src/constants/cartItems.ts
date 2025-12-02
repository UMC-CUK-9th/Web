export interface CartItem {
  id: string;
  title: string;
  singer: string;
  price: number;
  img: string;
  amount: number;
}

export const mockCartItems: CartItem[] = [
  { id: 'recB6qcHPxb62YJ75', title: 'Vancouver', singer: 'BIG Naughty (서동현)', price: 25000, img: 'https://placehold.co/100x100/32CD32/white?text=A1', amount: 1 },
  { id: 'recdRxBsE14Rr2VuJ', title: 'Empty Island', singer: 'greenblue', price: 18000, img: 'https://placehold.co/100x100/87CEFA/white?text=A2', amount: 1 },
  { id: 'recwTo120XST3PIoW', title: 'golden hour', singer: 'JVKE', price: 28000, img: 'https://placehold.co/100x100/FFA07A/white?text=A3', amount: 1 },
  { id: 'rec1JZlfCIBOPdcT2', title: 'Home Sweet Home(From "어쩌면 우린 헤어졌는지 모른다")', singer: 'Gogang (고갱)', price: 20000, img: 'https://placehold.co/100x100/FFD700/black?text=A4', amount: 1 },
  { id: 'recwTo160XST3PIoW', title: 'Lemon', singer: 'Kenshi Yonezu(켄시 요네즈/米津 玄師)', price: 30000, img: 'https://placehold.co/100x100/DDA0DD/white?text=A5', amount: 1 },
  { id: 'recaBo120XST3PIoW', title: '돌멩이', singer: 'MASYTA (마시따)', price: 12000, img: 'https://placehold.co/100x100/F08080/white?text=A6', amount: 1 },
  { id: 'recqBo123XST3PIoK', title: 'LAmour, Les Baguettes, Paris', singer: '스텔라 장(Stella Jang)', price: 32000, img: 'https://placehold.co/100x100/ADD8E6/black?text=A7', amount: 1 },
  { id: 'recqBo133XST3PIoK', title: 'NO PAIN', singer: '실리카겔', price: 22000, img: 'https://placehold.co/100x100/F0E68C/black?text=A8', amount: 1 },
  { id: 'recqBo145XST3PIoK', title: '너에게 (feat. HYUN SEO)', singer: 'Halsoon', price: 20000, img: 'https://placehold.co/100x100/90EE90/black?text=A9', amount: 1 },
  { id: 'recqBo129XST3PIoK', title: '널 떠올리는 중이야(Think About You)', singer: 'PATEKO (파테코) , Jayci yucca(제이씨 유카)', price: 25000, img: 'https://placehold.co/100x100/FFB6C1/black?text=A10', amount: 1 },
  { id: 'rdaqBo129XST3PIoK', title: '끝나지 않은 얘기(feat. 다이나믹 듀오)', singer: '릴러말즈 & TOIL', price: 23000, img: 'https://placehold.co/100x100/B0E0E6/black?text=A11', amount: 1 },
  { id: 'rdaqBo149XQT3PIoK', title: '각자의 밤', singer: '나상현씨 밴드', price: 21000, img: 'https://placehold.co/100x100/DA70D6/white?text=A12', amount: 1 },
];

