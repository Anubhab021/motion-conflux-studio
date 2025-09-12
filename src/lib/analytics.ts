// Google Analytics 4 setup
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track project views
export const trackProjectView = (projectId: string, projectTitle: string) => {
  event({
    action: 'view_project',
    category: 'engagement',
    label: projectTitle,
  });
};

// Track search queries
export const trackSearch = (query: string, resultsCount: number) => {
  event({
    action: 'search',
    category: 'engagement',
    label: query,
    value: resultsCount,
  });
};

// Track filter usage
export const trackFilter = (filterType: string, filterValue: string) => {
  event({
    action: 'filter_projects',
    category: 'engagement',
    label: `${filterType}: ${filterValue}`,
  });
};

// Track contact form submissions
export const trackContactForm = (formType: string) => {
  event({
    action: 'contact_form_submit',
    category: 'conversion',
    label: formType,
  });
};

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}
