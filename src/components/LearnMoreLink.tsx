import type { LearnMoreInfo } from '../games/links';
import styles from './LearnMoreLink.module.css';

interface LearnMoreLinkProps {
  link: LearnMoreInfo;
}

export function LearnMoreLink({ link }: LearnMoreLinkProps) {
  return (
    <a
      className={styles.link}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {link.label}
    </a>
  );
}
