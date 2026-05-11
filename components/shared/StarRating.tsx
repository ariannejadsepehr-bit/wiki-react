import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  count?: number;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showCount = false,
  count,
  className,
}: StarRatingProps) {
  const sizes = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-5 h-5' };
  const textSizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const partial = !filled && i < rating;
          return (
            <Star
              key={i}
              className={cn(
                sizes[size],
                filled ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200',
                partial && 'fill-amber-200 text-amber-200'
              )}
            />
          );
        })}
      </div>
      {(showCount || rating > 0) && (
        <span className={cn('font-semibold text-amber-600', textSizes[size])}>
          {rating.toFixed(1)}
        </span>
      )}
      {showCount && count !== undefined && (
        <span className={cn('text-muted-foreground', textSizes[size])}>
          ({count.toLocaleString('fa-IR')})
        </span>
      )}
    </div>
  );
}
