export function isHlsUrl(src: string): boolean {
  return src.includes(".m3u8");
}

export function attachAdaptiveStream(
  video: HTMLVideoElement,
  src: string,
): () => void {
  const detachNative = () => {
    video.removeAttribute("src");
    video.load();
  };

  if (!isHlsUrl(src) || video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = src;
    return detachNative;
  }

  let cancelled = false;
  let destroyHls: (() => void) | null = null;

  void import("hls.js").then(({ default: Hls }) => {
    if (cancelled) return;
    if (!Hls.isSupported()) {
      video.src = src;
      return;
    }
    const hls = new Hls({
      capLevelToPlayerSize: true,
      startLevel: -1,
      maxBufferLength: 20,
      maxMaxBufferLength: 40,
    });
    hls.loadSource(src);
    hls.attachMedia(video);
    destroyHls = () => hls.destroy();
  });

  return () => {
    cancelled = true;
    if (destroyHls) destroyHls();
    else detachNative();
  };
}
