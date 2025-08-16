"use client";

interface CircularProgressBarProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  courseName: string;
}

export default function CircularProgressBar({
  progress,
  size = 200,
  strokeWidth = 15,
  courseName,
}: CircularProgressBarProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="absolute top-0 left-0" width={size} height={size}>
        <circle
          className="text-gray-200 dark:text-gray-700"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-primary"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center text-center px-4">
        <span className="text-3xl font-bold font-headline text-primary">{progress}%</span>
        <span className="text-sm text-muted-foreground font-medium">{courseName}</span>
      </div>
    </div>
  );
}
