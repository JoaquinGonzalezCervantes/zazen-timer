export type SessionType = 'zazen' | 'complete';

export type RootStackParamList = {
  Landing: undefined;
  SessionSummary: { sessionType: SessionType };
  Timer: { sessionType: SessionType };
};
