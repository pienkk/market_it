/**
 * 주문 상태 타입
 *
 * ORDER_PENDING: 주문 대기
 * ORDER_ACCEPTED: 주문 접수
 * ORDER_COMPLETED: 주문 완료
 * ORDER_CANCELED: 주문 취소
 */
export type OrderStatusType =
  | "ORDER_PENDING"
  | "ORDER_ACCEPTED"
  | "ORDER_COMPLETED"
  | "ORDER_CANCELED";
