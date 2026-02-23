/**
 * Minimal layout for 3D viewer — no Header/Footer.
 * This page is loaded in an iframe to isolate WebGL from the main page.
 */
export default function ViewerLayout({ children }) {
  return <>{children}</>;
}
