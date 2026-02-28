import React, { useState, useEffect, useRef } from "react";

export default function DebugOverlay() {
    const [logs, setLogs] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const logContainerRef = useRef(null);

    useEffect(() => {
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;

        const addLog = (type, args) => {
            const message = args.map(arg =>
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');

            setLogs(prev => [...prev, {
                type,
                message,
                time: new Date().toLocaleTimeString(),
                id: Math.random().toString(36).substr(2, 9)
            }].slice(-100)); // Keep last 100 logs
        };

        console.log = (...args) => {
            originalLog.apply(console, args);
            addLog('info', args);
        };

        console.error = (...args) => {
            originalError.apply(console, args);
            addLog('error', args);
        };

        console.warn = (...args) => {
            originalWarn.apply(console, args);
            addLog('warn', args);
        };

        return () => {
            console.log = originalLog;
            console.error = originalError;
            console.warn = originalWarn;
        };
    }, []);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs, isOpen]);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-20 right-4 z-[9999] bg-gray-900/80 text-white p-2 rounded-full shadow-lg backdrop-blur-sm border border-white/10 opacity-50 hover:opacity-100 transition-opacity"
                title="Show Debug Logs"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            </button>
        );
    }

    return (
        <div className="fixed inset-x-0 bottom-0 z-[9999] bg-gray-900 text-gray-100 shadow-2xl border-t border-white/10 flex flex-col h-1/2 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between p-2 border-b border-white/10 bg-gray-800">
                <div className="flex items-center gap-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-blue-400">Debug Console</h3>
                    <span className="text-[10px] text-gray-500">{logs.length} entries</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setLogs([])}
                        className="text-[10px] uppercase font-bold text-gray-400 hover:text-white px-2 py-1"
                    >
                        Clear
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="bg-gray-700 hover:bg-gray-600 p-1 rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            <div
                ref={logContainerRef}
                className="flex-1 overflow-y-auto p-2 font-mono text-[11px] selection:bg-blue-500"
            >
                {logs.map((log) => (
                    <div key={log.id} className={`mb-1 whitespace-pre-wrap border-l-2 p-1 ${log.type === 'error' ? 'border-red-500 bg-red-500/10 text-red-200' :
                            log.type === 'warn' ? 'border-yellow-500 bg-yellow-500/10 text-yellow-200' :
                                'border-blue-500/50 text-gray-300'
                        }`}>
                        <span className="text-gray-500 mr-2">[{log.time}]</span>
                        {log.message}
                    </div>
                ))}
                {logs.length === 0 && (
                    <div className="text-gray-600 text-center py-10 italic">No logs captured yet.</div>
                )}
            </div>
        </div>
    );
}
