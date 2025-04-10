import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import assets from "../assets/assets";

const Toast = ({ isShown, message, onClose }) => {
    useEffect(() => {
        if (isShown) {
            const timeoutId = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timeoutId);
        }
    }, [isShown, onClose]);

    return (
        <AnimatePresence>
            {isShown && (
                <motion.div
                    initial={{ opacity: 0, x: 50 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: 50 }} 
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="fixed top-20 right-6 min-w-52 bg-white border shadow-2xl rounded-md"
                >
                    <div className="flex items-center gap-3 py-2 px-4 border-l-4 border-green-500 rounded-md">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-50">
                            <assets.LuCheck className="text-xl text-green-500" />
                        </div>
                        <p className="text-sm text-slate-800 font-medium">{message}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;