import React from "react";
import { motion } from "framer-motion";

export const UIUXMockup = () => {
  return (
    <div className="w-full h-full bg-[#050505] rounded-2xl overflow-hidden relative flex flex-col font-sans border border-white/10 shadow-2xl">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[50%] -right-[20%] w-[100%] h-[100%] bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_60%)] blur-[80px]" 
        />
        <motion.div 
          animate={{ 
            rotate: -360,
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[50%] -left-[20%] w-[100%] h-[100%] bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_60%)] blur-[80px]" 
        />
      </div>

      {/* Glass Navbar */}
      <div className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-white/[0.03] backdrop-blur-xl z-20">
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          </div>
          <div className="flex gap-4 text-xs font-semibold tracking-widest text-white/40 uppercase hidden sm:flex">
            <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Design</span>
            <span className="hover:text-white transition-colors cursor-pointer">Animate</span>
            <span className="hover:text-white transition-colors cursor-pointer">Code</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Multiplayer Avatars */}
          <div className="flex -space-x-2">
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1 }} className="w-8 h-8 rounded-full border-2 border-[#050505] bg-gradient-to-tr from-pink-500 to-orange-400 z-10" />
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.2 }} className="w-8 h-8 rounded-full border-2 border-[#050505] bg-gradient-to-tr from-blue-500 to-emerald-400 z-0" />
          </div>
          <div className="px-4 py-1.5 rounded-lg bg-white text-black text-xs font-bold tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.3)] hidden sm:block">
            Share
          </div>
        </div>
      </div>

      <div className="flex-1 flex z-10 overflow-hidden relative">
        {/* Left Toolbar */}
        <div className="w-16 border-r border-white/5 bg-white/[0.01] backdrop-blur-md flex flex-col items-center py-6 gap-6 z-20 hidden md:flex">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] cursor-pointer">
            <div className="w-4 h-4 bg-white/20 rounded-sm" />
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-8 h-8 rounded-lg border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer">
              <div className="w-4 h-4 rounded-full border-2 border-white/30" />
            </div>
          ))}
        </div>

        {/* Infinite Grid Canvas */}
        <div className="flex-1 relative overflow-hidden bg-[#0a0a0a]">
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          
          {/* Main Hero Component Mockup */}
          <motion.div 
            initial={{ y: 50, opacity: 0, rotateX: 10 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ duration: 1.2, delay: 0.2, type: "spring", stiffness: 100 }}
            style={{ perspective: 1000 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[85%] h-[85%] md:h-[80%]"
          >
            {/* Live Multiplayer Cursor 1 */}
            <motion.div 
              animate={{ x: [0, 150, 50, 200, 0], y: [0, -100, -50, 80, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 z-50 pointer-events-none hidden sm:block"
            >
              <svg width="24" height="36" viewBox="0 0 24 36" fill="none" className="text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">
                <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z" fill="currentColor"/>
              </svg>
              <div className="bg-pink-500 text-white text-[10px] font-bold px-2 py-1 rounded-full absolute top-6 left-4 shadow-[0_0_15px_rgba(236,72,153,0.5)] whitespace-nowrap">
                Sarah (Lead Designer)
              </div>
            </motion.div>

            {/* Live Multiplayer Cursor 2 */}
            <motion.div 
              animate={{ x: [200, -50, -150, 100, 200], y: [100, 200, 50, -50, 100] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/2 right-1/4 z-50 pointer-events-none hidden sm:block"
            >
              <svg width="24" height="36" viewBox="0 0 24 36" fill="none" className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
                <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z" fill="currentColor"/>
              </svg>
              <div className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-full absolute top-6 left-4 shadow-[0_0_15px_rgba(59,130,246,0.5)] whitespace-nowrap">
                You
              </div>
            </motion.div>

            {/* Glowing Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl blur-2xl" />

            {/* Glass Container */}
            <div className="absolute inset-0 bg-[#111]/80 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex">
              
              {/* App Sidebar Inside Canvas */}
              <div className="w-16 md:w-48 bg-black/40 border-r border-white/5 p-4 flex flex-col gap-6 items-center md:items-start">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-pink-500 flex-shrink-0" />
                  <div className="h-3 w-20 bg-white/20 rounded-full hidden md:block" />
                </div>
                <div className="flex flex-col gap-3 w-full">
                  {[...Array(6)].map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center justify-center md:justify-start gap-3 md:px-2 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer w-full"
                    >
                      <div className="w-4 h-4 rounded-sm bg-white/10 flex-shrink-0" />
                      <div className={`h-2 rounded-full hidden md:block ${i === 1 ? 'bg-blue-400 w-16' : 'bg-white/20 w-20'}`} />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* App Main Body */}
              <div className="flex-1 p-4 md:p-8 flex flex-col gap-6 relative overflow-hidden">
                
                {/* Header */}
                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                  <div className="flex flex-col gap-2">
                    <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 1, duration: 1 }} className="h-6 bg-white/80 rounded-md overflow-hidden relative w-32 md:w-48">
                      <div className="absolute inset-0 w-[200px]" />
                    </motion.div>
                    <div className="h-3 w-24 md:w-48 bg-white/20 rounded-full" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5" />
                    <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5" />
                  </div>
                </div>

                {/* Dashboard Widgets */}
                <div className="flex flex-col sm:grid sm:grid-cols-3 gap-6 flex-1 overflow-y-auto pb-4 no-scrollbar">
                  
                  {/* Hero Analytics Card */}
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="col-span-2 row-span-2 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-6 flex flex-col relative overflow-hidden group min-h-[200px]"
                  >
                    {/* Hover Glow */}
                    <div className="absolute top-0 left-0 w-full h-full bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
                    
                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <div className="flex flex-col gap-2">
                        <div className="text-white/40 text-xs font-bold uppercase tracking-wider">Total Engagement</div>
                        <div className="text-2xl md:text-3xl font-bold text-white tracking-tight">2,458,192</div>
                      </div>
                      <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold border border-green-500/30">
                        +24.5%
                      </div>
                    </div>

                    {/* Animated Line Chart Mock */}
                    <div className="flex-1 flex items-end gap-1 md:gap-2 relative z-10 h-32">
                      {[...Array(15)].map((_, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: "0%" }}
                          animate={{ height: `${Math.random() * 60 + 30}%` }}
                          transition={{ delay: 1.5 + i * 0.05, duration: 1, type: "spring" }}
                          className="flex-1 bg-gradient-to-t from-blue-500/80 to-purple-400 rounded-t-sm"
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* Side Cards */}
                  {[...Array(2)].map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.4 + i * 0.2, duration: 0.5 }}
                      className="col-span-1 row-span-1 bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-center gap-4 relative overflow-hidden min-h-[120px]"
                    >
                      {/* Scanning Line Effect */}
                      <motion.div 
                        animate={{ top: ["-10%", "110%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i }}
                        className="absolute left-0 w-full h-[1px] bg-white/20 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                      />
                      
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
                        <div className="w-4 h-4 bg-white/40 rounded-sm" />
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: i === 0 ? "85%" : "45%" }}
                          transition={{ delay: 2, duration: 1.5 }}
                          className={`h-full ${i === 0 ? 'bg-purple-500' : 'bg-pink-500'}`} 
                        />
                      </div>
                      <div className="h-2 w-1/2 bg-white/20 rounded-full" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Right Property Panel */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
          className="absolute right-6 top-6 bottom-6 w-64 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-2xl p-5 flex flex-col gap-6 shadow-2xl z-30 hidden lg:flex"
        >
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <span className="text-white text-sm font-bold">Properties</span>
            <div className="w-4 h-4 rounded-sm border border-white/20 flex items-center justify-center text-[8px] text-white/50">X</div>
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-5 overflow-y-auto no-scrollbar">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <span className="text-xs text-white/50">Opacity</span>
                <span className="text-xs text-white">85%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full">
                <div className="w-[85%] h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs text-white/50">Effects</span>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm border border-white/20 bg-white/10" />
                    <span className="text-xs text-white/80">Drop Shadow</span>
                  </div>
                  <div className="w-6 h-3 bg-blue-500 rounded-full flex items-center px-0.5">
                    <div className="w-2 h-2 bg-white rounded-full translate-x-3" />
                  </div>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm border border-white/20 bg-white/10" />
                    <span className="text-xs text-white/80">Backdrop Blur</span>
                  </div>
                  <div className="w-6 h-3 bg-blue-500 rounded-full flex items-center px-0.5">
                    <div className="w-2 h-2 bg-white rounded-full translate-x-3" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4 border-t border-white/10 pt-4">
              <span className="text-xs text-white/50">CSS Export</span>
              <div className="p-3 bg-[#050505]/80 border border-white/10 rounded-lg font-mono text-[10px] text-emerald-400 break-all relative group">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/10 p-1 rounded backdrop-blur-sm cursor-pointer">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </div>
                </div>
                background: rgba(17, 17, 17, 0.8);<br/>
                backdrop-filter: blur(40px);<br/>
                border-radius: 24px;<br/>
                box-shadow: 0 25px 50px rgba(0,0,0,0.5);
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
