export interface ConstructionStage {
  id: number;
  stageNumber: string;
  tagline: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  phaseLabel: string;
}

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  iconName: string;
  scope: string[];
  capabilities: string[];
  displayOrder: number;
  published: boolean;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  location: string;
  status: string;
  year?: string | null;
  client?: string | null;
  scopeOfWork?: string | null;
  description: string;
  featured: boolean;
  coverImage: string;
  commencedDate?: Date | string | null;
  completedDate?: Date | string | null;
  images?: {
    id: string;
    imageUrl: string;
    caption?: string | null;
    isCover: boolean;
    isRender: boolean;
  }[];
}

export interface TeamMemberItem {
  id: string;
  name: string;
  designation: string;
  department: string;
  bio: string;
  photoUrl: string;
  linkedinUrl?: string | null;
  email?: string | null;
  isLeadership: boolean;
}

export interface NewsArticleItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  featuredImage: string;
  author: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  publishedAt: Date | string;
  readingTime: string;
}

export interface CompanyInfoItem {
  companyName: string;
  tagline: string;
  overview: string;
  history: string;
  vision: string;
  mission: string;
  coreValues: {
    title: string;
    description: string;
    icon: string;
  }[];
  address: string;
  cityCountry: string;
  email: string;
  phone: string;
  whatsapp: string;
  businessHours: string;
  googleMapsEmbedUrl?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  facebook?: string | null;
  instagram?: string | null;
}

export interface JobVacancyItem {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  deadline?: Date | string | null;
  isActive: boolean;
}

export interface CompanyDocumentItem {
  id: string;
  title: string;
  description?: string | null;
  category: string;
  fileUrl: string;
  fileName: string;
  fileSize?: string | null;
  isPublished: boolean;
}
