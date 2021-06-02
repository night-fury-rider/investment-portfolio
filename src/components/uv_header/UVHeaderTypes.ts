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
  repositoryUrl ?: string;
  repositoryLogo ?: string;
  repositoryHeight ?: string;
  repositoryName ?: string;
  menuItems ?: MenuItem[];
};
