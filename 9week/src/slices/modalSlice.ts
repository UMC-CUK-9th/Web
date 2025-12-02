// State 타입 정의
export interface ModalState {
  isOpen: boolean;
}

// 초기 상태
export const initialModalState: ModalState = {
  isOpen: false,
};

// Action 타입 정의
export const OPEN_MODAL = 'modal/openModal';
export const CLOSE_MODAL = 'modal/closeModal';

// Action Creators 정의
export const openModal = () => ({ type: OPEN_MODAL });
export const closeModal = () => ({ type: CLOSE_MODAL });

export type ModalAction = 
    | ReturnType<typeof openModal>
    | ReturnType<typeof closeModal>;

// Reducer 함수 정의
export const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case OPEN_MODAL:
      return { isOpen: true };
    case CLOSE_MODAL:
      return { isOpen: false };
    default:
      return state;
  }
};