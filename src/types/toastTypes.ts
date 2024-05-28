export type ToastType = "success" | "error" | "";

export interface ToastProps {
  message: string;
  type: ToastType;
}

export interface ToastState {
  message: string;
  type: ToastType;
}
