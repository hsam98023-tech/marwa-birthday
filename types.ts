export enum Scene {
  LOGIN = 'LOGIN',
  COUNTDOWN = 'COUNTDOWN',
  CAKE = 'CAKE',
  CELEBRATION = 'CELEBRATION'
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  depth: number;
}

export interface Message {
  id: number;
  sender_name: string;
  Message: string;
  created_at: string;
}