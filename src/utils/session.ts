// Utility helpers related to session summaries and mappings

export type SessionType = 'zazen' | 'complete';

export function getSessionSummaryLines(
  sessionType: SessionType,
  t: (key: string) => string
): string[] {
  if (sessionType === 'zazen') {
    return [t('summary.zazen30')];
  }
  return [t('summary.zazen30'), t('summary.kinhin5'), t('summary.zazen30')];
}
