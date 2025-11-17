// src/constants/key.ts

export const LOCAL_STORAGE_KEY = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
};

export const QUERY_KEY = {
  lps: "lps",                // 기존 키 (호환성을 위해 유지하거나, LP_LIST로 점진적 교체)
  LP_LIST: "lpList",         // [추가] 명시적인 LP 목록 키
  lpDetail: "lpDetail",      // LP 상세
  lpComments: "lpComments",  // LP 댓글
  myInfo: "myInfo",        // 내 정보
};