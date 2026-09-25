export function isHlsUrl(src: string): boolean {
  return src.includes(".m3u8");
}

function abrDefaultEstimate(): number {
  const conn = (
    navigator as Navigator & { connection?: { downlink?: number } }
  ).connection;
  const mbps = conn?.downlink;
  if (typeof mbps === "number" && Number.isFinite(mbps) && mbps > 0) {
    return Math.max(1_000_000, mbps * 1_000_000);
  }
  return 3_000_000;
}

export function attachAdaptiveStream(
  video: HTMLVideoElement,
  src: string,
): () => void {
  const detachNative = () => {
    video.removeAttribute("src");
    video.load();
  };

  if (!isHlsUrl(src)) {
    video.src = src;
    return detachNative;
  }

  let cancelled = false;
  let destroyHls: (() => void) | null = null;

  void import("hls.js").then(({ default: Hls }) => {
    if (cancelled) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        capLevelToPlayerSize: true,
        startLevel: -1,
        testBandwidth: true,
        abrEwmaDefaultEstimate: abrDefaultEstimate(),
        maxBufferLength: 20,
        maxMaxBufferLength: 40,
        autoStartLoad: true,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.startLoad(0);
      destroyHls = () => hls.destroy();
      return;
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.load();
      return;
    }

    video.src = src;
  });

  return () => {
    cancelled = true;
    if (destroyHls) destroyHls();
    else detachNative();
  };
}
