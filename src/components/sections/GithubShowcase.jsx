import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsapConfig';
import { useScrollReveal } from '../../animations/useScrollReveal';
import DepthCard from '../ui/DepthCard';
import {
  Github, ExternalLink, Star, GitFork,
  MapPin, Users, BookMarked, Activity, Code2
} from 'lucide-react';

/* ─── helpers ───────────────────────────────────────────── */

const LANG_COLORS = {
  javascript: '#F7DF1E',
  typescript: '#3178C6',
  html:       '#E34F26',
  css:        '#1572B6',
  python:     '#3776AB',
  vue:        '#42B883',
  react:      '#61DAFB',
  default:    '#8A8A8A',
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
      <DepthCard className="h-full flex flex-col justify-between p-5">
        <div>
          {/* Visibility badge */}
          <span className="inline-block text-[9px] font-bold uppercase tracking-widest px-2 py-0.5
                           border border-border text-muted rounded-full mb-4 bg-base/50">
            {repo.visibility}
          </span>

          {/* Repo name */}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 mb-2"
          >
            <Code2 size={15} className="text-accent shrink-0" />
            <span className="font-display font-bold text-base text-text
                             group-hover:text-accent transition-colors duration-200 truncate">
              {repo.name}
            </span>
            <ExternalLink size={11} className="text-muted shrink-0 opacity-0 group-hover:opacity-100
                                                transition-opacity duration-200 ml-auto" />
          </a>

          {/* Description */}
          <p className="text-xs text-muted font-light leading-relaxed line-clamp-2 min-h-[2.4rem] mb-4">
            {repo.description || 'No description provided.'}
          </p>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
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

          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold text-accent hover:underline"
          >
            View →
          </a>
        </div>
      </DepthCard>
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
  const avatarRef    = useRef(null);

  const [profile, setProfile] = useState(null);
  const [repos,   setRepos]   = useState([]);
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
        const [pRes, rRes] = await Promise.all([
          fetch('https://api.github.com/users/codax69'),
          fetch('https://api.github.com/users/codax69/repos?sort=updated&per_page=6'),
        ]);
        const [pData, rData] = await Promise.all([pRes.json(), rRes.json()]);
        setProfile(pData);
        if (Array.isArray(rData)) setRepos(rData);
      } catch (err) {
        console.error('GitHub API error:', err);
      } finally {
        setLoading(false);
      }
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
            05 / Code Activity
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
                <div className="bg-surface border border-border rounded-2xl p-8 flex flex-col items-center text-center relative overflow-hidden">
                  {/* Glassmorphic grid accent */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/8 rounded-bl-full pointer-events-none blur-2xl" />

                  {/* Floating avatar */}
                  <div ref={avatarRef} className="relative mb-6 will-change-transform">
                    <div className="w-28 h-28 rounded-full border-2 border-border overflow-hidden
                                    shadow-[0_0_30px_rgba(124,92,255,0.25)] relative">
                      <img
                        src={profile.avatar_url}
                        alt="Pritesh Patel"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Online indicator */}
                    <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full
                                     border-2 border-surface shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                  </div>

                  {/* Name */}
                  <h3 className="font-display font-bold text-xl text-text">
                    {profile.name || 'Pritesh Patel'}
                  </h3>
                  <a
                    href={profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent font-mono mt-0.5 hover:underline"
                  >
                    @{profile.login}
                  </a>

                  {/* Bio */}
                  {profile.bio && (
                    <p className="text-xs text-muted font-light leading-relaxed mt-4 max-w-[220px]">
                      {profile.bio}
                    </p>
                  )}

                  {/* Location */}
                  {profile.location && (
                    <span className="flex items-center gap-1 text-xs text-muted mt-3">
                      <MapPin size={11} className="text-accent" />
                      {profile.location}
                    </span>
                  )}

                  {/* CTA */}
                  <a
                    href={profile.html_url}
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
                <div className="bg-surface border border-border rounded-2xl overflow-hidden grid grid-cols-3 divide-x divide-border">
                  {[
                    { label: 'Repos',     icon: BookMarked, value: profile.public_repos },
                    { label: 'Followers', icon: Users,      value: profile.followers },
                    { label: 'Following', icon: Activity,   value: profile.following },
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
                  className="group inline-flex items-center gap-2 px-6 py-3
                             border border-border hover:border-accent rounded-full
                             text-sm font-semibold text-muted hover:text-accent
                             transition-all duration-300"
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
