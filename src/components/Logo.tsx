import { cn } from "@/lib/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export default function Logo({ size = 40, className, ...props }: LogoProps) {
  const fontSize = size <= 40 ? "18" : "18";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("font-headline", className)}
      {...props}
    >
      <circle cx="50" cy="50" r="48" fill="hsl(var(--primary))" />
      <>
        <text
          x="50%"
          y="42%"
          textAnchor="middle"
          dy=".3em"
          fill="hsl(var(--primary-foreground))"
          fontSize={fontSize}
          fontFamily="Space Grotesk, sans-serif"
          fontWeight="bold"
        >
          Bantu
        </text>
        <text
          x="50%"
          y="62%"
          textAnchor="middle"
          dy=".3em"
          fill="hsl(var(--primary-foreground))"
          fontSize={fontSize}
          fontFamily="Space Grotesk, sans-serif"
          fontWeight="bold"
        >
          Learn
        </text>
      </>
    </svg>
  );
}
