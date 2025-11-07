'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  duration = 5000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Type-specific configurations
  const typeConfig = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
      textColor: 'text-green-800',
      iconColor: 'text-green-500',
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500',
      textColor: 'text-red-800',
      iconColor: 'text-red-500',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-500',
    },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4`}
        role="alert"
        aria-live="polite"
      >
        <div
          className={`flex items-start gap-3 p-4 rounded-lg border-l-4 shadow-lg ${config.bgColor} ${config.borderColor}`}
        >
          <Icon className={`flex-shrink-0 w-5 h-5 mt-0.5 ${config.iconColor}`} aria-hidden="true" />
          
          <p className={`flex-1 text-sm font-medium ${config.textColor}`}>
            {message}
          </p>
          
          <button
            onClick={onClose}
            className={`flex-shrink-0 p-1 rounded-md transition-colors duration-200 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2 ${config.iconColor}`}
            aria-label="Close notification"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
