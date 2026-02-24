import { useEffect, useRef, useState } from "react";
import { api } from "../services/api";
import useAudio from "../hooks/useAudio";
import { getAudioFileUrl } from "../utils/seo";

const CACHE_TTL = 7 * 24 * 60 * 60 * 1000;

const resolveAudioUrl = (data, baseURL) => {
  const raw = data?.audio_url || data?.audio_path || "";
  if (!raw) return "";
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  const normalized = raw.startsWith("/") ? raw.slice(1) : raw;
  return `${baseURL}/${normalized}`;
};

const getCachedUrl = (key) => {
  try {
    const stored = JSON.parse(localStorage.getItem(key) || "null");
    if (!stored) return "";
    if (Date.now() - stored.ts > CACHE_TTL) {
      localStorage.removeItem(key);
      return "";
    }
    return stored.url;
  } catch {
    return "";
  }
};

const setCachedUrl = (key, url) => {
  try {
    localStorage.setItem(
      key,
      JSON.stringify({ url, ts: Date.now() })
    );
  } catch {
    // ignore cache errors
  }
};

export default function AudioPlayer({ textId, language, onPlayStateChange }) {
  const { prefs, updatePrefs } = useAudio();
  const audioRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const cacheKey = `audio_url:${textId}:${language}`;

  const ensureAudioUrl = async () => {
    const cached = getCachedUrl(cacheKey);
    if (cached) {
      setAudioUrl(cached);
      return cached;
    }
    const res = await api.post(`/audio/${textId}`, null, {
      params: { language }
    });
    const url = resolveAudioUrl(res.data, api.defaults.baseURL);
    if (!url) return "";
    setAudioUrl(url);
    setCachedUrl(cacheKey, url);
    return url;
  };

  const togglePlay = async () => {
    setError("");
    setLoading(true);
    try {
      const url = audioUrl || await ensureAudioUrl();
      if (!url) {
        setError("Audio not available");
        return;
      }

      if (!audioRef.current) {
        audioRef.current = new Audio(url);
      } else if (audioRef.current.src !== url) {
        audioRef.current.src = url;
      }

      audioRef.current.playbackRate = prefs?.rate || 1;
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
    } catch (err) {
      console.error(err);
      setError("Audio failed to play");
    } finally {
      setLoading(false);
    }
  };

  const handleRateChange = (next) => {
    updatePrefs({ rate: Number(next) });
    if (audioRef.current) {
      audioRef.current.playbackRate = Number(next);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => {
      setIsPlaying(true);
      onPlayStateChange?.(true);
    };
    const onPause = () => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
    };
    const onEnded = () => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
      setCurrentTime(0);
    };
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onLoaded = () => setDuration(audio.duration || 0);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
    };
  }, [audioUrl, onPlayStateChange]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = prefs?.rate || 1;
    }
  }, [prefs?.rate]);

  const fileUrl = getAudioFileUrl({ textId, language });

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={togglePlay}
        disabled={loading}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-amber-200 text-amber-900 shadow-sm hover:shadow-md hover:bg-white transition disabled:opacity-60"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M5 9v6h4l5 4V5L9 9H5zm11.5 3a4.5 4.5 0 0 0-2-3.74v7.48A4.5 4.5 0 0 0 16.5 12zm0-9a9 9 0 0 1 0 18v-2a7 7 0 0 0 0-14V3z"
            />
          </svg>
        </span>
        <span className="text-sm font-medium">
          {loading ? "Loading" : isPlaying ? "Pause" : "Listen"}
        </span>
      </button>
      <select
        value={prefs?.rate || 1}
        onChange={(e) => handleRateChange(e.target.value)}
        className="rounded-full border border-amber-200 bg-white/80 px-3 py-1 text-xs font-semibold text-amber-900"
        aria-label="Playback speed"
      >
        {[0.75, 1, 1.25, 1.5].map((rate) => (
          <option key={rate} value={rate}>
            {rate}x
          </option>
        ))}
      </select>
      {duration > 0 && (
        <span className="text-xs text-muted">
          {Math.floor(currentTime)}s / {Math.floor(duration)}s
        </span>
      )}
      {fileUrl && (
        <a
          href={fileUrl}
          download
          className="text-xs font-semibold text-amber-700"
        >
          Download
        </a>
      )}
      {error && (
        <span className="text-xs text-red-600">{error}</span>
      )}
    </div>
  );
}
