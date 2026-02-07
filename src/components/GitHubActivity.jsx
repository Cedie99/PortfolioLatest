import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { Github, GitCommit, Star, GitPullRequest } from "lucide-react";

const GITHUB_USERNAME = "Cedie99";

const customTheme = {
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

export default function GitHubActivity() {
  const [stats, setStats] = useState([
    { label: "Repositories", value: "—", icon: Github },
    { label: "Contributions", value: "—", icon: GitCommit },
    { label: "Stars Earned", value: "—", icon: Star },
    { label: "Pull Requests", value: "—", icon: GitPullRequest },
  ]);

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

        setStats([
          { label: "Repositories", value: user.public_repos ?? 0, icon: Github },
          { label: "Contributions", value: contrib.total?.lastYear ?? 0, icon: GitCommit },
          { label: "Stars Earned", value: totalStars, icon: Star },
          { label: "Pull Requests", value: prs.total_count ?? 0, icon: GitPullRequest },
        ]);
      } catch {
        // Keep placeholder values on error
      }
    }

    fetchGitHubStats();
  }, []);

  return (
    <section className="bg-black py-20 md:py-32 px-6 relative overflow-hidden" id="github">
      <div className="absolute top-0 right-[-10%] w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4"
          >
            <Github className="w-3 h-3" />
            Open Source
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4">
            GitHub Activity
          </h2>
          <p className="text-zinc-500 text-sm md:text-base max-w-lg font-medium">
            A snapshot of my contribution history and open-source involvement.
          </p>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl bg-zinc-900/30 border border-white/5 backdrop-blur-sm text-center group hover:border-emerald-500/20 transition-all"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Contribution Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 md:p-8 rounded-2xl bg-zinc-900/20 border border-white/5 backdrop-blur-sm overflow-x-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white">Contribution Graph</h3>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-emerald-400 transition-colors"
            >
              View Profile →
            </a>
          </div>
          <div className="min-w-[700px]">
            <GitHubCalendar
              username={GITHUB_USERNAME}
              theme={customTheme}
              colorScheme="dark"
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
          >
            <Github className="w-4 h-4" />
            Explore My Repositories
          </motion.a>
        </div>
      </div>
    </section>
  );
}
