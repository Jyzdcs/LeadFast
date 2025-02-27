// Adapted from https://ui.shadcn.com/

import * as React from "react";
import { useState, useEffect } from "react";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastTitle,
} from "@/components/ui/toast";

const TOAST_REMOVE_DELAY = 3000;

type ToastActionElement = React.ReactElement<{
  altText: string;
}>;

type ToastProps = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToastProps;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToastProps>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: string;
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: string;
    };

interface State {
  toasts: ToastProps[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      if (toastId) {
        return {
          ...state,
          toasts: state.toasts.map((t) => (t.id === toastId ? { ...t } : t)),
        };
      }

      return {
        ...state,
        toasts: [],
      };
    }
    case "REMOVE_TOAST": {
      const { toastId } = action;

      if (toastId) {
        return {
          ...state,
          toasts: state.toasts.filter((t) => t.id !== toastId),
        };
      }

      return {
        ...state,
        toasts: [],
      };
    }
  }
};

const ToastContext = React.createContext<{
  toasts: ToastProps[];
  addToast: (props: Omit<ToastProps, "id">) => string;
  updateToast: (id: string, props: Partial<ToastProps>) => void;
  dismissToast: (id: string) => void;
  removeToast: (id: string) => void;
}>({
  toasts: [],
  addToast: () => "",
  updateToast: () => {},
  dismissToast: () => {},
  removeToast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, { toasts: [] });

  const addToast = React.useCallback((props: Omit<ToastProps, "id">) => {
    const id = genId();
    const toast = { id, ...props };
    dispatch({ type: "ADD_TOAST", toast });

    return id;
  }, []);

  const updateToast = React.useCallback(
    (id: string, props: Partial<ToastProps>) => {
      dispatch({ type: "UPDATE_TOAST", toast: { id, ...props } });
    },
    []
  );

  const dismissToast = React.useCallback((id: string) => {
    dispatch({ type: "DISMISS_TOAST", toastId: id });
  }, []);

  const removeToast = React.useCallback((id: string) => {
    dispatch({ type: "REMOVE_TOAST", toastId: id });
  }, []);

  return (
    <ToastContext.Provider
      value={{
        toasts: state.toasts,
        addToast,
        updateToast,
        dismissToast,
        removeToast,
      }}
    >
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

function ToastContainer() {
  const { toasts, removeToast } = React.useContext(ToastContext);

  useEffect(() => {
    toasts.forEach((toast) => {
      const timeout = setTimeout(() => {
        removeToast(toast.id);
      }, TOAST_REMOVE_DELAY);

      toastTimeouts.set(toast.id, timeout);
    });

    return () => {
      toastTimeouts.forEach((timeout) => clearTimeout(timeout));
      toastTimeouts.clear();
    };
  }, [toasts, removeToast]);

  return (
    <div className="fixed top-0 right-0 z-50 flex flex-col gap-2 p-4 max-w-md">
      {toasts.map((toast) => (
        <Toast key={toast.id} variant={toast.variant}>
          <div className="flex gap-1 flex-col">
            {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
            {toast.description && (
              <ToastDescription>{toast.description}</ToastDescription>
            )}
          </div>
          <ToastClose onClick={() => removeToast(toast.id)} />
        </Toast>
      ))}
    </div>
  );
}

export function useToast() {
  const { addToast, updateToast, dismissToast, removeToast } =
    React.useContext(ToastContext);

  return {
    toast: (props: Omit<ToastProps, "id">) => {
      return addToast(props);
    },
    update: (id: string, props: Partial<ToastProps>) => {
      updateToast(id, props);
    },
    dismiss: (id: string) => {
      dismissToast(id);
    },
    remove: (id: string) => {
      removeToast(id);
    },
  };
}
