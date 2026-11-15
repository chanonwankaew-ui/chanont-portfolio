import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  renderTime: number;
  isLowPerformance: boolean;
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    renderTime: 0,
    isLowPerformance: false,
  });

  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(0);
  const fpsIntervalRef = useRef(1000);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    lastTimeRef.current = performance.now();

    const measurePerformance = () => {
      const now = performance.now();
      frameCountRef.current++;

      if (now - lastTimeRef.current >= fpsIntervalRef.current) {
        const fps = Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current));
        
        // Memory usage (if available)
        let memoryUsage = 0;
        const memory = (performance as Performance & {
          memory?: { usedJSHeapSize: number };
        }).memory;
        if (memory) {
          memoryUsage = Math.round(memory.usedJSHeapSize / 1048576);
        }

        // Render time estimation
        const renderTime = now - lastTimeRef.current;

        // Detect low performance
        const isLowPerformance = fps < 30 || memoryUsage > 500;

        setMetrics({
          fps,
          memoryUsage,
          renderTime,
          isLowPerformance,
        });

        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }

      animationFrameRef.current = requestAnimationFrame(measurePerformance);
    };

    animationFrameRef.current = requestAnimationFrame(measurePerformance);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Check device capabilities
  const checkDeviceCapabilities = () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEndDevice = isMobile || (navigator.hardwareConcurrency || 4) < 4;
    
    return {
      isMobile,
      isLowEndDevice,
      shouldReduceEffects: isLowEndDevice || metrics.isLowPerformance,
    };
  };

  return {
    metrics,
    checkDeviceCapabilities,
  };
};