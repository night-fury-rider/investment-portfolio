export type MenuItem = {
  title: string;
  href: string;
  icon?: string;
}
export type UVHeaderProps = {
  title: string;
  centralTitle ?: number | string;
  theme ?: string;
  alt ?: string;
  primaryWebsite ?: string;
  logoFile ?: string;
  logoWidth ?: string;
  logoAlt ?: string;
  repository: {
    logo ?: string;
    url ?: string;
    height ?: string;
    name ?: string;
  };
  menu ?: {
    logo ?: string;
    items: MenuItem[];
    height ?: string;
    name ?: string;
  }
};
