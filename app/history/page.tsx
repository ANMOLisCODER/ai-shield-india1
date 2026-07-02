'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase'; // adjust path to your Supabase client
import { toast } from 'sonner'; // or your existing toast library

// ----------------------------------------------------------------------
// 1. Particle & Floating Blob background (inline styles for easy drop-in)
// ----------------------------------------------------------------------
const floatingParticlesStyle = `
  @keyframes float-particle {
    0% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
    50% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
    100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
  }
  .particle { animation: float-particle 6s ease-in-out infinite; }
  .particle:nth-child(odd) { animation-duration: 8s; animation-delay: -2s; }
  .shimmer { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent); }
`;

const BackgroundBlob = ({ className }: { className: string }) => (  <div
    className={`absolute rounded-full blur-[120px] opacity-20 pointer-events-none ${className}`}
  />
);

// ----------------------------------------------------------------------
// 2. Icons (inline SVGs to avoid extra dependencies)
// ----------------------------------------------------------------------
const ShieldIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const SearchIcon = () => (
  <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const LiveDot = () => (
  <span className="relative flex h-3 w-3">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
  </span>
);

// ----------------------------------------------------------------------
// 3. Main History Page Component
// ----------------------------------------------------------------------
export default function HistoryPage() {
  // --- EXACT SAME STATE AS BEFORE – DO NOT RENAME ---
  const [scans, setScans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedVerdict, setSelectedVerdict] = useState('all');
  const [sortBy, setSortBy] = useState('date_desc');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [clearLoading, setClearLoading] = useState(false);

  // --- EXACT SAME FETCH FUNCTION – DO NOT MODIFY ---
  const fetchHistory = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('scan_history')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load scan history');
      alert(JSON.stringify(error, null, 2));
console.log(error);
    } else {
      setScans(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // --- EXACT SAME DELETE FUNCTION ---
  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('scan_history').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete scan');
      return;
    }
    toast.success('Scan deleted');
    setScans((prev) => prev.filter((scan) => scan.id !== id));
  };

  // --- EXACT SAME COPY FUNCTION ---
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Copy failed');
    }
  };

  // --- EXACT SAME CLEAR ALL FUNCTION ---
  const handleClearAll = async () => {
  if (!confirm("Delete all scan history? This cannot be undone.")) return;

  setClearLoading(true);

  const { error } = await supabase
  .from("scan_history")
  .delete()
  .gt("id", 0);

  if (error) {
    console.error(error);
    alert(JSON.stringify(error, null, 2));
    toast.error(error.message);

    setClearLoading(false);
    return;
  }

  setScans([]);

  toast.success("History cleared");

  setClearLoading(false);
};

  // --- CLIENT‑SIDE EXPORT (CSV) – new functionality, no backend change ---
  const handleExport = () => {
    if (scans.length === 0) return toast.error('Nothing to export');
    const headers = ['Type', 'Content', 'Verdict', 'Risk Score', 'Date'];
    const rows = scans.map((s) => [s.scan_type, s.content ?? '', s.verdict, s.risk_score, new Date(s.created_at).toISOString()]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
const blob = new Blob([csv], { type: "text/csv" });
const url = URL.createObjectURL(blob);    const a = document.createElement('a');
    a.href = url;
    a.download = `scan_history_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Exported as CSV');
  };

  // --- COMPUTED VALUES ---
  const filteredScans = scans
    .filter((s) => {
      if (searchQuery && !JSON.stringify(s).toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (selectedType !== 'all' && s.scan_type !== selectedType) return false;
      if (selectedVerdict !== 'all' && s.verdict !== selectedVerdict) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'date_asc') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (sortBy === 'risk_desc') return (b.risk_score ?? 0) - (a.risk_score ?? 0);
      if (sortBy === 'risk_asc') return (a.risk_score ?? 0) - (b.risk_score ?? 0);
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime(); // date_desc
    });

  const totalScans = scans.length;
  const SAFECount = scans.filter((s) => s.verdict === 'SAFE').length;
  const SUSPICIOUSCount = scans.filter((s) => s.verdict === 'SUSPICIOUS').length;
  const SCAMCount = scans.filter((s) => s.verdict === 'SCAM').length;
  const lastScanDate = scans.length > 0 ? new Date(scans[0].created_at).toLocaleDateString() : '—';

  // --- RESET FILTERS ---
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedVerdict('all');
    setSortBy('date_desc');
  };

  // ------------------------------------------------------------------
  // RENDER
  // ------------------------------------------------------------------
  return (
    <>
      <style jsx>{floatingParticlesStyle}</style>

      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 bg-[#0A0A0F]">
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        {/* Blurred blobs */}
        <BackgroundBlob className="top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-cyan-500/10" />

<BackgroundBlob className="bottom-[-10%] right-[-10%] w-[50rem] h-[50rem] bg-purple-500/10" />
        {/* Subtle floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="particle absolute w-1 h-1 bg-white/10 rounded-full"
              style={{
                left: `${20 + i * 12}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="relative z-10 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-10">
        {/* --- HERO --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                  Scan History
                </h1>
                <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-400/20 rounded-full px-3 py-1">
                  <LiveDot />
                  <span className="text-xs font-medium text-emerald-300 uppercase tracking-wider">Live</span>
                </div>
              </div>
              <p className="text-white/60 text-lg mt-1 max-w-xl">
                Monitor and audit every security scan. Real‑time insights into your threat surface.
              </p>
              <div className="flex items-center gap-6 mt-4 text-sm text-white/40">
                <span className="flex items-center gap-1">
                  <span className="font-mono text-white/80">{totalScans}</span> total scans
                </span>
                <span>Last scan: <span className="text-white/70">{lastScanDate}</span></span>
              </div>
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExport}
                className="px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-white/80 hover:bg-white/10 transition-colors text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClearAll}
                disabled={clearLoading || scans.length === 0}
                className="px-4 py-2.5 rounded-xl bg-red-500/10 backdrop-blur-md border border-red-400/20 text-red-300 hover:bg-red-500/20 transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {clearLoading ? 'Clearing...' : 'Clear History'}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* --- SUMMARY STATISTICS --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {[
            { label: 'Total Scans', value: totalScans, icon: '🔍', color: 'from-cyan-400/20 to-blue-500/20' },
            { label: 'Safe', value: SAFECount, icon: '✅', color: 'from-emerald-400/20 to-green-500/20' },
            { label: 'Suspicious', value: SUSPICIOUSCount, icon: '⚠️', color: 'from-yellow-400/20 to-amber-500/20' },
            { label: 'Scam', value: SCAMCount, icon: '🚨', color: 'from-red-400/20 to-rose-500/20' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.02, y: -2 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-4"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-20`} />
              <div className="relative z-10 flex items-center gap-3">
                <span className="text-2xl">{stat.icon}</span>
                <div>
                  <div className="text-white/60 text-xs uppercase tracking-wide">{stat.label}</div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- STICKY SEARCH & FILTERS --- */}
        <div className="sticky top-4 z-20 space-y-4">
          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-y-0 left-4 flex items-center">
              <SearchIcon />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scans by content, type, or verdict..."
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 focus:border-cyan-400/30 text-white placeholder-white/30 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </motion.div>

          {/* Filters in one glass container */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10"
          >
            {/* Scan Type */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white/80 outline-none focus:border-cyan-400/30"
            >
              <option value="all" className="bg-gray-900">All Types</option>
              <option value="url" className="bg-gray-900">URL</option>
              <option value="file" className="bg-gray-900">File</option>
              <option value="text" className="bg-gray-900">Text</option>
            </select>

            {/* Verdict */}
            <select
              value={selectedVerdict}
              onChange={(e) => setSelectedVerdict(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white/80 outline-none focus:border-cyan-400/30"
            >
              <option value="all" className="bg-gray-900">All Verdicts</option>
              <option value="SAFE" className="bg-gray-900">Safe</option>
              <option value="SUSPICIOUS" className="bg-gray-900">Suspicious</option>
              <option value="SCAM" className="bg-gray-900">Scam</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white/80 outline-none focus:border-cyan-400/30"
            >
              <option value="date_desc" className="bg-gray-900">Newest First</option>
              <option value="date_asc" className="bg-gray-900">Oldest First</option>
              <option value="risk_desc" className="bg-gray-900">Highest Risk</option>
              <option value="risk_asc" className="bg-gray-900">Lowest Risk</option>
            </select>

            {/* Reset */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetFilters}
              className="ml-auto px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white text-sm transition-colors"
            >
              Reset Filters
            </motion.button>
          </motion.div>
        </div>

        {/* --- HISTORY LIST --- */}
        <div className="mt-8 space-y-4">
          {/* Loading skeletons */}
          {loading && (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-28 rounded-2xl bg-white/5 border border-white/10 shimmer animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filteredScans.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white/40">
                <ShieldIcon />
              </div>
              <h2 className="text-2xl font-semibold text-white/80 mb-2">
                {searchQuery || selectedType !== 'all' || selectedVerdict !== 'all'
                  ? 'No matching scans found'
                  : 'Your scan history is empty'}
              </h2>
              <p className="text-white/50 max-w-md">
                {searchQuery || selectedType !== 'all' || selectedVerdict !== 'all'
                  ? 'Try adjusting your search or filters.'
                  : 'Run your first security scan to start building your audit trail.'}
              </p>
              {!searchQuery && selectedType === 'all' && selectedVerdict === 'all' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/20 text-cyan-300 font-medium"
                  onClick={() => window.location.href = '/scan'} // adjust route as needed
                >
                  Start Scanning
                </motion.button>
              )}
            </motion.div>
          )}

          {/* Scan cards */}
          <AnimatePresence mode="popLayout">
            {!loading &&
              filteredScans.map((scan, index) => (
                <motion.div
                  key={scan.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/[0.07] transition-colors"
                >
                  {/* Gradient border glow */}
                  <div className="absolute inset-0 rounded-[28px] p-[1px] bg-gradient-to-r from-cyan-500/20 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10 p-4 sm:p-5">
                    {/* Top row: icon, type/date, content preview, verdict */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Left: icon & meta */}
                      <div className="flex items-center gap-3 min-w-[120px]">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg">
                          {scan.scan_type === 'url' ? '🔗' : scan.scan_type === 'file' ? '📄' : '💬'}
                        </div>
                        <div>
                          <div className="text-xs text-white/40 uppercase tracking-wider">{scan.scan_type}</div>
                          <div className="text-sm text-white/70">
                            {new Date(scan.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </div>
                      </div>

                      {/* Middle: content preview (truncated) */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white/60 truncate max-w-[300px] lg:max-w-[500px]">
                          {scan.content || 'No preview available'}
                        </p>
                      </div>

                      {/* Right: verdict badge + risk */}
                      <div className="flex items-center gap-3 sm:ml-auto">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${
                            scan.verdict === 'SAFE'
                              ? 'bg-emerald-500/10 border-emerald-400/20 text-emerald-300'
                              : scan.verdict === 'SUSPICIOUS'
                              ? 'bg-yellow-500/10 border-yellow-400/20 text-yellow-300'
                              : 'bg-red-500/10 border-red-400/20 text-red-300'
                          }`}
                        >
                          {scan.verdict?.toUpperCase()}
                        </span>
                        <div className="text-right">
                          <div className="text-xs text-white/40">Risk</div>
                          <div className="text-lg font-bold text-white">{scan.risk_score ?? 0}%</div>
                        </div>
                      </div>

                      {/* Expand toggle */}
                      <button
                        onClick={() => setExpandedId(expandedId === scan.id ? null : scan.id)}
                        className="text-white/40 hover:text-white/80 transition-colors ml-2"
                      >
                        <svg
                          className={`w-5 h-5 transform transition-transform ${expandedId === scan.id ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    {/* Bottom row: progress bar + actions */}
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      {/* Risk progress bar */}
                      <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${scan.risk_score ?? 0}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className={`h-full rounded-full ${
                            scan.risk_score >= 70
                              ? 'bg-gradient-to-r from-red-500 to-rose-500'
                              : scan.risk_score >= 40
                              ? 'bg-gradient-to-r from-yellow-400 to-amber-500'
                              : 'bg-gradient-to-r from-emerald-400 to-green-500'
                          }`}
                        />
                      </div>
                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCopy(scan.content || scan.id)}
                          className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white/80 transition-colors"
                          title="Copy content"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(scan.id)}
                          className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-red-400 transition-colors"
                          title="Delete scan"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>

                    {/* Expandable details */}
                    <AnimatePresence>
                      {expandedId === scan.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-white/10 text-sm text-white/60 break-words">
                            {scan.content || scan.content || 'No additional details'}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>

          {/* Pagination hint – ready for infinite scroll */}
          {!loading && filteredScans.length > 0 && (
            <p className="text-center text-white/20 text-sm mt-6">
              Showing {filteredScans.length} of {scans.length} scans
            </p>
          )}
        </div>
      </main>
    </>
  );
}