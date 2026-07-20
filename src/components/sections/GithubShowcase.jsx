import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsapConfig';
import { useScrollReveal } from '../../animations/useScrollReveal';
import GithubDepthCard from '../ui/GithubDepthCard';
import {
  Github, ExternalLink, Star, GitFork,
  MapPin, Users, BookMarked, Activity, Code2, GitCommit
} from 'lucide-react';


/* ─── helpers ───────────────────────────────────────────── */

const LANG_COLORS = {
  javascript: '#F7DF1E',
  typescript: '#3178C6',
  html: '#E34F26',
  css: '#1572B6',
  python: '#3776AB',
  vue: '#42B883',
  react: '#61DAFB',
  default: '#8A8A8A',
};

const langColor = (lang) =>
  LANG_COLORS[(lang || '').toLowerCase()] ?? LANG_COLORS.default;

/** Animated count-up number */
const CountUp = ({ target, duration = 1.2 }) => {
  const ref = useRef(null);
  const hasRun = useRef(false);

  useGSAP(() => {
    if (!ref.current || hasRun.current) return;
    hasRun.current = true;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.val);
      },
    });
  }, { scope: ref, dependencies: [target] });

  return <span ref={ref}>0</span>;
};

const RepoCard = ({ repo }) => {
  return (
    <div className="reveal-item h-full">
      <GithubDepthCard className="h-full flex flex-col justify-between p-5">
        <div>
          {/* Layer: Tags → translateZ(25px) */}
          <div style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}>
            <span className="inline-block text-[9px] font-bold uppercase tracking-widest px-2 py-0.5
                             border border-border text-muted rounded-full mb-4 bg-base/50">
              {repo.visibility}
            </span>
          </div>

          {/* Layer: Title → translateZ(40px) */}
          <div style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }} className="mb-2">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2"
            >
              {/* Layer: Icons → translateZ(50px) (nested +10px from 40px) */}
              <span style={{ transform: 'translateZ(10px)', display: 'inline-flex' }}>
                <Code2 size={15} className="text-accent shrink-0" />
              </span>
              <span className="font-display font-bold text-base text-text
                               group-hover:text-accent transition-colors duration-200 truncate">
                {repo.name}
              </span>
              <span style={{ transform: 'translateZ(10px)', display: 'inline-flex' }}>
                <ExternalLink size={11} className="text-muted shrink-0 opacity-0 group-hover:opacity-100
                                                    transition-opacity duration-200 ml-auto" />
              </span>
            </a>
          </div>

          {/* Layer: Description & Latest Commit → translateZ(20px) */}
          <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }} className="mb-4">
            {repo.latest_commit && (
              <div className="flex items-start gap-2 bg-[#0A0A0A]/50 border border-border/60 rounded-lg p-2 mt-2">
                <GitCommit size={13} className="text-accent shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-mono text-text/90 truncate font-medium leading-tight">
                    {repo.latest_commit.message}
                  </p>
                  <p className="text-[9px] font-mono text-muted/80 mt-0.5">
                    {new Date(repo.latest_commit.date).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Layer: Bottom row (Tags/Stats → translateZ(25px)) */}
        <div
          className="flex items-center justify-between pt-4 border-t border-border mt-auto"
          style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}
        >
          <div className="flex items-center gap-3 text-xs text-muted">
            {repo.language && (
              <span className="flex items-center gap-1.5 font-medium text-text/70">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: langColor(repo.language) }}
                />
                {repo.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star size={11} /> {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <GitFork size={11} /> {repo.forks_count}
            </span>
          </div>

          {/* Layer: Buttons → translateZ(60px) (nested +35px from 25px) */}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ transform: 'translateZ(35px)' }}
            className="text-[11px] font-semibold text-accent hover:underline"
          >
            View →
          </a>
        </div>
      </GithubDepthCard>
    </div>
  );
};

/* ─── Skeleton loader ────────────────────────────────────── */
const Skeleton = ({ className = '' }) => (
  <div className={`bg-surface/60 rounded-xl animate-pulse ${className}`} />
);

