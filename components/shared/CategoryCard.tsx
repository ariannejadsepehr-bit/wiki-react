import Link from 'next/link';
import {
  Scale, Stethoscope, Utensils, Sparkles, Scissors, GraduationCap,
  BookOpen, Car, Building2, ShoppingBag, Hotel, Pill, Smile, Brain
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  scale: <Scale className="w-7 h-7" />,
  stethoscope: <Stethoscope className="w-7 h-7" />,
  utensils: <Utensils className="w-7 h-7" />,
  sparkles: <Sparkles className="w-7 h-7" />,
  scissors: <Scissors className="w-7 h-7" />,
  'graduation-cap': <GraduationCap className="w-7 h-7" />,
  book: <BookOpen className="w-7 h-7" />,
  car: <Car className="w-7 h-7" />,
  building: <Building2 className="w-7 h-7" />,
  'shopping-bag': <ShoppingBag className="w-7 h-7" />,
  hotel: <Hotel className="w-7 h-7" />,
  pill: <Pill className="w-7 h-7" />,
  smile: <Smile className="w-7 h-7" />,
  brain: <Brain className="w-7 h-7" />,
};

interface CategoryCardProps {
  name: string;
  slug: string;
  icon?: string;
  color?: string;
  count?: number;
}

export function CategoryCard({ name, slug, icon, color = '#0066CC', count }: CategoryCardProps) {
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <Link
      href={`/${slug}`}
      className="group flex flex-col items-center gap-3 p-5 bg-card rounded-2xl border border-border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-200"
        style={{ backgroundColor: color }}
      >
        {IconComponent}
      </div>
      <div>
        <p className="font-semibold text-sm text-foreground group-hover:text-blue-700 transition-colors">
          {name}
        </p>
        {count !== undefined && (
          <p className="text-xs text-muted-foreground mt-0.5">
            {count.toLocaleString('fa-IR')} کسب‌وکار
          </p>
        )}
      </div>
    </Link>
  );
}
