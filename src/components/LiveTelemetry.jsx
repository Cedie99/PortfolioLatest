import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { Github, GitCommit, Star, GitPullRequest } from "lucide-react";
import TextReveal from "./TextReveal";
import AnimatedCounter from "./AnimatedCounter";
import TiltCard from "./TiltCard";
import { useTheme } from "../hooks/useTheme";

const GITHUB_USERNAME = "Cedie99";
const ease = [0.16, 1, 0.3, 1];

const customTheme = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

const STAT_CONFIG = [
  { key: "repos", label: "REPOS", icon: Github },
  { key: "contributions", label: "COMMITS", icon: GitCommit },
  { key: "stars", label: "STARS", icon: Star },
  { key: "prs", label: "PRS", icon: GitPullRequest },
];

export default function LiveTelemetry() {
  const { isDark } = useTheme();
  const [stats, setStats] = useState({
    repos: "—",
    contributions: "—",
    stars: "—",
    prs: "—",
  });

  useEffect(() => {
    async function fetchGitHubStats() {
      try {
        const [userRes, reposRes, prsRes, contribRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`),
          fetch(`https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr`),
          fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`),
        ]);

        const user = await userRes.json();
        const repos = await reposRes.json();
        const prs = await prsRes.json();
        const contrib = await contribRes.json();

        const totalStars = Array.isArray(repos)
          ? repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
          : 0;

        setStats({
          repos: user.public_repos ?? 0,
          contributions: contrib.total?.lastYear ?? 0,
          stars: totalStars,
          prs: prs.total_count ?? 0,
        });
      } catch {
        // Keep placeholder values
      }
    }

    fetchGitHubStats();
  }, []);

  return (
    <section id="telemetry" className="py-24 md:py-40 px-6 lg:pl-[80px] relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-sky-400/30" />
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
              // Live Telemetry
            </p>
          </div>
          <TextReveal className="text-3xl md:text-5xl font-black tracking-[-0.04em] text-zinc-900 dark:text-gray-100 mb-4">
            GitHub Activity
          </TextReveal>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-lg">
            Real-time telemetry from active repositories and open-source contributions.
          </p>
        </motion.div>

        {/* Stats - large monospaced numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
          {STAT_CONFIG.map((config, i) => {
            const Icon = config.icon;
            return (
              <TiltCard key={config.key} maxTilt={6}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, ease }}
                  className="p-5 border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-lg shadow-sm card-glow"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-3 h-3 text-zinc-400" />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                      {config.label}
                    </span>
                  </div>
                  <p className="font-mono text-3xl md:text-5xl font-bold text-zinc-900 dark:text-gray-100 tracking-tight">
                    <AnimatedCounter value={stats[config.key]} />
                  </p>
                </motion.div>
              </TiltCard>
            );
          })}
        </div>

        {/* Contribution Calendar in monitor frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease }}
          className="monitor-frame corner-brackets scanline-overlay p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] font-bold text-sky-400/40 tracking-widest">
                CONTRIBUTION GRAPH
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-signal signal-pulse" />
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-sky-400 transition-colors"
            >
              View Profile →
            </a>
          </div>
          <div className="min-w-[700px] overflow-x-auto">
            <GitHubCalendar
              username={GITHUB_USERNAME}
              theme={customTheme}
              colorScheme={isDark ? "dark" : "light"}
              blockSize={12}
              blockMargin={4}
              fontSize={12}
              hideColorLegend={false}
              hideMonthLabels={false}
            />
          </div>
        </motion.div>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <motion.a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-6 py-3 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-gray-100 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all rounded"
          >
            <Github className="w-3.5 h-3.5" />
            Explore Repositories
          </motion.a>
        </div>
      </div>
    </section>
  );
}
