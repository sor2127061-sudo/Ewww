/// <reference types="vite/client" />
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StrictMode, useState, useRef, useEffect } from 'react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, Search, User, Moon, Sun, Palette, PlaySquare, Clock, Download,
  Home, History, ThumbsUp, Settings, X, ThumbsDown, Share2, MoreHorizontal,
  Play, Pause, Volume2, VolumeX, Maximize, Minimize, Subtitles, SkipForward,
  Check, ChevronLeft, ChevronRight, FastForward, Rewind
} from 'lucide-react';
import './index.css';

// ==================== types.ts ====================

export interface VideoStream {
  name: string;
  quality: string;
  url: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  channel: string;
  channelAvatar: string;
  views: string;
  postedAt: string;
  description: string;
  likes: string;
  subscribers: string;
  streams?: VideoStream[];
}

export interface UserProfile {
  name: string;
  avatar: string;
  email: string;
}

// ==================== components/Navbar.tsx ====================

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  toggleSidebar: () => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  themeClasses: { text: string };
}

function Navbar({ theme, toggleTheme, toggleSidebar, accentColor, setAccentColor, themeClasses }: NavbarProps) {
  const colors = [
    { name: 'Red', class: 'text-red-500' },
    { name: 'Blue', class: 'text-blue-500' },
    { name: 'Green', class: 'text-green-500' },
    { name: 'Purple', class: 'text-purple-500' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-[#0f0f0f] border-b border-neutral-200 dark:border-neutral-800 z-50 flex items-center justify-between px-4">
      {/* Left */}
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-1 cursor-pointer">
          <PlaySquare className={`w-8 h-8 ${themeClasses.text}`} fill="currentColor" />
          <span className="text-xl font-bold tracking-tight hidden sm:block">NexusPlay</span>
        </div>
      </div>

      {/* Middle - Search */}
      <div className="hidden md:flex flex-1 max-w-2xl px-12">
        <div className="flex w-full items-center">
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-neutral-100 dark:bg-[#121212] border border-neutral-300 dark:border-[#303030] rounded-l-full px-5 py-2 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button className="bg-neutral-100 dark:bg-[#222222] border border-l-0 border-neutral-300 dark:border-[#303030] rounded-r-full px-6 py-2 hover:bg-neutral-200 dark:hover:bg-[#303030] transition-colors" title="Search">
            <Search className="w-5 h-5 opacity-70" />
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button className="md:hidden p-2">
          <Search className="w-6 h-6" />
        </button>
        
        {/* Theme Toggles */}
        <div className="group relative">
          <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <Palette className="w-6 h-6" />
          </button>
          <div className="absolute right-0 mt-2 w-32 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl hidden group-hover:block">
            {colors.map(c => (
              <button 
                key={c.name}
                onClick={() => setAccentColor(c.class)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 ${accentColor === c.class ? 'font-bold' : ''}`}
              >
                <span className={`inline-block w-3 h-3 rounded-full mr-2 bg-${c.class.split('-')[1]}-500`}></span>
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
          {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
        
        <button onClick={toggleSidebar} className="p-1 rounded-full overflow-hidden border-2 border-transparent hover:border-blue-500 transition-colors">
          <img src="https://ui-avatars.com/api/?name=User&background=random" alt="Profile" className="w-8 h-8 rounded-full" />
        </button>
      </div>
    </nav>
  );
}

// ==================== components/Sidebar.tsx ====================

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  themeClasses: { text: string; bgHover: string };
}

function Sidebar({ isOpen, onClose, themeClasses }: SidebarProps) {
  const navItems = [
    { icon: Home, label: 'Home' },
    { icon: History, label: 'History' },
    { icon: Clock, label: 'Watch Later' },
    { icon: Download, label: 'Downloads' },
    { icon: ThumbsUp, label: 'Liked Videos' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar Panel */}
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-[#0f0f0f] z-50 border-r border-neutral-200 dark:border-neutral-800"
          >
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Profile Summary */}
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex flex-col items-center">
              <img src="https://ui-avatars.com/api/?name=User&background=random" className="w-20 h-20 rounded-full mb-3 shadow-md" alt="Profile" />
              <h3 className="font-bold text-lg">Guest User</h3>
              <p className="text-sm opacity-60">guest@nexusplay.app</p>
              <button className={`mt-4 px-6 py-2 rounded-full text-sm font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors`}>
                Manage Profile
              </button>
            </div>

            <div className="py-4">
              {navItems.map((item, index) => (
                <button 
                  key={index}
                  className={`w-full flex items-center space-x-4 px-6 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${index === 0 ? themeClasses.text + ' font-semibold bg-neutral-50 dark:bg-neutral-800/50' : ''}`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200 dark:border-neutral-800">
              <button className="w-full flex items-center space-x-4 px-2 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors rounded-lg">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ==================== components/Playlist.tsx ====================

interface PlaylistProps {
  videos: Video[];
  currentVideoId: string;
  onSelect: (video: Video) => void;
  themeClasses: { text: string };
  isLoading?: boolean;
}

function Playlist({ videos, currentVideoId, onSelect, themeClasses, isLoading }: PlaylistProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col space-y-2 lg:space-y-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="flex gap-2 p-1 lg:p-0 animate-pulse">
            {/* Thumbnail Skeleton */}
            <div className="relative w-40 lg:w-[168px] aspect-video flex-shrink-0 bg-neutral-300 dark:bg-[#272727] rounded-xl"></div>
            
            {/* Text Skeleton */}
            <div className="flex-1 overflow-hidden py-0.5 space-y-2">
              <div className="h-3.5 bg-neutral-300 dark:bg-[#272727] rounded w-full"></div>
              <div className="h-3.5 bg-neutral-300 dark:bg-[#272727] rounded w-5/6"></div>
              <div className="h-3 bg-neutral-300 dark:bg-[#272727] rounded w-1/2 mt-2"></div>
              <div className="h-3 bg-neutral-300 dark:bg-[#272727] rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 lg:space-y-6 lg:pr-2 pb-10">
      <h3 className="font-bold text-[18px] mb-2 hidden lg:block">Recommended</h3>
      {videos.map((video, index) => {
        const isCurrent = video.id === currentVideoId;
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            key={video.id + '-' + index}
            onClick={() => onSelect(video)}
            className={`flex flex-col gap-3 cursor-pointer group`}
          >
            <div className="relative w-full aspect-video flex-shrink-0">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover rounded-xl group-hover:rounded-none transition-all duration-300"
              />
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[12px] font-medium px-1.5 py-0.5 rounded">
                10:00
              </span>
            </div>
            
            <div className="flex gap-3 px-1 lg:px-0">
              <img 
                src={video.channelAvatar} 
                alt={video.channel} 
                className="w-9 h-9 rounded-full object-cover mt-0.5" 
              />
              <div className="flex-1 overflow-hidden">
                <h4 className={`text-[16px] font-medium leading-snug mb-1 line-clamp-2 ${isCurrent ? themeClasses.text : ''}`}>
                  {video.title}
                </h4>
                <p className="text-[14px] text-neutral-600 dark:text-[#AAAAAA] mb-0.5 line-clamp-1 hover:text-neutral-900 dark:hover:text-white transition-colors">{video.channel}</p>
                <p className="text-[14px] text-neutral-600 dark:text-[#AAAAAA] line-clamp-1">
                  {video.views} views • {video.postedAt}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ==================== components/VideoDetails.tsx ====================

interface VideoDetailsProps {
  video: Video;
  themeClasses: { text: string; bgHover: string; activeBg: string };
  isLoading?: boolean;
}

function VideoDetails({ video, themeClasses, isLoading }: VideoDetailsProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);
  const [showDesc, setShowDesc] = useState(false);

  const handleDownload = () => {
    alert('Download started...');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert(`Share link copied: ${window.location.href}`);
  };

  if (isLoading) {
    return (
      <div className="py-4 animate-pulse">
        {/* Title Skeleton */}
        <div className="h-6 md:h-8 bg-neutral-300 dark:bg-[#272727] rounded-md w-3/4 mb-4"></div>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
          {/* Channel Info Skeleton */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-neutral-300 dark:bg-[#272727]"></div>
            <div className="space-y-2">
              <div className="h-4 bg-neutral-300 dark:bg-[#272727] rounded-md w-32"></div>
              <div className="h-3 bg-neutral-300 dark:bg-[#272727] rounded-md w-24"></div>
            </div>
            <div className="ml-4 w-28 h-9 rounded-full bg-neutral-300 dark:bg-[#272727]"></div>
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex items-center space-x-2 w-full lg:w-auto">
            <div className="w-32 h-9 rounded-full bg-neutral-300 dark:bg-[#272727]"></div>
            <div className="w-24 h-9 rounded-full bg-neutral-300 dark:bg-[#272727]"></div>
            <div className="w-28 h-9 rounded-full bg-neutral-300 dark:bg-[#272727]"></div>
          </div>
        </div>

        {/* Description Box Skeleton */}
        <div className="bg-neutral-200 dark:bg-[#272727] rounded-xl p-3 mt-2">
          <div className="h-4 bg-neutral-300 dark:bg-[#3f3f3f] rounded-md w-1/4 mb-3"></div>
          <div className="space-y-2">
            <div className="h-3 bg-neutral-300 dark:bg-[#3f3f3f] rounded-md w-full"></div>
            <div className="h-3 bg-neutral-300 dark:bg-[#3f3f3f] rounded-md w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-3"
    >
      <h1 className="text-xl md:text-[22px] font-bold mb-2.5 leading-tight">{video.title}</h1>
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 mb-3">
        
        {/* Channel Info */}
        <div className="flex items-center">
          <img src={video.channelAvatar} alt={video.channel} className="w-10 h-10 rounded-full object-cover mr-3 cursor-pointer" />
          <div className="mr-6 cursor-pointer">
            <h3 className="font-bold text-[15px] leading-tight">{video.channel}</h3>
            <p className="text-[12px] text-neutral-600 dark:text-[#AAAAAA]">{video.subscribers} subscribers</p>
          </div>
          <button 
            onClick={() => setIsSubscribed(!isSubscribed)}
            className={`px-4 py-2 text-sm rounded-full font-medium transition-all flex items-center
              ${isSubscribed ? `bg-neutral-100 dark:bg-[#272727] text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-[#3f3f3f]` : 'bg-black text-white dark:bg-white dark:text-black hover:opacity-90'}
            `}
          >
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide text-sm mt-3 lg:mt-0">
          <div className="flex bg-neutral-100 dark:bg-[#272727] rounded-full">
            <button 
              onClick={() => setLiked(true)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-l-full hover:bg-neutral-200 dark:hover:bg-[#3f3f3f] transition-colors border-r border-neutral-300 dark:border-[#3f3f3f] relative`}
            >
              <ThumbsUp className={`w-[18px] h-[18px] ${liked === true ? 'fill-current' : ''}`} />
              <span className="font-medium">{video.likes}</span>
            </button>
            <button 
              onClick={() => setLiked(false)}
              className={`flex items-center px-3 py-2 rounded-r-full hover:bg-neutral-200 dark:hover:bg-[#3f3f3f] transition-colors`}
            >
              <ThumbsDown className={`w-[18px] h-[18px] ${liked === false ? 'fill-current' : ''}`} />
            </button>
          </div>

          <button onClick={handleShare} className="flex items-center space-x-2 bg-neutral-100 dark:bg-[#272727] hover:bg-neutral-200 dark:hover:bg-[#3f3f3f] px-4 py-2 rounded-full font-medium transition-colors">
            <Share2 className="w-[18px] h-[18px]" />
            <span className="hidden sm:inline">Share</span>
          </button>
          
          <button onClick={handleDownload} className="flex items-center space-x-2 bg-neutral-100 dark:bg-[#272727] hover:bg-neutral-200 dark:hover:bg-[#3f3f3f] px-4 py-2 rounded-full font-medium transition-colors">
            <Download className="w-[18px] h-[18px]" />
            <span className="hidden sm:inline">Download</span>
          </button>

          <button className="flex items-center justify-center bg-neutral-100 dark:bg-[#272727] hover:bg-neutral-200 dark:hover:bg-[#3f3f3f] w-9 h-9 rounded-full transition-colors">
            <MoreHorizontal className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* Description Box */}
      <motion.div 
        layout
        className="bg-neutral-100 dark:bg-[#272727] hover:bg-neutral-200 dark:hover:bg-[#3f3f3f] rounded-xl p-3 mt-1 cursor-pointer transition-colors"
        onClick={() => setShowDesc(!showDesc)}
      >
        <div className="flex items-center space-x-2 text-sm font-semibold mb-1">
          <span>{video.views} views</span>
          <span>•</span>
          <span>{video.postedAt}</span>
        </div>
        
        <AnimatePresence>
          <motion.div
            key="description"
            initial={false}
            animate={{ height: showDesc ? 'auto' : '2.5rem' }}
            className="overflow-hidden"
          >
            <p className="text-sm whitespace-pre-wrap text-neutral-800 dark:text-[#f1f1f1]">
              {video.description}
            </p>
          </motion.div>
        </AnimatePresence>
        
        <button className="text-sm font-bold mt-1">
          {showDesc ? 'Show less' : '...more'}
        </button>
      </motion.div>
    </motion.div>
  );
}

// ==================== components/VideoPlayer.tsx ====================

interface VideoPlayerProps {
  video: Video;
  accentColor: string;
  onNextVideo?: () => void;
  autoPlay: boolean;
  setAutoPlay: (val: boolean) => void;
}

function VideoPlayer({ video, accentColor, onNextVideo, autoPlay, setAutoPlay }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bufferedProgress, setBufferedProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsMenuState, setSettingsMenuState] = useState<'main' | 'speed' | 'quality'>('main');
  
  const defaultQuality = video.streams && video.streams.length > 0 ? (video.streams.find(s => s.quality === '720p')?.quality || video.streams[0].quality) : '720p';
  const [quality, setQuality] = useState(defaultQuality);
  const [currentUrl, setCurrentUrl] = useState(video.url);

  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [centerIcon, setCenterIcon] = useState<'play' | 'pause' | 'forward' | 'backward' | null>(null);

  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  const centerIconTimeoutRef = useRef<NodeJS.Timeout>();

  const triggerCenterIcon = (type: 'play' | 'pause' | 'forward' | 'backward') => {
    setCenterIcon(type);
    if (centerIconTimeoutRef.current) clearTimeout(centerIconTimeoutRef.current);
    centerIconTimeoutRef.current = setTimeout(() => setCenterIcon(null), 500);
  };

  // Reset state on video change
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    
    // Set default quality/url for new video
    const defQ = video.streams && video.streams.length > 0 ? (video.streams.find(s => s.quality === '720p')?.quality || video.streams[0].quality) : '720p';
    setQuality(defQ);
    setCurrentUrl(video.url);

    if (autoPlay && videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [video, autoPlay]);

  const handleQualityChange = (newQuality: string) => {
    if (!video.streams) return;
    const stream = video.streams.find(s => s.quality === newQuality);
    if (stream) {
      const time = videoRef.current?.currentTime || 0;
      setQuality(newQuality);
      setCurrentUrl(stream.url);
      setSettingsMenuState('main');
      setShowSettings(false);
      
      // Need to seek to the same time after URL changes
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = time;
          if (isPlaying) {
             videoRef.current.play().catch(e => console.error(e));
          }
        }
      }, 100);
    }
  };

  // Handle controls visibility timeout
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  const handleMouseLeave = () => {
    if (isPlaying && !showSettings) {
      setShowControls(false);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        triggerCenterIcon('pause');
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            // Ignore play() interruption error when double clicking
            if (error.name !== 'AbortError') console.error(error);
          });
        }
        triggerCenterIcon('play');
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLVideoElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      if (clickX < rect.width / 2) {
        // seek backward
        videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
        triggerCenterIcon('backward');
      } else {
        // seek forward
        videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 10);
        triggerCenterIcon('forward');
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      setProgress(total ? (current / total) * 100 : 0);
      
      // Auto advance
      if (current === total && autoPlay && onNextVideo) {
        onNextVideo();
      }
    }
  };

  const handleBufferProgress = () => {
    if (videoRef.current && videoRef.current.buffered.length > 0 && duration > 0) {
      const bufferedEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
      setBufferedProgress((bufferedEnd / duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (videoRef.current) {
      const time = (value / 100) * duration;
      videoRef.current.currentTime = time;
      setProgress(value);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value;
      setIsMuted(value === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      if (newMuted) {
        setVolume(0);
      } else {
        setVolume(1);
        videoRef.current.volume = 1;
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const changePlaybackRate = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
      setShowSettings(false);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div 
      ref={containerRef}
      className="relative group bg-black w-full aspect-video overflow-hidden shadow-xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <video
        key={video.id}
        ref={videoRef}
        src={currentUrl}
        className="w-full h-full object-contain cursor-pointer"
        onClick={togglePlay}
        onDoubleClick={handleDoubleClick}
        onTimeUpdate={handleTimeUpdate}
        onProgress={handleBufferProgress}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        poster={video.thumbnail}
      />

      {/* Center Action Icon Animation */}
      <AnimatePresence>
        {centerIcon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.4 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 bg-black/30 backdrop-blur-md border border-white/10 rounded-full pointer-events-none shadow-lg"
          >
            {centerIcon === 'play' && <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />}
            {centerIcon === 'pause' && <Pause className="w-8 h-8 text-white" fill="currentColor" />}
            {centerIcon === 'forward' && (
              <div className="flex flex-col items-center">
                <FastForward className="w-6 h-6 text-white" fill="currentColor" />
                <span className="text-white text-xs font-bold mt-1">10s</span>
              </div>
            )}
            {centerIcon === 'backward' && (
              <div className="flex flex-col items-center">
                <Rewind className="w-6 h-6 text-white" fill="currentColor" />
                <span className="text-white text-xs font-bold mt-1">10s</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtitles Overlay Mock */}
      {showSubtitles && (
        <div className="absolute bottom-20 left-0 right-0 text-center pointer-events-none">
          <span className="bg-black/70 text-white px-4 py-1 rounded text-lg lg:text-xl font-medium">
            [Sample Subtitle Text]
          </span>
        </div>
      )}

      {/* Controls Overlay */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="px-2 pb-1 pt-12">
          {/* YouTube-style Scrubber */}
          <div className="relative w-full h-[5px] group/scrubber cursor-pointer mb-1 flex items-center" onClick={(e) => {
             const rect = e.currentTarget.getBoundingClientRect();
             const pos = (e.clientX - rect.left) / rect.width;
             if (videoRef.current) {
               videoRef.current.currentTime = pos * duration;
               setProgress(pos * 100);
             }
          }}>
            <div className="w-full h-[3px] group-hover/scrubber:h-[5px] bg-white/20 transition-all relative">
              <div className="absolute top-0 left-0 h-full bg-white/40 transition-all duration-300" style={{ width: `${bufferedProgress}%` }} />
              {/* Progress */}
              <div className="absolute top-0 left-0 h-full bg-[#ff0000]" style={{ width: `${progress}%` }} />
              {/* Thumb */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-[13px] h-[13px] bg-[#ff0000] rounded-full opacity-0 group-hover/scrubber:opacity-100 transition-transform scale-50 group-hover/scrubber:scale-100" 
                style={{ left: `${progress}%`, marginLeft: '-6.5px' }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-white pb-1 pt-1">
            {/* Left Controls */}
            <div className="flex items-center gap-0.5">
              <button onClick={togglePlay} className="p-1.5 hover:bg-white/10 rounded-md transition-colors focus:outline-none">
                {isPlaying ? <Pause className="w-5 h-5" fill="currentColor" /> : <Play className="w-5 h-5" fill="currentColor" />}
              </button>

              {onNextVideo && (
                <button onClick={onNextVideo} className="p-1.5 hover:bg-white/10 rounded-md transition-colors focus:outline-none">
                  <SkipForward className="w-5 h-5" fill="currentColor" />
                </button>
              )}
              
              <div className="flex items-center group/volume h-full">
                <button onClick={toggleMute} className="p-1.5 hover:bg-white/10 rounded-md transition-colors focus:outline-none">
                  {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <div className="w-0 overflow-hidden group-hover/volume:w-16 transition-all duration-300 ease-out flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume || 0}
                    onChange={handleVolumeChange}
                    className="w-full h-1 bg-white/20 appearance-none cursor-pointer rounded-full outline-none"
                    style={{
                      background: `linear-gradient(to right, white ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`,
                    }}
                  />
                </div>
              </div>

              <div className="text-[12px] font-normal tracking-wide px-2 select-none opacity-90 flex items-center">
                <span>{formatTime(currentTime)}</span>
                <span className="mx-1 text-white/40">/</span>
                <span className="text-white/70">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-0.5 relative">
              {/* AutoPlay Toggle */}
              <div className="hidden sm:flex items-center mr-2 px-1">
                <button 
                  onClick={() => setAutoPlay(!autoPlay)}
                  className="relative flex items-center justify-center w-[30px] h-[12px] bg-white/20 rounded-full transition-colors focus:outline-none"
                  title="Autoplay"
                >
                  <div className={`absolute w-[16px] h-[16px] rounded-full bg-white transition-all duration-300 shadow-sm ${autoPlay ? 'left-[14px]' : '-left-[2px]'}`}>
                    {autoPlay && <Play className="w-[8px] h-[8px] text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ml-[1px]" fill="currentColor" />}
                  </div>
                </button>
              </div>

              <button 
                onClick={() => setShowSubtitles(!showSubtitles)} 
                className="relative p-1.5 hover:bg-white/10 rounded-md transition-colors focus:outline-none"
                title="Subtitles (c)"
              >
                <Subtitles className="w-5 h-5" />
                {showSubtitles && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[16px] h-[2px] bg-[#ff0000]" />}
              </button>

              <button 
                onClick={() => setShowSettings(!showSettings)} 
                className="p-1.5 hover:bg-white/10 rounded-md transition-colors focus:outline-none"
              >
                <Settings className={`w-5 h-5 ${showSettings ? 'rotate-45 transition-transform' : 'transition-transform'}`} />
              </button>

              <button onClick={toggleFullscreen} className="p-1.5 hover:bg-white/10 rounded-md transition-colors focus:outline-none">
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>

              {/* Settings Menu Popup */}
              {showSettings && (
                <div className="absolute bottom-12 right-0 md:right-2 bg-black/50 backdrop-blur-2xl border border-white/20 rounded-2xl py-2 w-56 md:w-64 shadow-[0_8px_32px_rgba(0,0,0,0.8)] z-50 text-[13px] flex flex-col max-h-[300px] md:max-h-[400px]">
                  
                  {/* Main Menu */}
                  {settingsMenuState === 'main' && (
                    <div className="flex flex-col overflow-y-auto">
                      <div className="px-2 py-1">
                        <button 
                          onClick={() => setSettingsMenuState('quality')}
                          className="flex items-center justify-between w-full p-2.5 hover:bg-white/10 rounded-lg transition-colors group"
                        >
                          <div className="flex items-center space-x-3 text-white/90">
                            <Settings className="w-[18px] h-[18px]" />
                            <span>Quality</span>
                          </div>
                          <div className="flex items-center space-x-1 text-white/50 group-hover:text-white/80">
                            <span>{quality}</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </button>
                      </div>
                      
                      <div className="px-2 py-1">
                        <button 
                          onClick={() => setSettingsMenuState('speed')}
                          className="flex items-center justify-between w-full p-2.5 hover:bg-white/10 rounded-lg transition-colors group"
                        >
                          <div className="flex items-center space-x-3 text-white/90">
                            <Play className="w-[18px] h-[18px]" />
                            <span>Playback speed</span>
                          </div>
                          <div className="flex items-center space-x-1 text-white/50 group-hover:text-white/80">
                            <span>{playbackRate === 1 ? 'Normal' : playbackRate + 'x'}</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Playback Speed Submenu */}
                  {settingsMenuState === 'speed' && (
                    <div className="flex flex-col overflow-hidden">
                      <div className="flex items-center space-x-3 px-4 py-2 border-b border-white/10 mb-1 flex-shrink-0">
                        <button 
                          onClick={() => setSettingsMenuState('main')}
                          className="p-1 -ml-1 hover:bg-white/10 rounded-full transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="font-semibold text-[14px]">Playback speed</span>
                      </div>
                      <div className="flex flex-col py-1 overflow-y-auto">
                        {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
                          <button
                            key={rate}
                            onClick={() => { changePlaybackRate(rate); setSettingsMenuState('main'); setShowSettings(false); }}
                            className={`flex items-center w-full px-10 py-2 hover:bg-white/10 transition-colors relative flex-shrink-0 ${playbackRate === rate ? 'font-medium' : ''}`}
                          >
                            {playbackRate === rate && <Check className="w-4 h-4 absolute left-3" />}
                            <span>{rate === 1 ? 'Normal' : rate}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quality Submenu */}
                  {settingsMenuState === 'quality' && (
                    <div className="flex flex-col overflow-hidden">
                      <div className="flex items-center space-x-3 px-4 py-2 border-b border-white/10 mb-1 flex-shrink-0">
                        <button 
                          onClick={() => setSettingsMenuState('main')}
                          className="p-1 -ml-1 hover:bg-white/10 rounded-full transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="font-semibold text-[14px]">Quality</span>
                      </div>
                      <div className="flex flex-col py-1 overflow-y-auto">
                        {(video.streams ? video.streams.map(s => s.quality) : ['720p']).map((q) => (
                          <button
                            key={q}
                            onClick={() => handleQualityChange(q)}
                            className={`flex items-center w-full px-10 py-2 hover:bg-white/10 transition-colors relative flex-shrink-0 ${quality === q ? 'font-medium' : ''}`}
                          >
                            {quality === q && <Check className="w-4 h-4 absolute left-3" />}
                            <span>{q}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== App.tsx ====================

const WORKER_URL = import.meta.env.VITE_WORKER_URL as string;

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [accentColor, setAccentColor] = useState('text-red-500'); // Can be text-red-500, text-blue-500 etc.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [videosList, setVideosList] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlayingLoading, setIsPlayingLoading] = useState(false);
  
  // Pagination states
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  // Apply theme class to document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const loadVideos = async (pageNum: number, isInitial = false) => {
    if (isInitial) setIsLoading(true);
    else setIsFetchingNextPage(true);

    try {
      const res = await fetch(`${WORKER_URL}?action=home&page=${pageNum}`);
      const data = await res.json();
      
      if (data && data.list) {
        const mapped: Video[] = data.list.map((item: any, idx: number) => ({
          id: `${pageNum}-${idx}`, // Unique ID
          title: item.title,
          thumbnail: item.poster || 'https://via.placeholder.com/150',
          url: item.url, 
          channel: 'NexusPlay Creator',
          channelAvatar: 'https://ui-avatars.com/api/?name=NP&background=random',
          views: '10K',
          postedAt: 'Just now',
          description: 'Loading details...',
          likes: '100',
          subscribers: '1K'
        }));
        
        setVideosList(prev => isInitial ? mapped : [...prev, ...mapped]);
        setHasNextPage(data.hasNext ?? false);
        
        if (isInitial && mapped.length > 0) {
          handleSelectVideo(mapped[0]);
        }
      }
    } catch (err) {
      console.error("Error fetching home list:", err);
    } finally {
      if (isInitial) setIsLoading(false);
      else setIsFetchingNextPage(false);
    }
  };

  // Fetch initial playlist from Worker API
  useEffect(() => {
    loadVideos(1, true);
  }, []);

  const observerTarget = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage && !isLoading) {
          const nextPage = page + 1;
          setPage(nextPage);
          loadVideos(nextPage, false);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current);
    };
  }, [observerTarget, hasNextPage, isFetchingNextPage, isLoading, page]);

  const handleSelectVideo = async (video: Video) => {
    setIsPlayingLoading(true);
    setCurrentVideo(video); // Set initial placeholder data
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      // Fetch playable links
      const linksRes = await fetch(`${WORKER_URL}?action=links&url=${encodeURIComponent(video.url)}`);
      const linksData = await linksRes.json();
      
      let playableUrl = video.url;
      let streams: any[] = [];
      if (linksData && linksData.links && linksData.links.length > 0) {
        streams = linksData.links;
        const preferred = linksData.links.find((l: any) => l.quality === '720p') || linksData.links[0];
        playableUrl = preferred.url;
      }

      // Fetch details
      const loadRes = await fetch(`${WORKER_URL}?action=load&url=${encodeURIComponent(video.url)}`);
      const loadData = await loadRes.json();
      
      setCurrentVideo(prev => prev ? {
        ...prev,
        url: playableUrl,
        streams,
        title: loadData.title || prev.title,
        description: loadData.description || 'No description provided.'
      } : prev);

    } catch (err) {
      console.error("Error fetching video details:", err);
    } finally {
      setIsPlayingLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Helper to extract the color name from text-{color}-500 for bg utilities
  const bgAccent = accentColor.replace('text', 'bg');
  const themeClasses = {
    text: accentColor,
    bg: bgAccent,
    bgHover: bgAccent.replace('500', '600'),
    activeBg: bgAccent
  };

  const handleNextVideo = () => {
    if (!currentVideo || videosList.length === 0) return;
    const currentIndex = videosList.findIndex(v => v.id === currentVideo.id);
    const nextIndex = (currentIndex + 1) % videosList.length;
    handleSelectVideo(videosList[nextIndex]);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0f0f0f] text-white' : 'bg-gray-50 text-neutral-900'} transition-colors duration-300 font-sans`}>
      
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        toggleSidebar={() => setIsSidebarOpen(true)}
        accentColor={accentColor}
        setAccentColor={setAccentColor}
        themeClasses={themeClasses}
      />
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        themeClasses={themeClasses}
      />

      <main className="pt-16 max-w-[1800px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6 lg:pl-10 lg:pr-10">
          
          {/* Main Video Area */}
          <div className="flex-1 w-full lg:min-w-0">
            <AnimatePresence mode="wait">
              {currentVideo ? (
                <motion.div 
                  key="video"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full bg-black relative rounded-none sm:rounded-xl overflow-hidden">
                    {isPlayingLoading ? (
                      <div className="w-full aspect-video flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-[#f00] border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      <VideoPlayer 
                        video={currentVideo} 
                        accentColor={accentColor}
                        onNextVideo={handleNextVideo}
                        autoPlay={autoPlay}
                        setAutoPlay={setAutoPlay}
                      />
                    )}
                  </div>
                  
                  <VideoDetails 
                    video={currentVideo} 
                    themeClasses={themeClasses}
                    isLoading={isPlayingLoading}
                  />
                </motion.div>
              ) : (
                <motion.div 
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full aspect-video bg-neutral-900 rounded-xl flex items-center justify-center animate-pulse"
                >
                  <span className="text-neutral-500 font-medium">Loading player...</span>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>

          {/* Right Sidebar - Playlist */}
          <div className="w-full lg:w-[400px] flex-shrink-0">
            <Playlist 
              videos={videosList} 
              currentVideoId={currentVideo?.id || ''} 
              onSelect={handleSelectVideo}
              themeClasses={themeClasses}
              isLoading={isLoading}
            />
            {/* Observer Target for Infinite Scroll */}
            <div ref={observerTarget} className="h-10 w-full flex items-center justify-center mt-4">
              {isFetchingNextPage && (
                <div className="w-6 h-6 border-2 border-[#f00] border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

// ==================== main.tsx (entry point) ====================

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