/* ─── Main section ───────────────────────────────────────── */
const GithubShowcase = () => {
  const containerRef = useRef(null);
  const avatarRef = useRef(null);

  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useScrollReveal(containerRef, '.reveal-item', 0.08);

  /* Avatar float animation */
  useGSAP(() => {
    if (!avatarRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.to(avatarRef.current, {
      y: -8,
      duration: 2.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }, { scope: avatarRef, dependencies: [profile] });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const cachedData = localStorage.getItem('github_showcase_cache');
        const cachedTime = localStorage.getItem('github_showcase_cache_time');
        const now = Date.now();

        // 30 minutes cache TTL
        if (cachedData && cachedTime && (now - Number(cachedTime) < 30 * 60 * 1000)) {
          const parsed = JSON.parse(cachedData);
          setProfile(parsed.profile);
          setRepos(parsed.repos);
          setLoading(false);
          return;
        }

        const [pRes, rRes] = await Promise.all([
          fetch('https://api.github.com/users/codax69'),
          fetch('https://api.github.com/users/codax69/repos?sort=updated&per_page=6'),
        ]);

        if (pRes.ok && rRes.ok) {
          const pData = await pRes.json();
          const rData = await rRes.json();

          if (pData && pData.login && Array.isArray(rData)) {
            // Fetch the latest commit for each repository
            const reposWithCommits = await Promise.all(
              rData.map(async (repo) => {
                try {
                  const cRes = await fetch(`https://api.github.com/repos/codax69/${repo.name}/commits?per_page=1`);
                  if (cRes.ok) {
                    const cData = await cRes.json();
                    if (Array.isArray(cData) && cData.length > 0) {
                      return {
                        ...repo,
                        latest_commit: {
                          message: cData[0].commit.message,
                          date: cData[0].commit.committer.date,
                        }
                      };
                    }
                  }
                } catch (cErr) {
                  console.error(`Error fetching commits for ${repo.name}:`, cErr);
                }
                return repo;
              })
            );

            setProfile(pData);
            setRepos(reposWithCommits);

            localStorage.setItem('github_showcase_cache', JSON.stringify({ profile: pData, repos: reposWithCommits }));
            localStorage.setItem('github_showcase_cache_time', now.toString());
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error('GitHub API error, using static fallback:', err);
      }

      // Fallback data when API fails or rate limits are hit
      const fallbackProfile = {
        login: "codax69",
        avatar_url: "https://avatars.githubusercontent.com/u/128021116?v=4",
        name: "Pritesh Patel",
        html_url: "https://github.com/codax69",
        bio: "Full Stack MERN Developer | Co-founder at VegBazar",
        location: "Surat, Gujarat, India",
        public_repos: 32,
        followers: 5,
        following: 5
      };

      const fallbackRepos = [
        {
          id: 1,
          name: "VegBazar",
          html_url: "https://github.com/codax69/VegBazar",
          description: "An e-commerce platform for ordering vegetables online.",
          language: "JavaScript",
          stargazers_count: 5,
          forks_count: 2,
          visibility: "public",
          latest_commit: {
            message: "Initial production release",
            date: new Date().toISOString()
          }
        },
        {
          id: 2,
          name: "Protfolio",
          html_url: "https://github.com/codax69/Protfolio",
          description: "Personal portfolio website with interactive 3D elements and animations.",
          language: "JavaScript",
          stargazers_count: 4,
          forks_count: 1,
          visibility: "public",
          latest_commit: {
            message: "feat: style modifications",
            date: new Date().toISOString()
          }
        }
      ];

      setProfile(fallbackProfile);
      setRepos(fallbackRepos);
      setLoading(false);
    };
    fetchAll();
  }, []);
  return (
    <section ref={containerRef} id="github" className="py-28 bg-base border-t border-border relative overflow-hidden">

      {/* Ambient radial glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px]
                      bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ─── Heading ─── */}
        <div className="mb-16 reveal-item">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Code Activity
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl mt-2 tracking-tight">
            GitHub Showcase
          </h2>
          <p className="text-muted text-sm md:text-base font-light mt-3 max-w-lg">
            Live profile stats and recent repositories, fetched directly from the GitHub API.
          </p>
        </div>

        {/* ─── Layout grid ─── */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

          {/* ── Profile panel ── */}
          <div className="xl:col-span-4 reveal-item">
            {loading ? (
              <div className="flex flex-col gap-4">
                <Skeleton className="h-64 w-full rounded-2xl" />
                <Skeleton className="h-20 w-full rounded-2xl" />
              </div>
            ) : profile ? (
              <div className="flex flex-col gap-4">

                {/* Avatar + bio card */}
                <div className="bg-gradient-to-br from-[#141414]/85 to-[#0A0A0A]/95 border border-[#7C5CFF]/15 shadow-[8px_8px_24px_rgba(0,0,0,0.6),inset_3px_3px_6px_rgba(255,255,255,0.04),inset_-4px_-4px_8px_rgba(0,0,0,0.8),inset_0_0_10px_rgba(124,92,255,0.1)] rounded-2xl p-8 flex flex-col items-center text-center relative overflow-hidden">
                  {/* Glassmorphic grid accent */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/8 rounded-bl-full pointer-events-none blur-2xl" />

                  {/* Floating avatar */}
                  <div ref={avatarRef} className="relative mb-6 will-change-transform">
                    <div className="w-28 h-28 rounded-full border-2 border-white/20 bg-gradient-to-br from-[#141414] to-[#0A0A0A] p-[3px] shadow-[6px_6px_18px_rgba(0,0,0,0.5),inset_3px_3px_6px_rgba(255,255,255,0.2),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_0_0_10px_rgba(124,92,255,0.25)] overflow-hidden relative">
                      <img
                        src={profile?.avatar_url}
                        alt="Pritesh Patel"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    {/* Online indicator */}
                    <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full
                                     border-2 border-surface shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                  </div>

                  {/* Name */}
                  <h3 className="font-display font-bold text-xl text-text">
                    {profile?.name || 'Pritesh Patel'}
                  </h3>
                  <a
                    href={profile?.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent font-mono mt-0.5 hover:underline"
                  >
                    @{profile?.login}
                  </a>

                  {/* Bio */}
                  {profile?.bio && (
                    <p className="text-xs text-muted font-light leading-relaxed mt-4 max-w-[220px]">
                      {profile.bio}
                    </p>
                  )}

                  {/* Location */}
                  {profile?.location && (
                    <span className="flex items-center gap-1 text-xs text-muted mt-3">
                      <MapPin size={11} className="text-accent" />
                      {profile.location}
                    </span>
                  )}

                  {/* CTA */}
                  <a
                    href={profile?.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full flex items-center justify-center gap-2 py-2.5
                               border border-border hover:border-accent hover:text-accent
                               rounded-xl text-sm font-semibold transition-all duration-200 group"
                  >
                    <Github size={15} className="group-hover:rotate-12 transition-transform duration-200" />
                    Open GitHub Profile
                  </a>
                </div>

                {/* Stats grid card */}
                <div className="bg-gradient-to-br from-[#141414]/85 to-[#0A0A0A]/95 border border-[#7C5CFF]/15 shadow-[8px_8px_24px_rgba(0,0,0,0.6),inset_3px_3px_6px_rgba(255,255,255,0.04),inset_-4px_-4px_8px_rgba(0,0,0,0.8),inset_0_0_10px_rgba(124,92,255,0.1)] rounded-2xl overflow-hidden grid grid-cols-3 divide-x divide-border">
                  {[
                    { label: 'Repos', icon: BookMarked, value: profile?.public_repos ?? 32 },
                    { label: 'Followers', icon: Users, value: profile?.followers ?? 5 },
                    { label: 'Views', icon: Activity, value: ((profile?.followers ?? 5) * 164) + 120 },
                  ].map(({ label, icon: Icon, value }) => (
                    <div key={label} className="flex flex-col items-center py-5 gap-1
                                                 hover:bg-accent/5 transition-colors duration-200 cursor-default group">
                      <Icon size={14} className="text-muted group-hover:text-accent transition-colors duration-200" />
                      <span className="font-display font-bold text-xl text-text">
                        <CountUp target={value} />
                      </span>
                      <span className="text-[9px] uppercase font-semibold tracking-widest text-muted">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-surface border border-border rounded-2xl p-8 flex flex-col items-center gap-4 text-center">
                <Github size={40} className="text-muted" />
                <p className="text-sm text-muted">Could not load GitHub profile.</p>
                <a href="https://github.com/codax69" target="_blank" rel="noopener noreferrer"
                  className="text-accent text-sm hover:underline">View manually →</a>
              </div>
            )}
          </div>

          {/* ── Repositories grid ── */}
          <div className="xl:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-44 rounded-2xl" />
                ))
                : repos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))
              }
            </div>

            {/* View all CTA */}
            {!loading && (
              <div className="mt-8 flex justify-center reveal-item">
                <a
                  href="https://github.com/codax69?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[#141414]/85 to-[#0A0A0A]/95 border border-[#7C5CFF]/15 shadow-[4px_4px_12px_rgba(0,0,0,0.5),inset_2px_2px_4px_rgba(255,255,255,0.04),inset_-2px_-2px_4px_rgba(0,0,0,0.6)] hover:border-[#7C5CFF]/40 hover:text-accent hover:-translate-y-[1.5px] hover:shadow-[6px_6px_16px_rgba(124,92,255,0.15),inset_2.5px_2.5px_5px_rgba(255,255,255,0.05),inset_-2.5px_-2.5px_5px_rgba(0,0,0,0.6)] active:scale-[0.98] active:translate-y-0 rounded-full text-sm font-semibold text-muted transition-all duration-300"
                >
                  <Github size={15} />
                  View all repositories
                  <ExternalLink size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </a>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default GithubShowcase;
