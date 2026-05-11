import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, BadgeCheck, Star, Crown, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StarRating } from './StarRating';
import type { Business } from '@/types/database';

interface BusinessCardProps {
  business: Partial<Business> & {
    name: string;
    slug: string;
    city_name?: string;
    category_name?: string;
  };
  variant?: 'default' | 'compact' | 'featured';
  rank?: number;
}

export function BusinessCard({ business, variant = 'default', rank }: BusinessCardProps) {
  const href = `/business/${business.slug}`;
  const isPremium = business.subscription_plan === 'premium' || business.subscription_plan === 'enterprise';

  if (variant === 'compact') {
    return (
      <Link href={href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors group">
        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
          {business.logo_url ? (
            <Image src={business.logo_url} alt={business.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-lg font-bold text-muted-foreground">
              {business.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground truncate group-hover:text-blue-700 transition-colors">
            {business.name}
          </p>
          {business.city_name && (
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" /> {business.city_name}
            </p>
          )}
        </div>
        {business.avg_rating && business.avg_rating > 0 && (
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold">{business.avg_rating.toFixed(1)}</span>
          </div>
        )}
      </Link>
    );
  }

  return (
    <article
      className={cn(
        'card-wiki overflow-hidden group',
        variant === 'featured' && 'ring-2 ring-amber-400 ring-offset-2',
        isPremium && variant !== 'featured' && 'ring-1 ring-amber-200'
      )}
    >
      {/* Cover image */}
      <div className="relative h-44 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
        {business.cover_url ? (
          <Image
            src={business.cover_url}
            alt={business.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center">
            <span className="text-white/20 text-7xl font-black">{business.name.charAt(0)}</span>
          </div>
        )}

        {/* Badges overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {rank && rank <= 3 && (
            <span className={cn(
              'px-2 py-1 rounded-lg text-xs font-bold text-white shadow',
              rank === 1 ? 'bg-amber-500' : rank === 2 ? 'bg-gray-400' : 'bg-amber-700'
            )}>
              #{rank}
            </span>
          )}
          {isPremium && (
            <span className="badge-premium gap-1 shadow">
              <Crown className="w-3 h-3" /> ویژه
            </span>
          )}
        </div>

        {/* Logo */}
        <div className="absolute bottom-0 right-4 translate-y-1/2">
          <div className="w-14 h-14 rounded-xl border-2 border-white shadow-md overflow-hidden bg-white">
            {business.logo_url ? (
              <Image src={business.logo_url} alt={business.name} width={56} height={56} className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl font-black text-blue-700 bg-blue-50">
                {business.name.charAt(0)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pt-10">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap mb-1">
              <Link href={href}>
                <h3 className="font-bold text-base text-foreground hover:text-blue-700 transition-colors line-clamp-1">
                  {business.name}
                </h3>
              </Link>
              {business.is_verified && (
                <BadgeCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
              )}
            </div>

            {business.category_name && (
              <p className="text-xs text-blue-600 font-medium mb-2">{business.category_name}</p>
            )}

            {business.short_description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-6">
                {business.short_description}
              </p>
            )}
          </div>
        </div>

        {/* Rating */}
        {business.avg_rating !== undefined && business.avg_rating > 0 && (
          <div className="mb-3">
            <StarRating
              rating={business.avg_rating}
              size="sm"
              showCount
              count={business.review_count}
            />
          </div>
        )}

        {/* Location */}
        {business.city_name && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>{business.city_name}</span>
            {business.address && (
              <span className="truncate"> · {business.address}</span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-border">
          <Link href={href} className="flex-1">
            <button className="w-full flex items-center justify-center gap-1 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
              مشاهده پروفایل
              <ChevronLeft className="w-4 h-4" />
            </button>
          </Link>
          {business.phone && (
            <a
              href={`tel:${business.phone}`}
              className="w-9 h-9 flex items-center justify-center text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              aria-label="تماس"
            >
              <Phone className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
