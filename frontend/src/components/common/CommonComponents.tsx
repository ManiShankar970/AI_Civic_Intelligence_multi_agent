import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, AlertCircle, Inbox, X } from "lucide-react";

// ==========================================
// BUTTON COMPONENT
// ==========================================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "ghost" | "glass" | "white";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  id,
  children,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-sans font-medium transition-all duration-200 rounded-xl focus:outline-none cursor-pointer active:scale-98 select-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5 rounded-2xl",
  };

  const variantStyles = {
    primary: "bg-brand-blue-600 hover:bg-brand-blue-700 text-white shadow-md shadow-brand-blue-600/15 border border-brand-blue-600",
    secondary: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm",
    success: "bg-brand-green-600 hover:bg-brand-green-700 text-white shadow-md shadow-brand-green-600/15 border border-brand-green-600",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/15 border border-red-600",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-600 border border-transparent",
    glass: "glass-panel text-brand-blue-900 border-brand-blue-100 hover:bg-white/80 hover:border-brand-blue-200 text-brand-blue-700",
    white: "bg-white hover:bg-slate-50 text-brand-blue-900 shadow-lg shadow-brand-blue-900/5",
  };

  return (
    <motion.button
      id={id}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        icon && <span className="flex-shrink-0">{icon}</span>
      )}
      {children}
    </motion.button>
  );
};

// ==========================================
// CARD COMPONENT
// ==========================================
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  id,
  children,
  className = "",
  hoverEffect = true,
  ...props
}) => {
  return (
    <div
      id={id}
      className={`glass-panel rounded-2xl p-6 shadow-sm border border-slate-100 transition-all duration-300 ${
        hoverEffect ? "hover:shadow-md hover:translate-y-[-2px]" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// ==========================================
// INPUT COMPONENT
// ==========================================
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  error,
  icon,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`w-full font-sans text-sm text-slate-800 bg-white/80 border rounded-xl py-3 px-4 outline-none transition-all duration-200 focus:border-brand-blue-500 focus:ring-4 focus:ring-brand-blue-500/10 ${
            icon ? "pl-11" : ""
          } ${error ? "border-red-300 focus:border-red-500 focus:ring-red-500/10" : "border-slate-200"} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1 font-sans">{error}</p>}
    </div>
  );
};

// ==========================================
// TEXTAREA COMPONENT
// ==========================================
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  error,
  className = "",
  rows = 4,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`w-full font-sans text-sm text-slate-800 bg-white/80 border rounded-xl py-3 px-4 outline-none transition-all duration-200 focus:border-brand-blue-500 focus:ring-4 focus:ring-brand-blue-500/10 ${
          error ? "border-red-300 focus:border-red-500 focus:ring-red-500/10" : "border-slate-200"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1 font-sans">{error}</p>}
    </div>
  );
};

// ==========================================
// BADGE COMPONENT
// ==========================================
interface BadgeProps {
  id?: string;
  value: string;
  type?: "status" | "severity";
}

export const Badge: React.FC<BadgeProps> = ({ id, value, type = "status" }) => {
  const getStyles = () => {
    const val = value.toLowerCase();

    // Severity badges
    if (type === "severity") {
      switch (val) {
        case "low":
          return "bg-slate-100 text-slate-700 border-slate-200";
        case "medium":
          return "bg-brand-blue-50 text-brand-blue-700 border-brand-blue-100";
        case "high":
          return "bg-amber-50 text-amber-700 border-amber-200";
        case "critical":
          return "bg-red-50 text-red-700 border-red-200 animate-pulse";
        default:
          return "bg-slate-100 text-slate-700 border-slate-200";
      }
    }

    // Status badges
    switch (val) {
      case "submitted":
        return "bg-brand-blue-50 text-brand-blue-700 border-brand-blue-100";
      case "assigned":
        return "bg-indigo-50 text-indigo-700 border-indigo-100";
      case "accepted":
        return "bg-cyan-50 text-cyan-700 border-cyan-100";
      case "in progress":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "inspection":
        return "bg-purple-50 text-purple-700 border-purple-100";
      case "completed":
        return "bg-brand-green-50 text-brand-green-700 border-brand-green-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <span
      id={id}
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStyles()} font-sans`}
    >
      {value}
    </span>
  );
};

// ==========================================
// LOADER COMPONENT
// ==========================================
interface LoaderProps {
  id?: string;
  label?: string;
}

export const Loader: React.FC<LoaderProps> = ({ id, label = "AI is computing..." }) => {
  return (
    <div id={id} className="flex flex-col items-center justify-center p-8 text-center">
      <div className="relative flex items-center justify-center w-16 h-16 mb-4">
        <div className="absolute w-16 h-16 border-4 border-brand-blue-100 rounded-full"></div>
        <div className="absolute w-16 h-16 border-4 border-brand-blue-600 rounded-full border-t-transparent animate-spin"></div>
        <Loader2 className="w-6 h-6 text-brand-blue-600 animate-pulse" />
      </div>
      <p className="font-sans font-medium text-slate-600 animate-pulse text-sm">{label}</p>
    </div>
  );
};

// ==========================================
// MODAL COMPONENT
// ==========================================
interface ModalProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ id, isOpen, onClose, title, children }) => {
  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div id={id} className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <h3 className="font-display text-lg font-bold text-slate-900">{title}</h3>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="px-6 py-6 max-h-[75vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// ==========================================
// EMPTY STATE COMPONENT
// ==========================================
interface EmptyStateProps {
  id?: string;
  title?: string;
  description?: string;
  actionButton?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  id,
  title = "No complaints found",
  description = "Get started by reporting an issue or adjusting your search filters.",
  actionButton,
}) => {
  return (
    <div
      id={id}
      className="flex flex-col items-center justify-center text-center py-16 px-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50"
    >
      <div className="p-4 bg-white shadow-sm border border-slate-100 rounded-2xl text-slate-400 mb-4">
        <Inbox className="w-8 h-8" />
      </div>
      <h3 className="font-display font-bold text-slate-800 mb-1">{title}</h3>
      <p className="font-sans text-sm text-slate-500 max-w-md mb-6">{description}</p>
      {actionButton && actionButton}
    </div>
  );
};

// ==========================================
// ERROR STATE COMPONENT
// ==========================================
interface ErrorStateProps {
  id?: string;
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  id,
  title = "Something went wrong",
  description = "We encountered an error processing your request. Please try again.",
  onRetry,
}) => {
  return (
    <div
      id={id}
      className="flex flex-col items-center justify-center text-center py-12 px-4 border border-red-100 rounded-2xl bg-red-50/20"
    >
      <div className="p-3 bg-red-50 text-red-600 rounded-xl mb-4">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h3 className="font-display font-bold text-red-800 mb-1">{title}</h3>
      <p className="font-sans text-sm text-red-600/80 max-w-md mb-5">{description}</p>
      {onRetry && (
        <Button variant="danger" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};
